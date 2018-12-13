/**
 * AuthRequest
 * @author ftgibran
 */
import {$, str2hexstring} from '@/simpli'
import {
  ValidationPhone,
  ValidationEmail,
  ValidationRequired,
  ValidationLength,
} from '@/simpli'
import {SmartContract} from '@/model/SmartContract'

export default class RegisterMasterAccountRequest extends SmartContract {

  $operation: string = 'registerMasterAccount'

  get $params() {
    return [
      this.newAccount,
      this.entityName,
      this.entityAddress,
      this.entityPhone,
      this.entityEmail,
    ]
  }

  @ValidationRequired()
  newAccount = ''

  @ValidationRequired()
  entityName = ''

  @ValidationRequired()
  entityAddress = ''

  @ValidationRequired()
  @ValidationPhone()
  entityPhone = ''

  @ValidationRequired()
  @ValidationEmail()
  entityEmail = ''

}
