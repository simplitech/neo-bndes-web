/**
 * TransactionType
 * @author Simpli© CLI generator
 */
import {$, ID, Resource, TAG} from '@/simpli'
import {
  ValidationMaxLength,
  ValidationRequired,
} from '@/simpli'
import TransactionTypeSchema from '@/schema/TransactionType.schema'

/* TODO: review generated class */
export default class TransactionType extends Resource {
  readonly $name: string = 'TransactionType'
  readonly $endpoint: string = '/Admin/TransactionType{/id}'

  get $schema() {
    return TransactionTypeSchema(this)
  }

  get $id() {
    return this.idTransactionTypePk
  }
  set $id(val: ID) {
    this.idTransactionTypePk = val
  }
  get $tag() {
    return this.name
  }
  set $tag(val: TAG) {
    this.name = val
  }

  idTransactionTypePk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  name: string = ''

}
