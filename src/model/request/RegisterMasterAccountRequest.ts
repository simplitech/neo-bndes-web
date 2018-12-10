/**
 * AuthRequest
 * @author ftgibran
 */
import {$, str2hexstring} from '@/simpli'
import {
  ValidationRequired,
  ValidationLength,
} from '@/simpli'
import {SmartContract} from '@/model/SmartContract'

export default class RegisterMasterAccountRequest extends SmartContract {
  $operation: string = 'registerMasterAccount'

  @ValidationRequired()
  @ValidationLength(20)
  newAccount = ''

  @ValidationRequired()
  entityName = ''

  @ValidationRequired()
  entityAddress = ''

  @ValidationRequired()
  entityPhone = ''

  @ValidationRequired()
  entityEmail = ''

  async doInvoke() {
    const {newAccount, entityName, entityAddress, entityPhone, entityEmail} = this

    const params: string[] = [
      str2hexstring(newAccount),
      str2hexstring(entityName),
      str2hexstring(entityAddress),
      str2hexstring(entityPhone),
      str2hexstring(entityEmail),
    ]

    await super.doInvoke(params)
  }
}
