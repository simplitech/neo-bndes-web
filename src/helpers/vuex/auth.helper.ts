import {store} from '@/store'
import LoginSerialized from '@/model/LoginSerialized'

export const isLogged = () => store.getters['auth/isLogged']
export const getToken = () => store.getters['auth/token']
export const getId = () => store.getters['auth/id']
export const getAdmin = () => store.getters['auth/admin']
export const auth = () => store.dispatch('auth/auth')
export const signIn = (model: LoginSerialized) => store.dispatch('auth/signIn', model)
export const signOut = () => store.dispatch('auth/signOut', false)
export const signOutWithError = () => store.dispatch('auth/signOut', true)
