<template>
  <div class="verti">
    <div class="horiz gutter-10 mb-5 items-left-center">
      <div class="verti fs-regular" v-if="acc.label">
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
        {{acc.balance}} BNDEST
      </div>

      <div class="items-right-center">
        <a class="btn" @click="withdraw" v-if="acc.status === 1 && accIsMine">
          {{$t('view.myWallet.withdraw')}}
        </a>

        <a @click="$await.run(approve, 'approve')" v-if="acc.status === 0 && iAmMaster && !approveDidntSelectedAcc" class="btn mx-15">
          {{$t('view.myWallet.approve')}}
        </a>
      </div>
    </div>

    <div v-if="approveDidntSelectedAcc" class="verti">
      <div class="fs-big">{{ $t('view.account.chooseAnAccountToBeAbleToApprove') }}</div>
      <account-selector @authenticated="$await.run(approve, 'approve')"/>
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
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
  import {Action, Getter} from 'vuex-class'
  import { Account, Wallet } from '@cityofzion/neon-core/lib/wallet'
  import RegularAccount from '@/model/RegularAccount'
  import AccountSelector from '@/components/AccountSelector.vue'

  @Component({
    components: { AccountSelector },
  })
  export default class AccountCard extends Vue {
    @Getter('auth/userWallet') userWallet?: Wallet
    @Getter('auth/lastSelectedAccount') lastSelectedAccount?: Account
    @Action('auth/doIHaveAMasterAccount') doIHaveAMasterAccount!: Function
    @Prop({type: RegularAccount}) acc?: RegularAccount

    iAmMaster = false
    approveDidntSelectedAcc = false

    get accIsMine() {
      return this.userWallet
        && this.userWallet.accounts.some((acc: Account) =>
          acc != null && this.acc != null && acc.address === this.acc.address)
    }

    async mounted() {
      this.iAmMaster = await this.doIHaveAMasterAccount()

      if (!this.acc) return

      await this.acc.get()
      await this.acc.getBalance()
      await this.acc.getStatus()
    }

    async approve() {
      if (!this.acc) return

      console.log(this.lastSelectedAccount)
      if (!this.lastSelectedAccount) {
        this.approveDidntSelectedAcc = true
        return
      }

      await this.acc.approve()
      this.approveDidntSelectedAcc = false
    }

    async withdraw() {
      // TODO
    }
  }
</script>
