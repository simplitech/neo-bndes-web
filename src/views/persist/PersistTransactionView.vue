<template>
  <div class="verti">
    <section class="header mb-20 py-10">
      <h1 class="container">
        {{ $t('classes.Transaction.title') }}
      </h1>
    </section>

    <section class="container">
      <form class="verti elevated mb-30 py-15 des-px-100" @submit.prevent="$await.run(persist, 'persist')">

        <div class="horiz gutter-20">
          <div class="verti weight-2">

            <account-selector autoAuthenticate class="mb-15"/>

            <input-text type="text" v-model="transaction.recipient.address"
                        :label="$t('view.persistTransaction.destinationAddress')"/>
            <input-text type="number" v-model="transaction.amount"
                        :label="$t('view.persistTransaction.transactionValue')"/>

          </div>
          <div class="verti weight-1">

            <h3 class="px-15">{{ $t('view.persistTransaction.destinationInfo') }}</h3>

            <div class="infoline horiz py-5 px-15 items-space-between">
              <b>{{ $t('view.persistTransaction.name') }}</b>
              <div>{{ transaction.recipient.name }}</div>
            </div>

            <div class="infoline horiz py-5 px-15 items-space-between">
              <b>{{ $t('view.persistTransaction.type') }}</b>
              <div>{{ transaction.recipient.type }}</div>
            </div>

            <div class="infoline horiz py-5 px-15 items-space-between">
              <b>{{ $t('view.persistTransaction.document') }}</b>
              <div>{{ transaction.recipient.document }}</div>
            </div>

            <div class="infoline horiz py-5 px-15 items-space-between">
              <b>{{ $t('view.persistTransaction.publicKey') }}</b>
              <div class="truncate max-w-300">{{ transaction.recipient.publicKey }}</div>
            </div>

          </div>
        </div>

        <hr>

        <await name="persist" class="items-center">
          <button type="submit" class="primary">{{ $t('persist.submit') }}</button>
        </await>

      </form>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from 'vue-property-decorator'
import {$, successAndPush, str2hexstring, addressToScriptHash} from '../../simpli'
import RegularAccount from '@/model/RegularAccount'
import AccountSelector from '@/components/AccountSelector.vue'
import Transaction from '@/model/Transaction'

@Component({
  components: { AccountSelector },
})
export default class PersistTransactionView extends Vue {
  transaction = new Transaction()

  @Watch('transaction.recipient.address')
  async loadDestinationInfo() {
    await this.transaction.recipient.get()
  }

  async persist() {
    const resp = await this.transaction.transferAmount()
    if (resp && resp.response && resp.response.result) {
      successAndPush('system.success.persist', '/my-account')
    }
  }
}
</script>
