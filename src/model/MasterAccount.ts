/**
 * AuthRequest
 * @author ftgibran
 */
import {
  addressToScriptHash,
  scriptHashToAddress,
  str2hexstring,
  ValidationPhone,
  ValidationEmail,
  ValidationRequired,
  doInvoke,
  hexstring2str,
  Model,
} from '@/simpli'
import {ResponseItem} from '@/types/app'

export default class MasterAccount extends Model {

  @ValidationRequired()
  address = ''

  @ValidationRequired()
  name = ''

  @ValidationRequired()
  physicalAddress = ''

  @ValidationRequired()
  @ValidationPhone()
  phone = ''

  @ValidationRequired()
  @ValidationEmail()
  email = ''

  constructor(responseItem?: ResponseItem[] | null) {
    super()
    if (responseItem) {
      this.name = hexstring2str(responseItem[0].value)
      this.email = hexstring2str(responseItem[1].value)
      this.phone = hexstring2str(responseItem[2].value)
      this.physicalAddress = hexstring2str(responseItem[3].value)
      this.address = scriptHashToAddress(responseItem[4].value)
    }
  }

  async persist() {
    await this.validate()

    return await doInvoke(
      'registerMasterAccount',
      addressToScriptHash(this.address),
      str2hexstring(this.name),
      str2hexstring(this.physicalAddress),
      str2hexstring(this.phone),
      str2hexstring(this.email))
  }

}
