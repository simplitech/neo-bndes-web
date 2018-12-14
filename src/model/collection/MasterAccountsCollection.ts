/**
 * AuthRequest
 * @author ftgibran
 */
import {chunk} from 'lodash'
import {$, hexstring2str} from '@/simpli'
import {SmartContract} from '@/model/SmartContract'
import {ResponseItem} from '@/types/app'

export interface MasterAccountData {
  entityName: string,
  entityAddress: string,
  entityPhone: string,
  entityEmail: string,
}

export default class MasterAccountsCollection extends SmartContract {

  $operation: string = 'masterAccounts'

  get $params() {
    return []
  }

  items: MasterAccountData[] = []

  async testInvoke() {
    const resp = await super.testInvoke()
    const result: ResponseItem[] = resp.result || {}
    const data: ResponseItem[][] = chunk(result, 4)

    this.items = data.map((item: ResponseItem[]) => ({
      entityName: hexstring2str(item[0].value),
      entityAddress: hexstring2str(item[3].value),
      entityPhone: hexstring2str(item[2].value),
      entityEmail: hexstring2str(item[1].value),
    }))

    return resp
  }

}
