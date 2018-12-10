import {store} from '@/store'
import AuthRequest from '@/model/request/AuthRequest'
import { Account } from '@cityofzion/neon-core/lib/wallet'

export const isLogged = () => store.getters['auth/isLogged'] as boolean
export const getWif = () => store.getters['auth/wif'] as string
export const getUserWallet = () => store.getters['auth/userWallet'] as Account

export const auth = () => store.dispatch('auth/auth')
export const signIn = (request: AuthRequest) => store.dispatch('auth/signIn', request)
export const signOut = () => store.dispatch('auth/signOut')
export const signOutWithError = () => store.dispatch('auth/signOut', true)
