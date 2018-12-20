/**
 * AuthRequest
 * @author gil
 */
import TransactionStats from '@/model/TransactionStats'
import {$, apiFullURL} from '@/simpli'
export default class TransactionsCollection {

  list: TransactionStats[] = []

  get amountSumChartData() {
    return this.list.map((i) => ([i.date, i.amountSum]))
  }

  get transactionsCountChartData() {
    return this.list.map((i) => ([i.date, i.transactionsCount]))
  }

  get mintTokensCountChartData() {
    return this.list.map((i) => ([i.date, i.mintTokensCount]))
  }

  get regularAccountsCountChartData() {
    return this.list.map((i) => ([i.date, i.regularAccountsCount]))
  }

  get approvedAccountsCountChartData() {
    return this.list.map((i) => ([i.date, i.approvedAccountsCount]))
  }

  async get(startDate?: string | null, endDate?: string | null) {
    const params: any = {}

    if (startDate) {
      params.startDate = startDate
    }

    if (endDate) {
      params.endDate = endDate
    }

    const resp: any = await $.http.get(apiFullURL('/Indexer/Transaction/Stats'), { params })

    if (resp.ok && resp.body != null) {
      this.list = resp.body.map((transMap: any) => TransactionStats.build(transMap))
    }

    return resp
  }

}
