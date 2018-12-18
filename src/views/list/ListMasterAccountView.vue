<template>
  <div class="verti">
    <section class="header mb-20 py-10">
      <div class="container horiz gutter-10 items-center">
        <h1 class="weight-1 m-0">
          {{$t('classes.ListMasterAccount.title')}}
        </h1>

        <router-link tag="button" to="/mint" class="contrast">
          {{$t('view.mint.title')}}
        </router-link>

        <router-link tag="button" to="/master-account/new" class="contrast">
          {{$t('classes.MasterAccount.title')}}
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
                <th>{{ $t('classes.MasterAccount.columns.name') }}</th>
                <th>{{ $t('classes.MasterAccount.columns.address') }}</th>
                <th>{{ $t('classes.MasterAccount.columns.physicalAddress') }}</th>
                <th>{{ $t('classes.MasterAccount.columns.phone') }}</th>
                <th>{{ $t('classes.MasterAccount.columns.email') }}</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(masAcc, i) in list.items" :key="i">
                <td>
                  {{ masAcc.name }}
                </td>
                <td>
                  {{ masAcc.address }}
                </td>
                <td>
                  {{ masAcc.physicalAddress }}
                </td>
                <td>
                {{ masAcc.phone }}
                </td>
                <td>
                {{ masAcc.email }}
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
  import {$} from '@/simpli'
  import MasterAccountsCollection from '@/model/collection/MasterAccountsCollection'
  import MasterAccount from '@/model/MasterAccount'

  @Component
  export default class ListMasterAccountView extends Vue {
    list = new MasterAccountsCollection()

    async mounted() {
      await this.$await.run(() => this.list.get(), 'masterAccounts')
    }
  }
</script>
