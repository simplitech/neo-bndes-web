/**
 * Account
 * @author gil
 */
import forge from 'node-forge'
import {Model} from 'simpli-web-sdk'

export default class Account extends Model {

  password: string | null = null

  pkcs12Der: string | null = null

  content: forge.pkcs12.Pkcs12Pfx | null = null

  friendlyNames: string[] | null = null

  selectedFriendlyName: string | null = null

  altNames: string[] = []

  accountName: string | null = null

  accountPassword: string | null = null

  repeatAccountPassword: string | null = null

  wif: string | null = null

  neoAccount: any | null = null

  encryptedWif: string | null = null

  async persist() {
    await this.validate()
    /* TODO */
    await this.POST('/my/api/uri', this, {}, false)
  }
}
