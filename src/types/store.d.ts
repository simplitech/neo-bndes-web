import {ID, Currency, Lang} from '@/simpli'
import Admin from '@/model/resource/Admin'
/**
 * Root
 */
export interface RootState {
  version: string
  language: Lang
  currency: Currency
}

/**
 * Auth Module
 */
export interface AuthState {
  token?: string,
  id?: ID,
  admin: Admin,
  unauthenticatedPath?: string,
  eventListener: AuthEventListener,
}

export interface AuthEventListener {
  [key: string]: Array<(...params: any[]) => void>
}
