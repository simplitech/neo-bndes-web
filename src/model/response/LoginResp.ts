/**
 * LoginResp
 * @author Simpli© CLI generator
 */
import {
  $,
  ID,
  Model,
  encrypt,
  sleep,
} from '@/simpli'
import {
  ResponseSerialize,
  ValidationMaxLength,
} from '@/simpli'
import Admin from '@/model/resource/Admin'
import LoginSerialized from '@/model/request/LoginSerialized'

/* TODO: review generated class */
export default class LoginResp extends Model {
  @ValidationMaxLength(255)
  token: string = ''

  id: ID = 0

  @ResponseSerialize(Admin)
  admin: Admin = new Admin()

  async auth(spinner = 'auth') {
    const fetch = async () => await this.GET(`/Admin/Auth`)
    return await $.await.run(fetch, spinner)
  }

  async recoverPassword(model: LoginSerialized, spinner = 'recoverPassword', delay = 0) {
    const email = model.email = 'xx@xx.co' // it will be ignored (accepted validation)
    const password = encrypt(model.password || '')
    const hash = model.hash

    const fetch = async () => {
      await model.validate()
      return await this.POST(`/Admin/RecoverPassword`, {email, password, hash} as LoginSerialized)
    }

    return await $.await.run(fetch, spinner, delay)
  }

  async resetPassword(model: LoginSerialized, spinner = 'resetPassword', delay = 0) {
    const email = model.email
    const password = model.password = '######' // it will be ignored (accepted validation)
    const hash = model.hash = ''

    const fetch = async () => {
      await model.validate()
      return await this.POST(`/Admin/ResetPassword`, {email, password, hash} as LoginSerialized)
    }

    return await $.await.run(fetch, spinner, delay)
  }

  async signIn(model: LoginSerialized, spinner = 'signIn', delay = 0) {
    const email = model.email
    const password = encrypt(model.password || '')
    const hash = model.hash = ''

    const fetch = async () => {
      await model.validate()
      return await this.POST(`/Admin/SignIn`, {email, password, hash} as LoginSerialized)
    }

    return await $.await.run(fetch, spinner, delay)
  }
}
