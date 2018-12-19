<template>
  <div>
    <section class="header mb-20 py-10">
      <div class="container horiz gutter-10 items-center">
        <h1 class="weight-1 m-0">
          {{$t('view.charts.title')}}
        </h1>
      </div>
    </section>

    <section class="mb-20 container">
      <div class="container fluid verti">

        <form @submit.prevent="loadContent" class="horiz mb-30 items-center-bottom">
          <div class="verti">
            <label>{{ $t('view.charts.start') }}</label>
            <input
                v-model="startStr"
                type="date"
                class="w-190 mr-10"
                :placeholder="$t('view.charts.start')"/>
          </div>
          <div class="verti mr-10">
            <label>{{ $t('view.charts.end') }}</label>
            <input
                v-model="endStr"
                type="date"
                class="w-190"
                :placeholder="$t('view.charts.end')"/>
          </div>
          <button type="submit" class="mb-5">{{ $t('app.filter') }}</button>
        </form>

        <div class="horiz items-space-around mb-40">
          <div class="verti w-450 h-400 mb-20 elevated p-10">
            <h2>Nome do Gráfico</h2>
            <line-chart :data="[['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3]]"/>
          </div>
          <div class="verti w-450 h-400 mb-20 elevated p-10">
            <h2>Nome do Gráfico</h2>
            <line-chart :data="[['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3]]"/>
          </div>
          <div class="verti w-450 h-400 mb-20 elevated p-10">
            <h2>Nome do Gráfico</h2>
            <line-chart :data="[['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3]]"/>
          </div>
          <div class="verti w-450 h-400 mb-20 elevated p-10">
            <h2>Nome do Gráfico</h2>
            <line-chart :data="[['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3]]"/>
          </div>
          <div class="verti w-450 h-400 mb-20 elevated p-10">
            <h2>Nome do Gráfico</h2>
            <line-chart :data="[['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3]]"/>
          </div>
          <div class="verti w-450 h-400 mb-20 elevated p-10">
            <h2>Nome do Gráfico</h2>
            <line-chart :data="[['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3]]"/>
          </div>
        </div>

        <table class="mb-40">
          <thead>
            <tr>
              <th>{{ $t('classes.Transaction.columns.hash') }}</th>
              <th>{{ $t('classes.Transaction.columns.sender') }}</th>
              <th>{{ $t('classes.Transaction.columns.recipient') }}</th>
              <th>{{ $t('classes.Transaction.columns.change') }}</th>
              <th>{{ $t('classes.Transaction.columns.changeTransaction') }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(transaction, i) in transactions.list" :key="i">
              <td><div class="w-100 truncate">{{ transaction.hash }}</div></td>
              <td><div class="w-100 truncate">{{ transaction.sender.address }}</div></td>
              <td><div class="w-100 truncate">{{ transaction.recipient.address }}</div></td>
              <td>{{ transaction.changeTransaction.amount }}</td>
              <td><div class="w-100 truncate">{{ transaction.changeTransaction.hash }}</div></td>
            </tr>
          </tbody>
        </table>

      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import moment from 'moment'
  import TransactionsCollection from '@/model/collection/TransactionsCollection'

  @Component({})
  export default class ChartsView extends Vue {

    transactions = new TransactionsCollection()
    startDt: string | null = null
    endDt: string | null = null

    mounted() {
      this.loadContent()
    }

    async loadContent() {
      await this.transactions.get(this.startDt, this.endDt)
    }

    get startStr() {
      return this.strFromDt(this.startDt)
    }

    set startStr(val) {
      if (!val) {
        return
      }

      const dt = this.dtFromStr(val)

      if (dt) {
        this.startDt = dt
      }
    }

    get endStr() {
      return this.strFromDt(this.endDt)
    }

    set endStr(val) {
      if (!val) {
        return
      }

      const dt = this.dtFromStr(val)

      if (dt) {
        this.endDt = dt
      }
    }

    strFromDt(dt: string | null) {
      return dt ? moment(dt).format('YYYY-MM-DD') : null
    }

    dtFromStr(dt: string | null) {
      if (!dt) {
        return null
      }

      const dtMoment = moment(dt)

      if (dtMoment.year() < 1000) {
        return null
      }

      return dtMoment.format()
    }
  }
</script>
