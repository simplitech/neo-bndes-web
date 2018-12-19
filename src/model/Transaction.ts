import {
  reverseHex,
  int2hex,
  addressToScriptHash,
  scriptHashToAddress,
  doInvoke,
  lastSelectedAccount,
} from '@/simpli'
import RegularAccount from '@/model/RegularAccount'
import {ResponseItem} from '@/types/app'

export default class Transaction {

  hash = ''
  amount: number | null = null
  recipient = new RegularAccount()
  block: number | null = null
  addressOfMasterMint = ''
  previousTransactions: Transaction[] = []

  constructor(responseItem?: ResponseItem[] | null) {
    if (responseItem) {
      this.hash = responseItem[0].value
      this.amount = parseInt(reverseHex(responseItem[1].value), 16)
      this.block = parseInt(responseItem[2].value, 10)
      this.addressOfMasterMint = scriptHashToAddress(responseItem[3].value)
      const previousTstr = responseItem[4].value
      const previousThashes = previousTstr.match(/.{1,64}/g)

      if (previousThashes) {
        this.previousTransactions = previousThashes.map((hash) => {
          const pt = new Transaction()
          pt.hash = hash
          return pt
        })
      }
    }
  }

  async transferAmount() {
    if (!this.recipient || !this.amount) {
      return
    }

    return await doInvoke(
      'transferAmount',
      reverseHex(lastSelectedAccount().scriptHash),
      addressToScriptHash(this.recipient.address),
      reverseHex(int2hex(this.amount)))
  }

  async mintTokens() {
    if (!this.recipient || !this.amount) {
      return
    }

    return await doInvoke(
      'mintTokens',
      reverseHex(lastSelectedAccount().scriptHash),
      addressToScriptHash(this.recipient.address),
      reverseHex(int2hex(this.amount)))
  }

}
