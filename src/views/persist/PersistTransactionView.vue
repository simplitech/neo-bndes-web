<template>
  <div class="verti">
    <section class="header">
      <h1 class="m-0">
        {{ $t('classes.Transaction.title') }}
      </h1>
    </section>

    <section class="container fluid">
      <await init name="findTransactionResp" class="my-20">
        <form class="elevated padded" @submit.prevent="$await.run(persist, 'persist')">

          <div v-for="(field, i) in model.transaction.fieldsToInput" :key="i">
            <resource-input v-model="model.transaction" :field="field" :selectItems="resource[field]"/>
          </div>

          <hr>

          <await name="persist" class="items-center">
            <button type="submit" class="primary">{{ $t('persist.submit') }}</button>
          </await>

        </form>
      </await>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from 'vue-property-decorator'
import TransactionResp from '@/model/resource/response/TransactionResp'
import {$, successAndPush} from '@/simpli'

@Component
export default class PersistTransactionView extends Vue {
  @Prop({type: [String, Number]}) id?: string
  model = new TransactionResp()

  get resource() {
    return {
      block: this.model.allBlock,
      transactionType: this.model.allTransactionType,
    }
  }

  async mounted() {
    await this.model.find(this.id || 0)
  }

  async persist() {
    await this.model.transaction.validate()
    await this.model.transaction.save()
    successAndPush('system.success.persist', '/transaction/list')
  }
}
</script>
