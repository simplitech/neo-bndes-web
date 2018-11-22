<template>
  <div>
    <section class="header mb-20 py-10">
      <h1 class="container">
        {{$t('view.myAccount.title')}}
      </h1>
    </section>

    <section class="mb-20">
      <div class="container">
        <div class="elevated">
          <div class="py-10">
            <div class="container fluid">

              <div class="display small mb-20">
                {{$t('view.myAccount.walletNotFound')}}
              </div>

              <div class="horiz items-center gutter-5">
                <button>
                  {{$t('view.myAccount.openWallet')}}
                </button>
                <router-link to="/account/new" class="btn success">
                  {{$t('view.myAccount.createWallet')}}
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
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class MyAccountView extends Vue {
  }
</script>
