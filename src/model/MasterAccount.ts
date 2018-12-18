/**
 * AuthRequest
 * @author ftgibran
 */
import {
  addressToScriptHash,
  str2hexstring,
  ValidationPhone,
  ValidationEmail,
  ValidationRequired,
  doInvoke,
  Model,
} from '@/simpli'

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

  constructor(address?: string | null, name?: string | null,
              physicalAddress?: string | null, phone?: string | null, email?: string | null) {
    super()

    if (address) {
      this.address = address
    }

    if (name) {
      this.name = name
    }

    if (physicalAddress) {
      this.physicalAddress = physicalAddress
    }

    if (phone) {
      this.phone = phone
    }

    if (email) {
      this.email = email
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
