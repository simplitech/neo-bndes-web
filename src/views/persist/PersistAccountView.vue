<template>
  <div class="verti">
    <section class="header mb-20 py-10">
      <h1 class="container">
        {{ $t('classes.Account.title') }}
      </h1>
    </section>

    <section class="container">

      <div class="verti elevated padded items-center-top mb-30">

        <form v-if="!account.friendlyNames" class="verti items-center-top" @submit.prevent="loadFileAndPassword">

          <h2>{{ $t('view.persistAccount.selectDigitalCertificate') }}</h2>

          <input
              type="file"
              ref="inputFile"
              class="w-300 mb-15"
              @change="onInputFileChange"
              multiple="multiple"/>
          <input
              type="password"
              v-model="account.password"
              class="w-300 mb-15"
              :placeholder="$t('view.persistAccount.password')"/>

          <hr>

          <button type="submit" class="primary">{{ $t('persist.proceed') }}</button>

        </form>

        <select v-if="account.friendlyNames && !account.selectedFriendlyName" v-model="account.selectedFriendlyName">
          <option :value="null">{{ $t('view.persistAccount.selectCertificate') }}</option>
          <option v-for="opt in account.friendlyNames" :value="opt">{{ opt }}</option>
        </select>

        <div v-if="account.altNames.length" class="verti mb-50">
          <h2>{{ $t('view.persistAccount.certificateData') }}</h2>
          <div v-for="an in account.altNames">{{ an }}</div>
        </div>

        <div v-if="account.altNames.length && !account.neoAccount" class="w-full horiz gutter-30">
          <form class="verti weight-1 min-w-300 mb-30" @submit.prevent="createAccount">
            <h2>{{ $t('view.persistAccount.newAccount') }}</h2>

            <input
                type="text"
                v-model="account.accountName"
                class="w-full mb-15"
                :placeholder="$t('view.persistAccount.newAccountName')"/>

            <input
                type="password"
                v-model="account.accountPassword"
                class="w-full mb-15"
                :placeholder="$t('view.persistAccount.password')"/>

            <input
                type="password"
                v-model="account.repeatAccountPassword"
                class="w-full mb-15"
                :placeholder="$t('view.persistAccount.repeatPassword')"/>

            <button type="submit" class="self-center primary">{{ $t('persist.proceed') }}</button>
          </form>

          <form class="verti weight-1 min-w-300" @submit.prevent="importWif">
            <h2>{{ $t('view.persistAccount.importPrivateKey') }}</h2>

            <input
              type="text"
              v-model="account.accountName"
              class="w-full mb-15"
              :placeholder="$t('view.persistAccount.newAccountName')"/>

            <input
                type="password"
                v-model="account.wif"
                class="w-full mb-15"
                :placeholder="$t('view.persistAccount.privateKey')"/>

            <input
                type="password"
                v-model="account.accountPassword"
                class="w-full mb-15"
                :placeholder="$t('view.persistAccount.password')"/>

            <input
                type="password"
                v-model="account.repeatAccountPassword"
                class="w-full mb-15"
                :placeholder="$t('view.persistAccount.repeatPassword')"/>

            <button type="submit" class="self-center primary">{{ $t('persist.proceed') }}</button>
          </form>
        </div>

        <div v-if="account.neoAccount" class="verti">
          <h2>{{ $t('view.persistAccount.newAccountName') }}</h2>
          <div class="text-center mb-50">{{ account.accountName }}</div>

          <h2>{{ $t('view.persistAccount.blockchainInfo') }}</h2>
          <div class="horiz">
            <b class="w-100">{{ $t('view.persistAccount.publicKey') }}</b>
            <span>{{ account.neoAccount.publicKey }}</span>
          </div>
          <div class="horiz">
            <b class="w-100">{{ $t('view.persistAccount.encryptedWif') }}</b>
            <span>{{ account.encryptedWif }}</span>
          </div>
          <div class="horiz">
            <b class="w-100">{{ $t('view.persistAccount.privateKey') }}</b>
            <span>{{ account.neoAccount.privateKey }}</span>
          </div>
          <div class="horiz">
            <b class="w-100">{{ $t('view.persistAccount.address') }}</b>
            <span>{{ account.neoAccount.address }}</span>
          </div>
          <div class="horiz mb-50">
            <b class="w-100">{{ $t('view.persistAccount.scriptHash') }}</b>
            <span>{{ account.neoAccount.scriptHash }}</span>
          </div>

          <button class="primary">{{ $t('view.persistAccount.requestApproval') }}</button>
        </div>
      </div>

    </section>
  </div>
</template>

<script lang="ts">
  import forge from 'node-forge'
  import {Component, Prop, Watch, Vue} from 'vue-property-decorator'
  import { wallet } from '@cityofzion/neon-js'
  import {$, successAndPush, abort } from '@/simpli'
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
    account = new Account()

    onInputFileChange(e: HTMLInputEvent) {
      if (!e || !e.target || !e.target.files) return

      const tempReader = new FileReader()

      tempReader.onload = () => {
        this.account.pkcs12Der = this.arrayBufferToString(tempReader.result as ArrayBuffer)
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
      if (!this.account.pkcs12Der) {
        abort('view.persistAccount.selectTheFile')
      }

      if (!this.account.password) {
        abort('view.persistAccount.fillThePassword')
      }

      const pkcs12Asn1 = forge.asn1.fromDer(this.account.pkcs12Der || '')
      this.account.content = forge.pkcs12.pkcs12FromAsn1(pkcs12Asn1, false, this.account.password || '')

      const preFriendlyNames = this.account.content.safeContents.reduce((arr: string[], sc) => [
        ...arr,
        ...[].concat(...sc.safeBags.map((sb) => sb.attributes.friendlyName)),
      ], [])

      const seen: MapOfStringAndBooleans = {}
      this.account.friendlyNames = preFriendlyNames.filter((item) => {
        if (seen.hasOwnProperty(item)) {
          return false
        }
        seen[item] = true
        return true
      })

      if (this.account.friendlyNames.length === 1) {
        this.account.selectedFriendlyName = this.account.friendlyNames[0]
      }
    }

    @Watch('selectedFriendlyName')
    loadCert() {
      if (this.account.selectedFriendlyName && this.account.content) {
        const keyContainer = this.account.content.getBags({friendlyName: this.account.selectedFriendlyName}).friendlyName
        if (!keyContainer) {
          abort('view.persistAccount.missingCertificateData')
        }

        keyContainer!!.forEach((kc) => {
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
          this.account.altNames.push(an.value)
        }
      })
    }

    async createAccount() {
      this.account.wif = wallet.generatePrivateKey()
      await this.importWif()
    }

    async importWif() {
      if (!this.account.wif || !this.account.wif.length) {
        abort('view.persistAccount.fillPrivateKey')
      }

      if (!this.account.accountPassword || !this.account.accountPassword.length) {
        abort('view.persistAccount.fillThePassword')
      }

      if (this.account.accountPassword !== this.account.repeatAccountPassword) {
        abort('view.persistAccount.passwordDoesntMatch')
      }

      this.account.neoAccount = new wallet.Account(this.account.wif || '')
      this.account.encryptedWif = await wallet.encrypt(this.account.wif || '', this.account.accountPassword || '')
    }

    async persistAccount() {
      await this.account.persist()
      successAndPush('system.success.persist', '/admin/list')
    }
  }
</script>
