<template>
  <div>
    <section class="header mb-20 py-10">
      <div class="container horiz gutter-10 items-center">
        <h1 class="weight-1 m-0">
          {{$t('view.account.title')}}
        </h1>
      </div>
    </section>

    <section class="mb-20 container">
        <div class="container fluid">

          <account-card v-if="account" :acc="account"/>

        </div>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'
  import {Action, Getter} from 'vuex-class'
  import {hexstring2str, reverseHex, str2hexstring, successAndPush} from '@/simpli'
  import { Account, Wallet } from '@cityofzion/neon-core/lib/wallet'
  import RegularAccount from '@/model/RegularAccount'
  import AccountCard from '@/components/AccountCard.vue'

  @Component({
    components: { AccountCard },
  })
  export default class DetailAccountView extends Vue {
    @Getter('auth/userWallet') userWallet?: Wallet
    @Action('auth/exportJson') exportJson!: Function

    @Prop() address?: string

    account = new RegularAccount(this.address)
  }
</script>
