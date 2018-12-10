<template>
  <div class="verti">
    <section class="header mb-20 py-10">
      <h1 class="container">
        {{ $t('classes.Transaction.title') }}
      </h1>
    </section>

    <section class="container">
      <form class="verti elevated padded mb-30" @submit.prevent="$await.run(persist, 'persist')">

        <div class="horiz gutter-20">
          <div class="verti weight-2 des-ml-100">

            <input-text type="text" v-model="destinationAddress"
                        :label="$t('view.persistTransaction.destinationAddress')"/>
            <input-text type="text" v-model="transactionValue"
                        :label="$t('view.persistTransaction.transactionValue')"/>
            <input-textarea v-model="transactionValue"
                        :label="$t('view.persistTransaction.comments')" rows="8"/>

          </div>
          <div class="verti weight-1 des-mr-100">

            <h3 class="px-15">{{ $t('view.persistTransaction.destinationInfo') }}</h3>

            <div class="infoline horiz py-5 px-15 items-space-between">
              <b>{{ $t('view.persistTransaction.name') }}</b>
              <div>{{ destinationName }}</div>
            </div>

            <div class="infoline horiz py-5 px-15 items-space-between">
              <b>{{ $t('view.persistTransaction.type') }}</b>
              <div>{{ destinationType }}</div>
            </div>

            <div class="infoline horiz py-5 px-15 items-space-between">
              <b>{{ $t('view.persistTransaction.document') }}</b>
              <div>{{ destinationDocument }}</div>
            </div>

            <div class="infoline horiz py-5 px-15 items-space-between">
              <b>{{ $t('view.persistTransaction.publicKey') }}</b>
              <div>{{ destinationPublicKey }}</div>
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
import TransactionResp from '@/model/resource/response/TransactionResp'
import {$, successAndPush, testInvoke, str2hexstring} from '@/simpli'

@Component
export default class PersistTransactionView extends Vue {
  destinationAddress: string | null = null
  transactionValue: number | null = null
  destinationName: string | null = null
  destinationType: string | null = null
  destinationDocument: string | null = null
  destinationPublicKey: string | null = null

  @Watch('destinationAddress')
  async loadDestinationInfo() {
    if (!this.destinationAddress || this.destinationAddress.length < 34) {
      return
    }

    const resp = await testInvoke('getAccount', str2hexstring(this.destinationAddress))
    console.log(resp)
  }
}
</script>
