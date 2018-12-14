<template>
  <div>
    <section class="header mb-20 py-10">
      <h1 class="container">
        {{$t('view.signinToWallet.title')}}
      </h1>
    </section>

    <section class="container">
      <div class="elevated">
        <div class="py-10">
          <div class="container fluid verti items-center">

            <div class="display small mb-20">
              {{$t('view.signinToWallet.walletNotFound')}}
            </div>

            <div class="w-full horiz items-space-around">

              <div class="verti">
                <h1>{{$t('view.signinToWallet.openWallet')}}</h1>
                <input
                    class="weight-1 min-w-170"
                    type="file"
                    ref="inputFile"
                    @change="onInputFileChange"/>
              </div>

              <div class="verti">
                <h1>{{$t('view.signinToWallet.createWallet')}}</h1>
                <router-link to="/account/new" class="btn primary">
                  {{$t('view.signinToWallet.createWallet')}}
                </router-link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import {State, Action, Getter} from 'vuex-class'
  import {$} from '@/simpli'
  import { Wallet } from '@cityofzion/neon-core/lib/wallet'

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
  }

  @Component
  export default class SignInToWalletView extends Vue {
    @Getter('auth/isLogged') isLogged!: Boolean
    @Action('auth/saveWallet') saveWallet!: Function

    mounted() {
      if (this.isLogged) {
        this.$router.push({path: '/my-wallet'})
      }
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
