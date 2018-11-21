/**
 * Admin
 * @author gil
 */
import {IValidator, Validator} from 'simpli-web-sdk'

export default class Account implements IValidator {

  async validate(): Promise<void> {
    await Validator.toastValidate(this)
  }

  async save(): Promise<void> {
    // TODO
  }

}
