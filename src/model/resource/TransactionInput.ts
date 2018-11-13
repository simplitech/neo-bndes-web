/**
 * TransactionInput
 * @author Simpli© CLI generator
 */
import {$, ID, Resource} from '@/simpli'
import {
  ResponseSerialize,
  ValidationMaxLength,
  ValidationRequired,
} from '@/simpli'
import Asset from '@/model/resource/Asset'
import Transaction from '@/model/resource/Transaction'
import TransactionInputSchema from '@/schema/TransactionInput.schema'

/* TODO: review generated class */
export default class TransactionInput extends Resource {
  readonly $name: string = 'TransactionInput'
  readonly $endpoint: string = '/Admin/TransactionInput{/id}'

  get $schema() {
    return TransactionInputSchema(this)
  }

  get $id() {
    return this.idTransactionInputPk
  }
  set $id(val: ID) {
    this.idTransactionInputPk = val
  }

  @ResponseSerialize(Asset)
  asset: Asset | null = null

  @ResponseSerialize(Transaction)
  transaction1: Transaction | null = null

  @ResponseSerialize(Transaction)
  transaction2: Transaction | null = null

  idTransactionInputPk: ID = 0

  @ValidationRequired()
  amount: number = 0

  @ValidationRequired()
  spent: boolean = false

  @ValidationRequired()
  @ValidationMaxLength(255)
  to: string = ''

  previousIdTransactionFk: number | null = null

  idTransactionFk: ID = 0

  get idAssetFk() {
    if (!this.asset) return 0
    return this.asset.$id
  }
  set idAssetFk(idAssetFk: ID) {
    if (!this.asset) this.asset = new Asset()
    this.asset.$id = idAssetFk
  }

}
