/**
 * AssetResp
 * @author Simpli© CLI generator
 */
import {$, ID, Resource, TAG} from '@/simpli'
import {
  ResponseSerialize,
} from '@/simpli'
import Asset from '@/model/resource/Asset'

/* TODO: review generated class */
export default class AssetResp extends Resource {
  readonly $name: string = 'AssetResp'
  readonly $endpoint: string = '/Admin/Asset{/id}'

  get $id() {
    return this.asset.$id
  }
  set $id(val: ID) {
    this.asset.$id = val
  }
  get $tag() {
    return this.asset.$tag
  }
  set $tag(val: TAG) {
    this.asset.$tag = val
  }

  @ResponseSerialize(Asset)
  asset: Asset = new Asset()

  async persistAsset(model: Asset, spinner = 'persistAsset') {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/Admin/Asset`, model)
    }

    return await $.await.run(fetch, spinner)
  }

  async getAsset(id: number, spinner = 'getAsset') {
    const fetch = async () => await this.GET(`/Admin/Asset/${id}`)
    return await $.await.run(fetch, spinner)
  }
}
