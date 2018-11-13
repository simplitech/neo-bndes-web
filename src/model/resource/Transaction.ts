/**
 * Transaction
 * @author Simpli© CLI generator
 */
import {$, ID, Resource} from '@/simpli'
import {
  ResponseSerialize,
  ValidationMaxLength,
  ValidationRequired,
} from '@/simpli'
import Block from '@/model/resource/Block'
import TransactionType from '@/model/resource/TransactionType'
import TransactionSchema from '@/schema/Transaction.schema'

/* TODO: review generated class */
export default class Transaction extends Resource {
  readonly $name: string = 'Transaction'
  readonly $endpoint: string = '/Admin/Transaction{/id}'

  get $schema() {
    return TransactionSchema(this)
  }

  get $id() {
    return this.idTransactionPk
  }
  set $id(val: ID) {
    this.idTransactionPk = val
  }

  @ResponseSerialize(Block)
  block: Block | null = null

  @ResponseSerialize(TransactionType)
  transactionType: TransactionType | null = null

  idTransactionPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(255)
  hash: string = ''

  @ValidationRequired()
  @ValidationMaxLength(255)
  from: string = ''

  idTypeFk: ID = 0

  get idBlockFk() {
    if (!this.block) return 0
    return this.block.$id
  }
  set idBlockFk(idBlockFk: ID) {
    if (!this.block) this.block = new Block()
    this.block.$id = idBlockFk
  }

}
