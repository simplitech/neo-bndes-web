/**
 * TransactionInputResp
 * @author Simpli© CLI generator
 */
import {$, ID, Resource, TAG} from '../../../../simpli'
import {
  ResponseSerialize,
} from '../../../../simpli'
import TransactionInput from '../TransactionInput'
import Asset from '../Asset'
import Transaction from '../Transaction'

/* TODO: review generated class */
export default class TransactionInputResp extends Resource {
  readonly $name: string = 'TransactionInputResp'
  readonly $endpoint: string = '/Admin/TransactionInput{/id}'

  get $id() {
    return this.transactionInput.$id
  }
  set $id(val: ID) {
    this.transactionInput.$id = val
  }
  get $tag() {
    return this.transactionInput.$tag
  }
  set $tag(val: TAG) {
    this.transactionInput.$tag = val
  }

  @ResponseSerialize(TransactionInput)
  transactionInput: TransactionInput = new TransactionInput()

  /**
   * Possible Asset values
   */
  @ResponseSerialize(Asset)
  allAsset: Asset[] = []

  /**
   * Possible Transaction values
   */
  @ResponseSerialize(Transaction)
  allTransaction: Transaction[] = []

  async persistTransactionInput(model: TransactionInput, spinner = 'persistTransactionInput') {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/Admin/TransactionInput`, model)
    }

    return await $.await.run(fetch, spinner)
  }

  async getTransactionInput(id: number, spinner = 'getTransactionInput') {
    const fetch = async () => await this.GET(`/Admin/TransactionInput/${id}`)
    return await $.await.run(fetch, spinner)
  }
}
