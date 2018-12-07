<template>
  <div class="container verti w-window h-window items-center">
    <form @submit.prevent="signIn(request)" class="des-w-300 tab-w-400 mob-w-full">
      <await name="signIn" :spinnerScale="1.5">
        <h2 class="text-center text-uppercase contrast">
          {{ $t('view.signIn.title') }}
        </h2>

        <input-text v-model="request.passphrase" type="password" selectall class="contrast">
          {{ $t('view.signIn.passphrase') }}
        </input-text>

        <input-text v-model="request.encryptedWIF" type="password" selectall class="contrast">
          {{ $t('view.signIn.encryptedWIF') }}
        </input-text>

        <button class="secondary fluid" type="submit">
          {{ $t('view.signIn.signin') }}
        </button>
      </await>
    </form>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import {State, Action, Getter} from 'vuex-class'
  import AuthRequest from '@/model/request/AuthRequest'

  @Component
  export default class SignInView extends Vue {
    @Action('auth/signIn') signIn?: Function
    request = new AuthRequest()
  }
</script>
