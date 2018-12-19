<template>
  <div>
    <section class="header mb-20 py-10">
      <div class="container horiz items-center">
        <h1 class="weight-1 m-0">
          {{$t('classes.Transaction.title')}}
        </h1>
      </div>
    </section>

    <section class="mb-20 container">
        <div class="container fluid verti">

          <transaction-card v-if="transaction" :transaction="transaction"/>

          <!--<div v-if="account.unspentTransactions.length" class="verti mt-30">-->
            <!--<h2 class="fs-large force-m-0">{{ $t('view.account.unspentTransactions') }}</h2>-->

            <!--<transaction-card v-for="t in account.unspentTransactions" :transaction="t" class="mb-10"/>-->
          <!--</div>-->

        </div>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator'
  import { Account, Wallet } from '@cityofzion/neon-core/lib/wallet'
  import Transaction from '@/model/Transaction'

  @Component({})
  export default class DetailTransactionView extends Vue {
    @Prop() hex?: string

    account = new Transaction()
  }
</script>
