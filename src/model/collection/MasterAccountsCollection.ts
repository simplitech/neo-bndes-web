/**
 * AuthRequest
 * @author ftgibran
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
    const data: ResponseItem[][] = chunk(result, 4)

    this.items = data.map((item: ResponseItem[]) => new MasterAccount(
      null,
      hexstring2str(item[0].value),
      hexstring2str(item[3].value),
      hexstring2str(item[2].value),
      hexstring2str(item[1].value)))

    return resp
  }

}
