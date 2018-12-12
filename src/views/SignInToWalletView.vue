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

            <form @submit.prevent="addAccount(request)" class="w-full max-w-400">
              <await name="signIn" :spinnerScale="1.5" class="verti">
                <div class="display small mb-20">
                  {{$t('view.signinToWallet.walletNotFound')}}
                </div>

                <input-text v-model="request.passphrase" type="password" selectall>
                  {{ $t('view.signIn.passphrase') }}
                </input-text>

                <input-text v-model="request.encryptedWIF" type="password" selectall>
                  {{ $t('view.signIn.encryptedWIF') }}
                </input-text>

                <button type="submit" class="secondary my-5">
                  {{ $t('view.signIn.signin') }}
                </button>

                <div class="horiz">
                  <button type="button" class="btn weight-1 min-w-170" @click="showInputFile = true" v-if="!showInputFile">
                    {{$t('view.signinToWallet.importWalletFile')}}
                  </button>

                  <input
                      v-if="showInputFile"
                      class="weight-1 min-w-170"
                      type="file"
                      ref="inputFile"
                      @change="onInputFileChange"/>

                  <router-link to="/account/new" class="btn primary weight-1 min-w-150 ml-5">
                    {{$t('view.signinToWallet.createWallet')}}
                  </router-link>
                </div>
              </await>
            </form>

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
  import AuthRequest from '@/model/request/AuthRequest'
  import { Wallet } from '@cityofzion/neon-core/lib/wallet'

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
  }

  @Component
  export default class SignInToWalletView extends Vue {
    @Getter('auth/isLogged') isLogged!: Boolean
    @Action('auth/addAccount') addAccount!: Function
    @Action('auth/saveWallet') saveWallet!: Function

    request = new AuthRequest()
    showInputFile = false

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
