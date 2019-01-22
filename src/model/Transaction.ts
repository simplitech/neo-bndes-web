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

/**
 * Is the transaction registered in the smartcontract
 */
export default class Transaction {

  static buildUnspent(responseItem?: ResponseItem[]) {
    const t = new Transaction()

    if (responseItem) {
      t.hash = responseItem[0].value
      t.amount = parseInt(reverseHex(responseItem[1].value), 16)
      t.block = parseInt(responseItem[2].value, 10)
      t.addressOfMasterMint = scriptHashToAddress(responseItem[3].value)

      const previousTstr = responseItem[4].value
      const previousThashes = previousTstr.match(/.{1,64}/g)

      if (previousThashes) {
        t.previousTransactions = previousThashes.map((hash) => {
          const pt = new Transaction()
          pt.hash = hash
          return pt
        })
      }
    }

    return t
  }

  static buildFromHistory(map: any) {
    const t = new Transaction()

    t.hash = map.transactionHash
    t.sender = new RegularAccount(scriptHashToAddress(map.sender))
    t.recipient = new RegularAccount(scriptHashToAddress(map.recipient))
    t.changeTransaction = new Transaction()
    t.changeTransaction.hash = map.changeTransactionHash
    t.changeTransaction.amount = map.change

    return t
  }

  hash = ''
  amount: number | null = null
  sender = new RegularAccount()
  recipient = new RegularAccount()
  block: number | null = null
  addressOfMasterMint = ''
  previousTransactions: Transaction[] = []
  changeTransaction: Transaction | null = null

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
