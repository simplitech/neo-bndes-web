<template>
  <div class="verti">
    <section class="header mb-20 py-10">
      <h1 class="container">
        {{ $t('classes.Account.title') }}
      </h1>
    </section>

    <section class="container">

      <div class="verti elevated padded items-center-top mb-30">

        <form v-if="!friendlyNames" class="verti items-center-top" @submit.prevent="loadFileAndPassword">

          <h2>{{ $t('view.persistAccount.selectDigitalCertificate') }}</h2>

          <input
              type="file"
              ref="inputFile"
              class="w-300 mb-15"
              @change="onInputFileChange"/>
          <input
              type="password"
              v-model="password"
              class="w-300 mb-15"
              :placeholder="$t('view.persistAccount.password')"/>

          <hr>

          <button type="submit" class="primary">{{ $t('persist.proceed') }}</button>

        </form>

        <select v-if="friendlyNames && !selectedFriendlyName" v-model="selectedFriendlyName">
          <option :value="null">{{ $t('view.persistAccount.selectCertificate') }}</option>
          <option v-for="opt in friendlyNames" :value="opt">{{ opt }}</option>
        </select>

        <div v-if="altNames.length" class="verti mb-50">
          <h2>{{ $t('view.persistAccount.certificateData') }}</h2>
          <div class="horiz">
            <b class="w-130">{{ $t('view.persistAccount.email') }}</b>
            <span>{{ subjectAccount.email }}</span>
          </div>
          <div class="horiz">
            <b class="w-130">{{ $t('view.persistAccount.name') }}</b>
            <span>{{ subjectAccount.name }}</span>
          </div>
          <div class="horiz">
            <b class="w-130">{{ $t('view.persistAccount.document') }}</b>
            <span>{{ subjectAccount.document }}</span>
          </div>
          <div class="horiz" v-if="subjectAccount.neoAccount">
            <b class="w-130">{{ $t('view.persistAccount.newAccountName') }}</b>
            <span>{{ accountName }}</span>
          </div>
        </div>

        <div v-if="altNames.length && !subjectAccount.neoAccount" class="w-full horiz gutter-30">
          <form class="verti weight-1 min-w-300 mb-30" @submit.prevent="createAccount">
            <h2>{{ $t('view.persistAccount.newAccount') }}</h2>

            <input
                type="text"
                v-model="accountName"
                class="w-full mb-15"
                :placeholder="$t('view.persistAccount.newAccountName')"/>

            <input
                type="password"
                v-model="accountPassword"
                class="w-full mb-15"
                :placeholder="$t('view.persistAccount.password')"/>

            <input
                type="password"
                v-model="repeatAccountPassword"
                class="w-full mb-15"
                :placeholder="$t('view.persistAccount.repeatPassword')"/>

            <button type="submit" class="self-center primary">{{ $t('persist.proceed') }}</button>
          </form>

          <form class="verti weight-1 min-w-300" @submit.prevent="$await.run(importEncryptedWif, 'importEncryptedWif')">
            <h2>{{ $t('view.persistAccount.importEncryptedWif') }}</h2>

            <input
              type="text"
              v-model="accountName"
              class="w-full mb-15"
              :placeholder="$t('view.persistAccount.newAccountName')"/>

            <input
                type="password"
                v-model="encryptedWif"
                class="w-full mb-15"
                :placeholder="$t('view.persistAccount.privateKey')"/>

            <input
                type="password"
                v-model="accountPassword"
                class="w-full mb-15"
                :placeholder="$t('view.persistAccount.password')"/>

            <div class="self-center">
              <await name="importEncryptedWif">
                <button type="submit" class="primary">{{ $t('persist.proceed') }}</button>
              </await>
            </div>
          </form>
        </div>

        <div v-if="subjectAccount.neoAccount" class="verti">
          <await name="requestApproval">
            <button @click="$await.run(requestApproval, 'requestApproval')" class="primary" v-if="subjectAccount.signature">
                {{ $t('view.persistAccount.requestApproval') }}
            </button>
          </await>
          <div v-if="!subjectAccount.signature">{{ $t('app.wait') }}</div>
        </div>
      </div>

    </section>
  </div>
