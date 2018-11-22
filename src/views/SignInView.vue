<template>
  <div class="container verti w-window h-window items-center">
    <form @submit.prevent="signIn(model)" class="des-w-300 tab-w-400 mob-w-full">
      <await name="signIn" :spinnerScale="1.5">
        <h2 class="text-center text-uppercase contrast">
          {{ $t('view.signIn.title') }}
        </h2>

        <input-text v-model="model.email" type="text" class="contrast">
          {{ $t('view.signIn.account') }}
        </input-text>

        <input-text v-model="model.password" type="password" class="contrast">
          {{ $t('view.signIn.password') }}
        </input-text>

        <div class="horiz items-space-between">
          <router-link to="/password/reset" class="text-link contrast">
            {{ $t('view.signIn.forgotPassword') }}
          </router-link>
        </div>

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
  import LoginSerialized from '@/model/request/LoginSerialized'

  @Component
  export default class LoginView extends Vue {
    @Action('auth/signIn') signIn?: Function
    model = new LoginSerialized()
  }
</script>
