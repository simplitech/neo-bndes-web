/**
 * LoginSerialized
 * @author Simpli© CLI generator
 */
import {$, Model, encrypt, sleep} from '@/simpli'
import {
  ResponseHidden,
  ValidationEmail,
  ValidationMaxLength,
  ValidationPasswordLength,
} from '@/simpli'

/* TODO: review generated class */
export default class LoginSerialized extends Model {
  @ValidationMaxLength(100)
  @ValidationEmail()
  email: string | null = null

  @ResponseHidden()
  @ValidationPasswordLength(6, 100)
  password: string | null = null

  @ValidationMaxLength(255)
  hash: string | null = null
}
