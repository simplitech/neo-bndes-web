<template>
  <div>
    <div v-if="!userWallet" class="errorArea p-15">
      <h1 class="mb-20">
        {{$t('view.accountSelector.walletNotFound')}}
      </h1>

      <div class="horiz items-left-bottom gutter-30">

        <div class="verti max-w-300">
          <span>{{$t('view.accountSelector.openWallet')}}</span>
          <input
              type="file"
              ref="inputFile"
              @change="onInputFileChange"/>
        </div>

        <div class="verti max-w-300">
          <span>{{$t('view.accountSelector.createWallet')}}</span>
          <router-link to="/account/new" class="btn primary">
            {{$t('view.accountSelector.createWallet')}}
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="userWallet && !onlyWallet" class="horiz items-left-bottom gutter-15 mb-10">
      <div class="verti max-w-300">
        <span>{{ $t('view.accountSelector.selectTheAccount') }}</span>

        <select v-model="selectedAcc" class="min-w-200">
          <option :value="null"></option>
          <option v-for="acc in userWallet.accounts" :value="acc">{{ acc.label || acc.address }}</option>
        </select>
      </div>

      <div class="verti max-w-300" v-if="selectedAcc && !accHasPrivKey">
        <span>{{ $t('view.accountSelector.fillThePassword') }}</span>

        <input type="password" v-model="password" @blur="passBlur" @keyup.enter="$await.run(authenticate, 'authenticate')"/>
      </div>

      <div>
        <await name="authenticate">
          <button type="button" v-if="!autoAuthenticate && selectedAcc && !accHasPrivKey" @click="$await.run(authenticate, 'authenticate')">{{ $t('view.accountSelector.authenticate') }}</button>
        </await>
      </div>

    </div>

    <slot v-if="(userWallet && onlyWallet) || accHasPrivKey"></slot>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
  import {Action, Getter} from 'vuex-class'
  import { Wallet, Account, AccountJSON } from '@cityofzion/neon-core/lib/wallet'

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
  }

  @Component
  export default class AccountSelector extends Vue {
    @Getter('auth/userWallet') userWallet?: Wallet
    @Action('auth/selectAccount') selectAccount!: Function
    @Action('auth/saveWallet') saveWallet!: Function
    @Prop({type: Boolean, default: false}) onlyWallet?: boolean
    @Prop({type: Boolean, default: false}) autoAuthenticate?: boolean

    selectedAcc: Account | null = null
    password: string | null = null
    accHasPrivKey = false

    @Watch('selectedAcc')
    updateAccHasPrivKey() {
      try {
        if (this.selectedAcc) {
          this.accHasPrivKey = this.selectedAcc.privateKey != null
        }
      } catch (e) {
        // ignore
      }
    }

    passBlur() {
      if (this.autoAuthenticate) {
        this.$await.run(this.authenticate, 'authenticate')
      }
    }

    async authenticate() {
      await this.selectAccount({ account: this.selectedAcc, password: this.password })
      this.updateAccHasPrivKey()
    }

    onInputFileChange(e: HTMLInputEvent) {
      if (!e || !e.target || !e.target.files) return

      const tempReader = new FileReader()

      tempReader.onload = () => {
        const json = this.arrayBufferToString(tempReader.result as ArrayBuffer)
        const w = new Wallet(JSON.parse(json))
        this.saveWallet(w)
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
  }
</script>
