/**
 * AuthRequest
 * @author ftgibran
 */
import {$, Model, encrypt, sleep} from '../../simpli'
import {
  ResponseHidden,
  ValidationRequired,
  ValidationMaxLength,
} from '../../simpli'

/* TODO: review generated class */
export default class AuthRequest extends Model {
  @ResponseHidden()
  @ValidationRequired()
  @ValidationMaxLength(100)
  passphrase: string | null = null

  @ResponseHidden()
  @ValidationRequired()
  @ValidationMaxLength(100)
  encryptedWIF: string | null = null
}
