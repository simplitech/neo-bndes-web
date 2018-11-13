/**
 * BlockResp
 * @author Simpli© CLI generator
 */
import {$, ID, Resource, TAG} from '@/simpli'
import {
  ResponseSerialize,
} from '@/simpli'
import Block from '@/model/resource/Block'

/* TODO: review generated class */
export default class BlockResp extends Resource {
  readonly $name: string = 'BlockResp'
  readonly $endpoint: string = '/Admin/Block{/id}'

  get $id() {
    return this.block.$id
  }
  set $id(val: ID) {
    this.block.$id = val
  }
  get $tag() {
    return this.block.$tag
  }
  set $tag(val: TAG) {
    this.block.$tag = val
  }

  @ResponseSerialize(Block)
  block: Block = new Block()

  async persistBlock(model: Block, spinner = 'persistBlock') {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/Admin/Block`, model)
    }

    return await $.await.run(fetch, spinner)
  }

  async getBlock(id: number, spinner = 'getBlock') {
    const fetch = async () => await this.GET(`/Admin/Block/${id}`)
    return await $.await.run(fetch, spinner)
  }
}
