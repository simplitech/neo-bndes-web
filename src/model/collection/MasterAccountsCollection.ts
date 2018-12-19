/**
 * AuthRequest
 * @author gil
 */
import {chunk} from 'lodash'
import {$, hexstring2str, testInvoke} from '@/simpli'
import {ResponseItem} from '@/types/app'
import MasterAccount from '@/model/MasterAccount'

export default class MasterAccountsCollection {

  items: MasterAccount[] = []

  async get() {
    const resp = await testInvoke('masterAccounts')
    const result: ResponseItem[] = resp.result || {}
    const data: ResponseItem[][] = chunk(result, 5)

    this.items = data.map((item: ResponseItem[]) => new MasterAccount(item))

    return resp
  }

}
