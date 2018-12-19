/**
 * AuthRequest
 * @author gil
 */
import Transaction from '@/model/Transaction'
import {$, apiFullURL} from '@/simpli'

export default class TransactionsCollection {

  list: Transaction[] = []
  recordsTotal = 0

  async get(startDate?: string | null, endDate?: string | null) {
    const params: any = {}

    if (startDate) {
      params.startDate = startDate
    }

    if (endDate) {
      params.endDate = endDate
    }

    const resp: any = await $.http.get(apiFullURL('/Admin/TransferHistory'), { params })

    if (resp.ok && resp.body != null) {
      this.list = resp.body.list.map((transMap: any) => Transaction.buildFromHistory(transMap))
      this.recordsTotal = resp.body.recordsTotal
    }

    return resp
  }

}
