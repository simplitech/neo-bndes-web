import {store} from '@/store'
import { Wallet, Account } from '@cityofzion/neon-core/lib/wallet'

export const isLogged = () => store.getters['auth/isLogged'] as boolean
export const getUserWallet = () => store.getters['auth/userWallet'] as Wallet
export const getAuthAccount = () => store.getters['auth/authAccount'] as Account

export const signOut = () => store.dispatch('auth/signOut')
export const signOutWithError = () => store.dispatch('auth/signOut', true)
