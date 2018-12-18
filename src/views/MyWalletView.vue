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
              <router-link to="/account/new" class="weight-1 btn mr-15 success">
                {{ $t('view.myWallet.createNewAccount') }}
              </router-link>

              <button class="weight-1 primary" @click="$await.run(exportJson, 'exportJson')">
                <await name="exportJson">
                  {{ $t('view.myWallet.export') }}
                </await>
              </button>
            </div>

            <await name="loadAccounts">
              <div v-for="acc in accounts" class="verti mb-20">
                <div class="horiz gutter-10 mb-5 items-left-center">
                  <div class="verti fs-regular" v-if="acc.status !== -1">
                    <span class="control-label">{{ $t('classes.Account.columns.accountName') }}</span>
                    <b>{{ acc.label }}</b>
                  </div>
                  <div class="weight-1 verti fs-regular">
                    <span class="control-label">{{ $t('classes.Account.columns.blockchainAddress') }}</span>
                    <b>{{ acc.address }}</b>
                  </div>
                  <div class="label input" :class="{ success: acc.status === 1, danger: acc.status === -1 }">
                    <div class="label-prefix">
                      {{ $t('classes.Account.columns.status') }}
                    </div>
                    <span>
                      {{ $t(`approvalStatus.${acc.status}`) }}
                    </span>
                  </div>
                  <div class="label input" v-if="acc.status === 1">
                    <div class="label-prefix">
                      {{$t('classes.Account.columns.amount')}}
                    </div>
                    {{amount}} BNDEST
                  </div>

                  <div class="items-right-center" v-if="acc.status === 1">
                    <a class="btn">
                      {{$t('view.myWallet.withdraw')}}
                    </a>
                  </div>
                </div>

                <div v-if="acc.signature" class="elevated horiz items-space-between">
                  <div class="verti mx-10">

                    <b class="fs-huge p-15">
                      {{ $t('classes.Account.columns.certificateInfo') }}
                    </b>

                    <div class="infoline horiz py-5 px-15 items-space-between">
                      <b>{{ $t('view.persistTransaction.name') }}</b>
                      <div>{{ acc.name }}</div>
                    </div>

                    <div class="infoline horiz py-5 px-15 items-space-between">
                      <b>{{ $t('view.persistTransaction.type') }}</b>
                      <div>{{ $t(`accountType.${acc.type}`) }}</div>
                    </div>

                    <div class="infoline horiz py-5 px-15 items-space-between">
                      <b>{{ $t('view.persistTransaction.document') }}</b>
                      <div>{{ acc.document }}</div>
                    </div>
                  </div>

                  <pre class="mr-10 max-h-150 truncate-word" v-html="acc.signature"></pre>
                </div>
              </div>
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
  import RegularAccount from '@/model/RegularAccount'

  @Component({
    components: { AccountSelector },
  })
  export default class MyWalletView extends Vue {
    @Getter('auth/userWallet') userWallet?: Wallet
    @Action('auth/exportJson') exportJson!: Function

    accounts: RegularAccount[] = []

    async loadAccounts() {
      this.accounts = []

      if (!this.userWallet || !this.userWallet.accounts) {
        return
      }

      for (const acc of this.userWallet.accounts) {
        const reg = new RegularAccount(acc.address, acc.label)
        await reg.get()
        await reg.getBalance()
        await reg.getStatus()
        this.accounts.push(reg)
      }
    }
  }
</script>
