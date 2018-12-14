<template>
  <div class="verti">
    <section class="header mb-20 py-10">
      <h1 class="container">
        {{ $t('classes.Admin.title') }}
      </h1>
    </section>

    <section class="container small">
      <await init name="findAdminResp" class="my-20">
        <form class="elevated padded" @submit.prevent="$await.run(persist, 'persist')">

          <div v-for="(field, i) in model.admin.fieldsToInput" :key="i" class="mb-15 h-35">
            <resource-input v-model="model.admin" :field="field"/>
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
  import AdminResp from '../../../model/resource/_toBeDeleted/response/AdminResp'
  import {$, successAndPush} from '../../../simpli'

  @Component
  export default class PersistAdminView extends Vue {
    @Prop({type: [String, Number]}) id?: string
    model = new AdminResp()

    async mounted() {
      await this.model.find(this.id || 0)
    }

    async persist() {
      await this.model.admin.validate()
      await this.model.admin.save()
      successAndPush('system.success.persist', '/admin/list')
    }
  }
</script>
