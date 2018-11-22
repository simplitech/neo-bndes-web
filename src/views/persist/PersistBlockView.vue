<template>
  <div class="verti">
    <section class="header mb-20 py-10">
      <h1 class="container">
        {{ $t('classes.Block.title') }}
      </h1>
    </section>

    <section class="container small">
      <await init name="findBlockResp" class="my-20">
        <form class="elevated padded" @submit.prevent="$await.run(persist, 'persist')">

          <div v-for="(field, i) in model.block.fieldsToInput" :key="i" class="mb-15">
            <resource-input v-model="model.block" :field="field"/>
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
  import BlockResp from '@/model/resource/response/BlockResp'
  import {$, successAndPush} from '@/simpli'

  @Component
  export default class PersistBlockView extends Vue {
    @Prop({type: [String, Number]}) id?: string
    model = new BlockResp()

    async mounted() {
      await this.model.find(this.id || 0)
    }

    async persist() {
      await this.model.block.validate()
      await this.model.block.save()
      successAndPush('system.success.persist', '/block/list')
    }
  }
</script>
