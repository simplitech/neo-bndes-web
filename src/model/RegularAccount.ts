import { Account } from '@cityofzion/neon-core/lib/wallet'
import {
  ValidationRequired,
  ValidationLength,
  hexstring2str,
  str2hexstring,
  reverseHex,
  addressToScriptHash,
  testInvoke,
  doInvoke,
  doInvokeWithAccount,
} from '@/simpli'
import {ResponseItem} from '@/types/app'

export default class RegularAccount {

  address = ''
  label = ''

  document: string | null = null
  email: string | null = null
  name: string | null = null

  publicKey: string | null = null

  remarks: string | null = null
  signature: string | null = null
  type: number | null = null

  neoAccount: Account | null = null

  balance: number | null = null
  status: number | null = null

  constructor(address?: string, label?: string) {
    if (address) {
      this.address = address
    }

    if (label) {
      this.label = label
    }
  }

  get documentIsCpf() {
    return this.document && this.document.length === 11
  }

  async get() {
    if (!this.address || this.address.length !== 34) {
      return
    }

    const resp = await testInvoke('getRegularAccount', addressToScriptHash(this.address))
    const result: ResponseItem[] = resp.result || {}

    if (result.length) {
      this.document = hexstring2str(result[0].value)
      this.email = hexstring2str(result[1].value)
      this.name = hexstring2str(result[2].value)
      this.publicKey = hexstring2str(result[3].value)
      this.remarks = hexstring2str(result[4].value)
      this.signature = hexstring2str(result[5].value)
      this.type = parseInt(result[6].value, 10)
    }

    return resp
  }

  async getBalance() {
    if (!this.address || this.address.length !== 34) {
      return
    }

    const resp = await testInvoke('getBalance', addressToScriptHash(this.address))
    console.log('getBalance resp:')
    console.log(resp)
    // TODO regular account, get balance
    // const result: ResponseItem[] = resp.result || {}
    // this.balance = parseFloat(result[0].value, 10)

    return resp
  }

  async getStatus() {
    if (!this.address || this.address.length !== 34) {
      return
    }

    const resp = await testInvoke('getAccountStatus', addressToScriptHash(this.address))
    this.status = parseInt(resp.result.length ? resp.result : '0', 10)

    return resp
  }

  async persist() {
    if (!this.publicKey || !this.signature || !this.neoAccount || !this.neoAccount.scriptHash) {
      return
    }

    return await doInvokeWithAccount(
      this.neoAccount,
      'registerRegularAccount',
      reverseHex(this.neoAccount.scriptHash),
      str2hexstring(this.publicKey),
      str2hexstring(this.signature),
      this.documentIsCpf ? 1 : 2,
      str2hexstring(this.document || ''),
      str2hexstring(this.name || ''),
      str2hexstring(this.email || ''),
      str2hexstring('')) // TODO: send remarks
  }

}
