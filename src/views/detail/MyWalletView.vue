<template>
  <div>
    <section class="header mb-20 py-10">
      <div class="container horiz gutter-10 items-center">
        <h1 class="weight-1 m-0">
          {{$t('view.myWallet.title')}}
        </h1>
      </div>
    </section>

    <section class="mb-20 container">
        <div class="container fluid">

          <account-selector onlyWallet @authenticated="$await.run(loadAccounts, 'loadAccounts')">

            <div class="horiz mb-30">
              <router-link to="/regular-account/new" class="weight-1 btn mr-15 success">
                {{ $t('view.myWallet.createNewAccount') }}
              </router-link>

              <button class="weight-1 primary" @click="$await.run(exportJson, 'exportJson')">
                <await name="exportJson">
                  {{ $t('view.myWallet.export') }}
                </await>
              </button>
            </div>

            <await name="loadAccounts">
              <account-card v-for="(acc, i) in accounts" :acc="acc" :key="i" class="mb-20"/>
            </await>

          </account-selector>

        </div>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {Action, Getter} from 'vuex-class'
  import {hexstring2str, reverseHex, str2hexstring, successAndPush} from '@/simpli'
  import { Account, Wallet } from '@cityofzion/neon-core/lib/wallet'
  import AccountSelector from '@/components/AccountSelector.vue'
  import AccountCard from '@/components/AccountCard.vue'
  import RegularAccount from '@/model/RegularAccount'

  @Component({
    components: { AccountSelector, AccountCard },
  })
  export default class MyWalletView extends Vue {
    @Getter('auth/userWallet') userWallet?: Wallet
    @Action('auth/exportJson') exportJson!: Function

    accounts: RegularAccount[] = []

    async mounted() {
      await this.loadAccounts()
    }

    async loadAccounts() {
      this.accounts = []

      if (!this.userWallet || !this.userWallet.accounts) {
        return
      }

      this.userWallet.accounts.forEach((acc) =>
        this.accounts.push(new RegularAccount(acc.address, acc.label)))
    }
  }
</script>
