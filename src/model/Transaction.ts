import {
  reverseHex,
  addressToScriptHash,
  doInvoke,
  lastSelectedAccount,
} from '@/simpli'
import RegularAccount from '@/model/RegularAccount'

export default class Transaction {

  recipient = new RegularAccount()
  amount: number | null = null

  async transferAmount() {
    if (!this.recipient || !this.amount) {
      return
    }

    return await doInvoke(
      'transferAmount',
      reverseHex(lastSelectedAccount().scriptHash),
      addressToScriptHash(this.recipient.address),
      this.amount)
  }

  async mintTokens() {
    if (!this.recipient || !this.amount) {
      return
    }

    return await doInvoke(
      'mintTokens',
      reverseHex(lastSelectedAccount().scriptHash),
      addressToScriptHash(this.recipient.address),
      this.amount)
  }

}
