/**
 * Block
 * @author Simpli© CLI generator
 */
import {$, ID, Resource} from '@/simpli'
import {
  ValidationRequired,
} from '@/simpli'
import BlockSchema from '@/schema/Block.schema'

/* TODO: review generated class */
export default class Block extends Resource {
  readonly $name: string = 'Block'
  readonly $endpoint: string = '/Admin/Block{/id}'

  get $schema() {
    return BlockSchema(this)
  }

  get $id() {
    return this.idBlockPk
  }
  set $id(val: ID) {
    this.idBlockPk = val
  }

  idBlockPk: ID = 0

  @ValidationRequired()
  height: number = 0

  @ValidationRequired()
  hash: number = 0

  @ValidationRequired()
  creationDate: number = 0

  @ValidationRequired()
  sizeInBytes: number = 0

}
