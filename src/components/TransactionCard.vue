<template>
  <div class="verti">
    <div class="horiz items-center items-space-between">
      <div class="fs-regular">
        {{ transaction.hash }}
      </div>

      <div class="label input force-my-7">
        <div class="label-prefix">
          {{$t('classes.Transaction.columns.amount')}}
        </div>
        {{ transaction.amount }} BNDEST
      </div>
    </div>

    <div class="elevated p-10">
      <div class="horiz items-space-between">
        <div class="verti">
          <b>{{ $t('classes.Transaction.columns.addressOfMasterMint') }}</b>
          <div>{{ transaction.addressOfMasterMint }}</div>
        </div>
        <div class="verti">
          <b>{{ $t('classes.Transaction.columns.block') }}</b>
          <div>{{ transaction.block }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
  import Transaction from '@/model/Transaction'

  @Component({})
  export default class TransactionCard extends Vue {
    @Prop({type: Transaction}) transaction?: Transaction

    async mounted() {
      // TODO tem conteúdo?
    }
  }
</script>
