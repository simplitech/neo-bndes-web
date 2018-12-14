/**
 * TransactionResp
 * @author Simpli© CLI generator
 */
import {$, ID, Resource, TAG} from '../../../../simpli'
import {
  ResponseSerialize,
} from '../../../../simpli'
import Transaction from '../Transaction'
import Block from '../Block'
import TransactionType from '../TransactionType'

/* TODO: review generated class */
export default class TransactionResp extends Resource {
  readonly $name: string = 'TransactionResp'
  readonly $endpoint: string = '/Admin/Transaction{/id}'

  get $id() {
    return this.transaction.$id
  }
  set $id(val: ID) {
    this.transaction.$id = val
  }
  get $tag() {
    return this.transaction.$tag
  }
  set $tag(val: TAG) {
    this.transaction.$tag = val
  }

  @ResponseSerialize(Transaction)
  transaction: Transaction = new Transaction()

  /**
   * Possible Block values
   */
  @ResponseSerialize(Block)
  allBlock: Block[] = []

  /**
   * Possible TransactionType values
   */
  @ResponseSerialize(TransactionType)
  allTransactionType: TransactionType[] = []

  async persistTransaction(model: Transaction, spinner = 'persistTransaction') {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/Admin/Transaction`, model)
    }

    return await $.await.run(fetch, spinner)
  }

  async getTransaction(id: number, spinner = 'getTransaction') {
    const fetch = async () => await this.GET(`/Admin/Transaction/${id}`)
    return await $.await.run(fetch, spinner)
  }
}
