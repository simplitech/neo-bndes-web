<template>
  <div class="verti">
    <section class="header">
      <h1 class="m-0">
        {{ $t('classes.Account.title') }}
      </h1>
    </section>

    <section class="container fluid">

      <div class="verti elevated padded items-center-top">

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
          <form class="verti weight-1" @submit.prevent="createAccount">
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

          <form class="verti weight-1" @submit.prevent="importWif">
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
          <div class="horiz mb-50">
            <b class="w-100">{{ $t('view.persistAccount.scriptHash') }}</b>
            <span>{{ neoAccount.scriptHash }}</span>
          </div>

          <button class="primary">{{ $t('view.persistAccount.requestApproval') }}</button>
        </div>
      </div>

    </section>
  </div>
</template>

<script lang="ts">
  import forge from 'node-forge'
  import { RSAKey } from 'jsrsasign'
  import {Component, Prop, Watch, Vue} from 'vue-property-decorator'
  import { wallet } from '@cityofzion/neon-js'
  import {$, successAndPush, error } from '@/simpli'
  import Account from '@/model/Account'

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
  }

  interface MapOfStringAndBooleans {
    [key: string]: boolean
  }

  @Component
  export default class PersistAccountView extends Vue {
    @Prop({type: [String, Number]}) id?: string
    model = new Account()

    password: string | null = null
    pkcs12Der: string | null = null
    content: forge.pkcs12.Pkcs12Pfx | null = null

    friendlyNames: string[] | null = null

    selectedFriendlyName: string | null = null

    altNames: string[] = []

    accountName: string | null = null
    accountPassword: string | null = null
    repeatAccountPassword: string | null = null

    wif: string | null = null
    neoAccount: any | null = null
    encryptedWif: string | null = null

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
        const keyContainer = this.content.getBags({friendlyName: this.selectedFriendlyName}).friendlyName
        if (!keyContainer) {
          error('view.persistAccount.missingCertificateData')
          return
        }

        keyContainer.forEach((kc) => {
          if (kc.cert) {
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
    }

    async persist() {
      await this.model.validate()
      await this.model.save()
      successAndPush('system.success.persist', '/admin/list')
    }
  }
</script>
