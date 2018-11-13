/**
 * TransactionTypeResp
 * @author Simpli© CLI generator
 */
import {$, ID, Resource, TAG} from '@/simpli'
import {
  ResponseSerialize,
} from '@/simpli'
import TransactionType from '@/model/resource/TransactionType'

/* TODO: review generated class */
export default class TransactionTypeResp extends Resource {
  readonly $name: string = 'TransactionTypeResp'
  readonly $endpoint: string = '/Admin/TransactionType{/id}'

  get $id() {
    return this.transactionType.$id
  }
  set $id(val: ID) {
    this.transactionType.$id = val
  }
  get $tag() {
    return this.transactionType.$tag
  }
  set $tag(val: TAG) {
    this.transactionType.$tag = val
  }

  @ResponseSerialize(TransactionType)
  transactionType: TransactionType = new TransactionType()

  async persistTransactionType(model: TransactionType, spinner = 'persistTransactionType') {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/Admin/TransactionType`, model)
    }

    return await $.await.run(fetch, spinner)
  }

  async getTransactionType(id: number, spinner = 'getTransactionType') {
    const fetch = async () => await this.GET(`/Admin/TransactionType/${id}`)
    return await $.await.run(fetch, spinner)
  }
}
