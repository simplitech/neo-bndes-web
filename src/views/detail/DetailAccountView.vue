<template>
  <div>
    <section class="header mb-20 py-10">
      <div class="container horiz items-center">
        <h1 class="weight-1 m-0">
          {{$t('view.account.title')}}
        </h1>
      </div>
    </section>

    <section class="mb-20 container">
        <div class="container fluid verti">

          <account-card v-if="account" :acc="account"/>

          <div v-if="account.unspentTransactions.length" class="verti mt-30">
            <h2 class="fs-large force-m-0">{{ $t('view.account.unspentTransactions') }}</h2>

            <transaction-card v-for="t in account.unspentTransactions" :transaction="t" class="mb-10"/>
          </div>

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
  import TransactionCard from '@/components/TransactionCard.vue'

  @Component({
    components: { AccountCard, TransactionCard },
  })
  export default class DetailAccountView extends Vue {
    @Prop() address?: string

    account = new RegularAccount(this.address)
  }
</script>