</template>

<script lang="ts">
  import forge from 'node-forge'
  import {RSAKey} from 'jsrsasign'
  import * as asn1js from 'asn1js'
  import {Component, Prop, Watch, Vue} from 'vue-property-decorator'
  import {Action} from 'vuex-class'
  import {wallet} from '@cityofzion/neon-js'
  import { Wallet, Account, AccountJSON } from '@cityofzion/neon-core/lib/wallet'
  import {$, successAndPush, error, success, str2hexstring, reverseHex, wifToAddress } from '../../simpli'
  import RegularAccount from '@/model/RegularAccount'

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
  }

  interface MapOfStringAndBooleans {
    [key: string]: boolean
  }

  @Component
  export default class PersistRegularAccountView extends Vue {
    @Action('auth/addAccount') addAccount!: Function
    @Action('auth/exportJson') exportJson!: Function

    subjectAccount = new RegularAccount()

    password: string | null = null
    pkcs12Der: string | null = null
    content: forge.pkcs12.Pkcs12Pfx | null = null

    friendlyNames: string[] | null = null
    selectedFriendlyName: string | null = null

    key: forge.pki.rsa.PrivateKey | null = null
    cert: forge.pki.Certificate | null = null
    privatePem: string | null = null
    altNames: string[] = []

    accountName: string | null = null
    accountPassword: string | null = null
    repeatAccountPassword: string | null = null

    encryptedWif: string | null = null
    wif: string | null = null

    onInputFileChange(e: HTMLInputEvent) {
      if (!e || !e.target || !e.target.files) return

      const tempReader = new FileReader()

      tempReader.onload = () => {
        this.pkcs12Der = this.arrayBufferToString(tempReader.result as ArrayBuffer)
      }

      tempReader.readAsArrayBuffer(e.target.files[0])
    }

    arrayBufferToString(buffer: ArrayBuffer) {
      let binary = ''
      const bytes = new Uint8Array(buffer)

      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
      }

      return binary
    }

    loadFileAndPassword() {
      if (!this.pkcs12Der) {
        error('view.persistAccount.selectTheFile')
        return
      }

      if (!this.password) {
        error('view.persistAccount.fillThePassword')
        return
      }

      const pkcs12Asn1 = forge.asn1.fromDer(this.pkcs12Der)
      this.content = forge.pkcs12.pkcs12FromAsn1(pkcs12Asn1, false, this.password)

      const preFriendlyNames = this.content.safeContents.reduce((arr: string[], sc) => [
        ...arr,
        ...[].concat(...sc.safeBags.map((sb) => sb.attributes.friendlyName)),
      ], [])

      const seen: MapOfStringAndBooleans = {}
      this.friendlyNames = preFriendlyNames.filter((item) => {
        if (seen.hasOwnProperty(item)) {
          return false
        }
        seen[item] = true
        return true
      })

      if (this.friendlyNames.length === 1) {
        this.selectedFriendlyName = this.friendlyNames[0]
      }
    }

    @Watch('selectedFriendlyName')
    loadCert() {
      if (this.selectedFriendlyName && this.content) {
        const keyContainer: forge.pkcs12.Bag[] | undefined = this.content
          .getBags({friendlyName: this.selectedFriendlyName}).friendlyName

        if (!keyContainer) {
          error('view.persistAccount.missingCertificateData')
          return
        }

        keyContainer.forEach((kc) => {
          if (kc.key && !this.privatePem) {
            this.key = kc.key as forge.pki.rsa.PrivateKey
            this.privatePem = forge.pki.privateKeyToPem(kc.key)

            const publicKeyData = forge.pki.setRsaPublicKey(this.key.n, this.key.e)
            const publicPem = forge.pki.publicKeyToPem(publicKeyData)
            this.subjectAccount.publicKey = publicPem.replace(/\r\n/g, '\n')
          }

          if (kc.cert) {
            this.cert = kc.cert
            const extension: any = kc.cert.getExtension('subjectAltName')

            if (extension) {
              this.recursivelyPopulateAltNames(extension.altNames)

              if (this.altNames.length >= 1) {
                this.subjectAccount.email = this.altNames[0]
              }

              if (this.altNames.length >= 3) {
                this.subjectAccount.name = this.altNames[2]
              }

              if (this.altNames.length >= 4) {
                this.subjectAccount.document = this.altNames[3]
              }
            }
          }
        })

      }
    }

    recursivelyPopulateAltNames(altNamesPureValues: any[]) {
      altNamesPureValues.forEach((an) => {
        if (an.value instanceof Array) {
          this.recursivelyPopulateAltNames(an.value)
        } else if (an.type !== 6) {
          this.altNames.push(an.value)
        }
      })
    }

    async createAccount() {
      this.wif = wallet.generatePrivateKey()

      if (!this.accountPassword || !this.accountPassword.length) {
        error('view.persistAccount.fillThePassword')
        return
      }

      if (this.accountPassword !== this.repeatAccountPassword) {
        error('view.persistAccount.passwordDoesntMatch')
        return
      }

      await this.importWif()
    }

    async importEncryptedWif() {
      if (!this.encryptedWif || !this.encryptedWif.length) {
        error('view.persistAccount.fillPrivateKey')
        return
      }

      if (!wallet.isNEP2(this.encryptedWif)) {
        error('system.error.invalidEncryptedWif')
        return
      }

      if (!this.accountPassword || !this.accountPassword.length) {
        error('view.persistAccount.fillThePassword')
        return
      }

      try {
        this.wif = await wallet.decrypt(this.encryptedWif, this.accountPassword)
      } catch (e) {
        error(e.message, '', false)
        return
      }
      await this.importWif()
    }

    async importWif() {
      if (!this.wif || !this.wif.length) {
        error('view.persistAccount.fillPrivateKey')
        return
      }

      if (!this.encryptedWif) {
        this.encryptedWif = await wallet.encrypt(this.wif, this.accountPassword || '')
      }

      let privKey
      try {
        privKey = wallet.getPrivateKeyFromWIF(this.wif)
      } catch (e) {
        privKey = this.wif
      }

      const address = wallet.getAddressFromScriptHash(
        wallet.getScriptHashFromPublicKey(
          wallet.getPublicKeyFromPrivateKey(
            privKey)))

      const accJson = {
        address,
        label: this.accountName,
        isDefault: true,
        lock: false,
        key: this.encryptedWif,
        contract: {
          script: '',
          parameters: [
            {
              name: 'signature',
              type: 'Signature',
            },
          ],
          deployed: false,
        },
        extra: null,
      }

      // @ts-ignore
      this.subjectAccount.neoAccount = new Account(accJson)
      if (!this.subjectAccount.neoAccount) {
        return
      }

      this.subjectAccount.neoAccount.decrypt(this.accountPassword || '')

      if (this.cert && this.key) {
        this.subjectAccount.signature = this.signPkcs7(
          this.cert,
          this.key || '',
          this.subjectAccount.neoAccount.scriptHash)
      }
    }

    signPkcs7(
      certOrCertPem: forge.pki.Certificate,
      privateKeyAssociatedWithCert: forge.pki.PrivateKey,
      content: string) {

      const p7 = forge.pkcs7.createSignedData()
      p7.content = forge.util.createBuffer(content, 'utf8')
      p7.addCertificate(certOrCertPem)
      p7.addSigner({
        key: privateKeyAssociatedWithCert,
        certificate: certOrCertPem,
        digestAlgorithm: forge.pki.oids.sha256,
        authenticatedAttributes: [{
          type: forge.pki.oids.contentType,
          value: forge.pki.oids.data,
        }, {
          type: forge.pki.oids.messageDigest,
        }, {
          type: forge.pki.oids.signingTime,
        }],
      })
      p7.sign({ detached: true })
      const pem = forge.pkcs7.messageToPem(p7)
      return pem
    }

    async requestApproval() {
      const resp = await this.subjectAccount.persist()

      console.log('PersistRegularAccountView: 404')

      if (resp && resp.response && resp.response.result) {
        this.addAccount(this.subjectAccount.neoAccount)
        this.exportJson()
      } else {
        error('error.unexpected')
      }
    }

  }
</script>
