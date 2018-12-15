/**
 * AuthRequest
 * @author ftgibran
 */
import {$, addressToScriptHash, str2hexstring} from '@/simpli'
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
      addressToScriptHash(this.newAccount),
      str2hexstring(this.entityName),
      str2hexstring(this.entityAddress),
      str2hexstring(this.entityPhone),
      str2hexstring(this.entityEmail),
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
