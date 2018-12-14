/**
 * AdminResp
 * @author Simpli© CLI generator
 */
import {$, ID, Resource, TAG} from '../../../../simpli'
import {
  ResponseSerialize,
} from '../../../../simpli'
import Admin from '../Admin'

/* TODO: review generated class */
export default class AdminResp extends Resource {
  readonly $name: string = 'AdminResp'
  readonly $endpoint: string = '/Admin/Admin{/id}'

  get $id() {
    return this.admin.$id
  }
  set $id(val: ID) {
    this.admin.$id = val
  }
  get $tag() {
    return this.admin.$tag
  }
  set $tag(val: TAG) {
    this.admin.$tag = val
  }

  @ResponseSerialize(Admin)
  admin: Admin = new Admin()

  async persistAdmin(model: Admin, spinner = 'persistAdmin') {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/Admin/Admin`, model)
    }

    return await $.await.run(fetch, spinner)
  }

  async getAdmin(id: number, spinner = 'getAdmin') {
    const fetch = async () => await this.GET(`/Admin/Admin/${id}`)
    return await $.await.run(fetch, spinner)
  }
}
