<template>
  <div class="verti">
    <section class="header">
      <div class="horiz items-center gutter-10">
        <h1 class="m-0">
          {{$t('classes.Admin.title')}}
        </h1>

        <adap-searchfield :collection="collection" :placeholder="$t('app.search')"/>

        <await name="query"></await>

        <div class="weight-1"></div>

        <span v-if="collection.items.length">
          {{ $t('app.totalLines', {total: collection.total}) }}
        </span>

        <await name="downloadCsv">
          <button @click="downloadCsv">
            {{ $t('app.downloadCsv') }}
          </button>
        </await>

        <router-link to="/admin/new" class="btn primary">
          {{ $t('app.add') }}
        </router-link>
      </div>
    </section>

    <section>
      <transition name="fade-up" mode="out-in">
        <div v-if="!collection.items.length" :key="0">
          <await name="query" spinner="MoonLoader">
            <h3 class="p-20 text-center">
              {{ $t('app.noDataToShow') }}
            </h3>
          </await>
        </div>

        <div v-else :key="1">
          <div class="elevated square intense x-scroll">
            <table>
              <thead>
              <tr>
                <th></th>

                <th v-for="(value, key) in collection.header" :key="key">
                  <adap-orderby :collection="collection" :name="key" :label="value"/>
                </th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(data, i) in collection.data" :key="i">
                <td class="horiz nowrap">
                  <a @click="pushByName('editAdmin', collection.items[i].$id)" class="icon icon-pencil"></a>
                </td>

                <td v-for="(value, key) in data" :key="key">
                  <resource-render v-model="collection.items[i]" :field="key"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <adap-pagination :collection="collection"/>
        </div>
      </transition>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Watch, Mixins, Vue} from 'vue-property-decorator'
  import Admin from '@/model/resource/Admin'
  import PagedResp from '@/model/collection/PagedResp'
  import {$, MixinQueryRouter, pushByName} from '@/simpli'

  @Component({
    mixins: [MixinQueryRouter],
  })
  export default class ListAdminView extends Mixins<MixinQueryRouter>() {
    collection = new PagedResp(Admin)
    pushByName = pushByName

    async downloadCsv() {
      const csv = new PagedResp(Admin, {}, null, null)

      const fetch = async () => await csv.search()
      await $.await.run(fetch, 'downloadCsv')

      csv.downloadCsv()
    }

    async mounted() {
      await this.collection.search()
    }
  }
</script>
