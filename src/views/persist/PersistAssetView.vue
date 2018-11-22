<template>
  <div class="verti">
    <section class="header">
      <h1 class="m-0">
        {{ $t('classes.Asset.title') }}
      </h1>
    </section>

    <section class="container small">
      <await init name="findAssetResp" class="my-20">
        <form class="elevated padded" @submit.prevent="$await.run(persist, 'persist')">

          <div v-for="(field, i) in model.asset.fieldsToInput" :key="i" class="mb-15">
            <resource-input v-model="model.asset" :field="field"/>
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
  import AssetResp from '@/model/resource/response/AssetResp'
  import {$, successAndPush} from '@/simpli'

  @Component
  export default class PersistAssetView extends Vue {
    @Prop({type: [String, Number]}) id?: string
    model = new AssetResp()

    async mounted() {
      await this.model.find(this.id || 0)
    }

    async persist() {
      await this.model.asset.validate()
      await this.model.asset.save()
      successAndPush('system.success.persist', '/asset/list')
    }
  }
</script>
