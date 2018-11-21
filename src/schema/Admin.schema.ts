/**
 * Schema of Admin
 * @author Simpli© CLI generator
 */
import {InputType, Schema} from '@/simpli'
import Admin from '@/model/resource/Admin'

/* TODO: review generated schema */
export default (model: Admin): Schema => ({
  idAdminPk: {
    content: model.idAdminPk,
    editable: false,
  },

  email: {
    content: model.email,
    input: InputType.EMAIL,
    meta: {
      required: true,
    },
  },

  password: {
    content: model.password,
    hidden: true,
    input: InputType.PASSWORD,
    meta: {
      required: true,
    },
  },
})
