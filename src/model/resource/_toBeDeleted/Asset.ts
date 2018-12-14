/**
 * Asset
 * @author Simpli© CLI generator
 */
import {$, ID, Resource, TAG} from '../../../simpli'
import {
  ValidationMaxLength,
} from '../../../simpli'
import AssetSchema from '../../../schema/Asset.schema'

/* TODO: review generated class */
export default class Asset extends Resource {
  readonly $name: string = 'Asset'
  readonly $endpoint: string = '/Admin/Asset{/id}'

  get $schema() {
    return AssetSchema(this)
  }

  get $id() {
    return this.idAssetPk
  }
  set $id(val: ID) {
    this.idAssetPk = val
  }
  get $tag() {
    return this.name
  }
  set $tag(val: TAG) {
    this.name = val
  }

  idAssetPk: ID = 0

  @ValidationMaxLength(100)
  name: string = ''

}
