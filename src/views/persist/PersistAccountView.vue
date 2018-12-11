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
              @change="onInputFileChange"
              multiple="multiple"/>
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
          <div v-for="an in altNames">{{ an }}</div>
        </div>

        <div v-if="altNames.length && !neoAccount" class="w-full horiz gutter-30">
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

          <form class="verti weight-1 min-w-300" @submit.prevent="importWif">
            <h2>{{ $t('view.persistAccount.importPrivateKey') }}</h2>

            <input
              type="text"
              v-model="accountName"
              class="w-full mb-15"
              :placeholder="$t('view.persistAccount.newAccountName')"/>

            <input
                type="password"
                v-model="wif"
                class="w-full mb-15"
                :placeholder="$t('view.persistAccount.privateKey')"/>

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
        </div>

        <div v-if="neoAccount" class="verti">
          <h2>{{ $t('view.persistAccount.newAccountName') }}</h2>
          <div class="text-center mb-50">{{ accountName }}</div>

          <h2>{{ $t('view.persistAccount.blockchainInfo') }}</h2>
          <div class="horiz">
            <b class="w-100">{{ $t('view.persistAccount.publicKey') }}</b>
            <span>{{ neoAccount.publicKey }}</span>
          </div>
          <div class="horiz">
            <b class="w-100">{{ $t('view.persistAccount.encryptedWif') }}</b>
            <span>{{ encryptedWif }}</span>
          </div>
          <div class="horiz">
            <b class="w-100">{{ $t('view.persistAccount.privateKey') }}</b>
            <span>{{ neoAccount.privateKey }}</span>
          </div>
          <div class="horiz">
            <b class="w-100">{{ $t('view.persistAccount.address') }}</b>
            <span>{{ neoAccount.address }}</span>
          </div>
          <div class="horiz">
            <b class="w-100">{{ $t('view.persistAccount.scriptHash') }}</b>
            <span>{{ neoAccount.scriptHash }}</span>
          </div>
          <div class="horiz mb-50">
            <b class="w-100">Signature</b>
            <span style="word-wrap:break-word" class="max-w-300">{{ signature }}</span>
          </div>

          <button @click="$await.run(requestApproval, 'requestApproval')" class="primary" v-if="signature">
            <await name="requestApproval">
              {{ $t('view.persistAccount.requestApproval') }}
            </await>
          </button>
          <div v-if="!signature">{{ $t('app.wait') }}</div>
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
  import {wallet} from '@cityofzion/neon-js'
  import {$, successAndPush, error, doInvokeWithAccount, str2hexstring } from '@/simpli'

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
  }

  interface MapOfStringAndBooleans {
    [key: string]: boolean
  }

  @Component
  export default class PersistAccountView extends Vue {
    password: string | null = null
    pkcs12Der: string | null = null
    content: forge.pkcs12.Pkcs12Pfx | null = null

    friendlyNames: string[] | null = null

    selectedFriendlyName: string | null = null

    key: forge.pki.rsa.PrivateKey | null = null
    cert: forge.pki.Certificate | null = null
    privatePem: string | null = null
    publicKey: string | null = null
    altNames: string[] = []

    accountName: string | null = null
    accountPassword: string | null = null
    repeatAccountPassword: string | null = null

    wif: string | null = null
    neoAccount: any | null = null
    encryptedWif: string | null = null

    signature: any | null = null

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
            this.publicKey = publicPem.replace(/\r\n/g, '\n')
          }

          if (kc.cert) {
            this.cert = kc.cert
            const extension: any = kc.cert.getExtension('subjectAltName')

            if (extension) {
              this.recursivelyPopulateAltNames(extension.altNames)
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
      await this.importWif()
    }

    async importWif() {
      if (!this.wif || !this.wif.length) {
        error('view.persistAccount.fillPrivateKey')
        return
      }

      if (!this.accountPassword || !this.accountPassword.length) {
        error('view.persistAccount.fillThePassword')
        return
      }

      if (this.accountPassword !== this.repeatAccountPassword) {
        error('view.persistAccount.passwordDoesntMatch')
        return
      }

      this.neoAccount = new wallet.Account(this.wif)
      this.encryptedWif = await wallet.encrypt(this.wif, this.accountPassword)

      if (this.cert && this.key) {
        this.signature = this.signPkcs7(this.cert, this.key, this.neoAccount.scriptHash)
      }
    }

//    signRsa(pem: any, content: any) {
//      const rsa = new RSAKey()
//      rsa.readPrivateKeyFromPEMString(pem || '')
//      return rsa.sign(content, 'sha256')
//    }
//
//    signCAdES(certPEM: any, pkcs8PrvKeyPEM: any, content: any) {
//      const sd = KJUR.asn1.cms.CMSUtil.newSignedData({
//        content,
//        certs: [certPEM],
//        signerInfos: [{
//          hashAlg: 'sha256',
//          sAttr: {SigningCertificateV2: {array: [certPEM]}},
//          signerCert: certPEM,
//          sigAlg: 'SHA256withRSA',
//          signerPrvKey: pkcs8PrvKeyPEM,
//        }],
//      })
//
//      const signedDataHex = sd.getContentInfoEncodedHex()
//      return signedDataHex
//    }
//
//    signCAdES2(buffer, certificate, privateKey) {
//      const cmsSigned = new SignedData({
//        encapContentInfo: new EncapsulatedContentInfo({
//          eContentType: '1.2.840.113549.1.7.1', // "data" content type
//          eContent: new asn1js.OctetString({ valueHex: buffer }),
//        }),
//        signerInfos: [
//          new SignerInfo({
//            sid: new IssuerAndSerialNumber({
//              issuer: certificate.issuer,
//              serialNumber: certificate.serialNumber,
//            }),
//          }),
//        ],
//        certificates: [certificate],
//      })
//
//      return cmsSigned.sign(privateKey, 0, 'sha-256')
//    }
//
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
      if (!this.publicKey || !this.signature) {
        return
      }

      const resp = await doInvokeWithAccount(this.neoAccount, 'registerRegularAccount',
        this.neoAccount.scriptHash, str2hexstring(this.publicKey), str2hexstring(this.signature))

      if (resp.response.result) {
        successAndPush('system.success.persist', '/')
      } else {
        error('error.unexpected')
      }
    }

  }
</script>
