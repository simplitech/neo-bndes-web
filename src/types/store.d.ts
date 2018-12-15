import { Wallet, Account } from '@cityofzion/neon-core/lib/wallet'
import {ID, Currency, Lang} from '@/simpli'

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
  userWallet: Wallet | null
  lastSelectedAccount: Account | null
  eventListener: AuthEventListener
}

export interface AuthEventListener {
  [key: string]: Array<(...params: any[]) => void>
}
