<template>
  <div class="contrast verti w-window h-window items-center">
    <form @submit.prevent="resetPassword(model)" class="des-w-300 tab-w-400 mob-w-full">
      <await name="resetPassword" :spinnerScale="1.5">
        <h2 class="text-center text-uppercase contrast">
          {{ $t('view.resetPassword.title') }}
        </h2>

        <input-text v-model="model.email" type="text" class="contrast" :placeholder="$t('view.resetPassword.account')"/>

        <div class="horiz items-space-between">
          <router-link to="/signIn" class="text-link contrast">
            {{ $t('view.resetPassword.signIn') }}
          </router-link>
        </div>

        <button class="secondary fluid" type="submit">
          {{ $t('view.resetPassword.submit') }}
        </button>
      </await>
    </form>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import { State, Action, Getter } from 'vuex-class'
  import LoginSerialized from '@/model/request/LoginSerialized'

  @Component
  export default class ResetPasswordView extends Vue {
    @Action('auth/resetPassword') resetPassword?: Function
    model = new LoginSerialized()
  }
</script>
