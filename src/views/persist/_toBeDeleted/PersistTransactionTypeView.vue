<template>
  <div class="verti">
    <section class="header mb-20 py-10">
      <h1 class="container">
        {{ $t('classes.TransactionType.title') }}
      </h1>
    </section>

    <section class="container small">
      <await init name="findTransactionTypeResp" class="my-20">
        <form class="elevated padded" @submit.prevent="$await.run(persist, 'persist')">

          <div v-for="(field, i) in model.transactionType.fieldsToInput" :key="i" class="mb-15">
            <resource-input v-model="model.transactionType" :field="field"/>
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
  import TransactionTypeResp from '../../../model/resource/_toBeDeleted/response/TransactionTypeResp'
  import {$, successAndPush} from '../../../simpli'

  @Component
  export default class PersistTransactionTypeView extends Vue {
    @Prop({type: [String, Number]}) id?: string
    model = new TransactionTypeResp()

    async mounted() {
      await this.model.find(this.id || 0)
    }

    async persist() {
      await this.model.transactionType.validate()
      await this.model.transactionType.save()
      successAndPush('system.success.persist', '/transaction-type/list')
    }
  }
</script>
