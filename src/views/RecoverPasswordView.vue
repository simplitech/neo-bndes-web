<template>
  <div class="container verti w-window h-window items-center">
    <form @submit.prevent="submit" class="des-w-300 tab-w-400 mob-w-full">
      <await name="recoverPassword" :spinnerScale="1.5">
        <h2 class="text-center text-uppercase contrast">
          {{ $t('view.recoverPassword.title') }}
        </h2>

        <input-text v-model="model.password" type="password" class="contrast" :placeholder="$t('view.recoverPassword.newPassword')"/>
        <input-text v-model="password" type="password" class="contrast" :placeholder="$t('view.recoverPassword.confirmPassword')"/>

        <button class="secondary fluid" type="submit">
          {{ $t('view.recoverPassword.submit') }}
        </button>
      </await>
    </form>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import { State, Action, Getter } from 'vuex-class'
  import LoginSerialized from '@/model/LoginSerialized'
  import { error } from '@/simpli'

  @Component
  export default class RecoverPasswordView extends Vue {
    @Prop({type: [String, Number]}) hash?: string
    @Action('auth/recoverPassword') recoverPassword?: Function

    model = new LoginSerialized()
    password: string | null = null

    created() {
      this.model.hash = this.hash!
    }

    submit() {
      if (this.password !== this.model.password) {
        error('system.error.samePassword')
        return
      }
      this.recoverPassword!(this.model)
    }
  }
</script>
