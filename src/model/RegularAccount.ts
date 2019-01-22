import { Account } from '@cityofzion/neon-core/lib/wallet'
import {
  hexstring2str,
  str2hexstring,
  reverseHex,
  addressToScriptHash,
  testInvoke,
  doInvoke,
  doInvokeWithAccount,
  lastSelectedAccount,
} from '@/simpli'
import {chunk} from 'lodash'
import {ResponseItem} from '@/types/app'
import Transaction from '@/model/Transaction'

/**
 * Is the user account registered on the smartcontract
 */
export default class RegularAccount {

  address = ''
  name: string | null = null
  email: string | null = null

  label = ''
  document: string | null = null
  publicKey: string | null = null
  remarks: string | null = null
  signature: string | null = null
  type: number | null = null
  neoAccount: Account | null = null
  status: number | null = null

  unspentTransactions: Transaction[] = []

  constructor(address?: string, label?: string) {
    if (address) {
      this.address = address
    }

    if (label) {
      this.label = label
    }
  }

  get balance() {
    return this.unspentTransactions.reduce((sum, t) => sum + (t && t.amount ? t.amount : 0), 0)
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
      this.type = parseInt(result[6].value, 10)
    }

    return resp
  }

  async getSignature() {
    if (!this.address || this.address.length !== 34) {
      return
    }

    const resp = await testInvoke('getAccountSignature', addressToScriptHash(this.address))
    this.signature = hexstring2str(resp.result)

    return resp
  }

  async getUnspentTransactions() {
    if (!this.address || this.address.length !== 34) {
      return
    }

    const resp = await testInvoke('getBalance', addressToScriptHash(this.address))

    const result: ResponseItem[] = resp.result || {}
    const data: ResponseItem[][] = chunk(result, 5)

    this.unspentTransactions = data.map((item: ResponseItem[]) => Transaction.buildUnspent(item))

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

  async approve() {
    if (!this.address) {
      return
    }

    const resp = await doInvoke(
      'approveRegularAccount',
      addressToScriptHash(this.address),
      reverseHex(lastSelectedAccount().scriptHash))

    if (resp.response && resp.response.result) {
      this.status = 1
    }

    return resp
  }

}
