/**
 * Admin
 * @author Simpli© CLI generator
 */
import {$, ID, Resource} from '../../../simpli'
import {
  ResponseHidden,
  ValidationEmail,
  ValidationMaxLength,
  ValidationPasswordLength,
  ValidationRequired,
} from '../../../simpli'
import AdminSchema from '../../../schema/Admin.schema'

/* TODO: review generated class */
export default class Admin extends Resource {
  readonly $name: string = 'Admin'
  readonly $endpoint: string = '/Admin/Admin{/id}'

  get $schema() {
    return AdminSchema(this)
  }

  get $id() {
    return this.idAdminPk
  }
  set $id(val: ID) {
    this.idAdminPk = val
  }

  idAdminPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  @ValidationEmail()
  email: string = ''

  @ResponseHidden()
  @ValidationRequired()
  @ValidationPasswordLength(6, 100)
  password: string = ''

}
