<template>
  <div class="verti">
    <section class="header mb-20 py-10">
      <div class="container horiz gutter-10 items-center">
        <h1 class="weight-1 m-0">
          {{$t('classes.ListMasterAccount.title')}}
        </h1>

        <router-link tag="button" to="/master-account/new" class="contrast">
          {{$t('classes.RegisterMasterAccountRequest.title')}}
        </router-link>
      </div>
    </section>

    <section class="container">
      <await init name="masterAccounts" spinner="MoonLoader">
        <div v-if="!list.items.length" :key="0">
          <h3 class="p-20 text-center">
            {{ $t('app.noDataToShow') }}
          </h3>
        </div>

        <div v-else :key="1">
          <div class="elevated intense x-scroll">
            <table>
              <thead>
              <tr>
                <th v-for="(item, i) in header" :key="i">
                  {{item}}
                </th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(row, i) in list.items" :key="i">
                <td v-for="(column, j) in row" :key="j">
                  {{column}}
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>
      </await>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Watch, Vue} from 'vue-property-decorator'
  import {$, doInvoke, testInvoke} from '../../simpli'
  import MasterAccountsCollection, {MasterAccountData} from '../../model/collection/MasterAccountsCollection'

  @Component
  export default class ListMasterAccountView extends Vue {
    header: MasterAccountData = {
      entityName: $.t('classes.RegisterMasterAccountRequest.columns.entityName'),
      entityAddress: $.t('classes.RegisterMasterAccountRequest.columns.entityAddress'),
      entityPhone: $.t('classes.RegisterMasterAccountRequest.columns.entityPhone'),
      entityEmail: $.t('classes.RegisterMasterAccountRequest.columns.entityEmail'),
    }

    list = new MasterAccountsCollection()

    async mounted() {
      await this.list.testInvoke()
    }
  }
</script>
