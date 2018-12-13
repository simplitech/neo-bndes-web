import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {AuthState, RootState} from '@/types/store'
import {$, abort, push, errorAndPush, infoAndPush, info} from '@/simpli'
import AuthRequest from '@/model/request/AuthRequest'
import {wallet} from '@cityofzion/neon-js'
import { Wallet } from '@cityofzion/neon-core/lib/wallet'

// initial state
const state: AuthState = {
  userWallet: null,
  authAccount: null,
  eventListener: {
    signIn: [],
    auth: [],
    signOut: [],
  },
}

// getters
const getters: GetterTree<AuthState, RootState> = {
  isLogged: ({authAccount}) => authAccount != null,
  userWallet: ({userWallet}) => userWallet,
  authAccount: ({authAccount}) => authAccount,
}

// actions
const actions: ActionTree<AuthState, RootState> = {
  /**
   * Sign in account
   * @param getters
   * @param dispatch
   * @param request
   */
  addAccount: async ({getters, commit}, request: AuthRequest) => {
    await request.validate()

    const encryptedWIF = request.encryptedWIF || ''
    const passphrase = request.passphrase || ''

    if (!wallet.isNEP2(encryptedWIF || '')) {
      abort('system.error.invalidEncryptedWif')
    }

    const fetch = async () => {
      const wif = await wallet.decrypt(encryptedWIF, passphrase)
      if (wif) {
        const userWallet = getters.userWallet || new Wallet()
        const authAccount = new wallet.Account(wif)
        userWallet.addAccount(authAccount)
        commit('SAVE', { userWallet, authAccount })

        state.eventListener.signIn.forEach((item) => item(getters.userWallet))
        infoAndPush('system.info.welcome', '/my-wallet')
      }
    }

    await $.await.run(fetch, 'signIn')
  },

  saveWallet: async ({getters, commit}, userWallet: Wallet) => {
    commit('SAVE', { userWallet })

    state.eventListener.signIn.forEach((item) => item(getters.userWallet))
    infoAndPush('system.info.welcome', '/my-wallet')
  },

  /**
   * Verifies authorization and refresh user info.
   * Note: If it is not logged then dispatches signOut
   * @param dispatch
   * @param commit
   * @param getters
   */
  auth: async ({dispatch, commit, getters}) => {
    if (getters.isLogged) {
      state.eventListener.auth.forEach((item) => item(getters.userWallet))
    } else {
      dispatch('signOut', true)
    }
  },

  /**
   * Sign out account
   * @param state
   * @param commit
   * @param showError
   */
  signOut: ({state, commit}, showError: boolean = false) => {
    if (showError) errorAndPush('system.error.unauthorized', '/my-account/signin')
    else push('/my-account/signin')

    commit('FORGET')
    state.eventListener.signOut.forEach((item) => item())
  },

  /**
   * On SignIn Event
   * @param dispatch
   * @param callback
   */
  onSignIn: ({dispatch}, callback) => dispatch('addEventListener', {name: 'signIn', callback}),

  /**
   * On Auth Event
   * @param dispatch
   * @param callback
   */
  onAuth: ({dispatch}, callback) => dispatch('addEventListener', {name: 'auth', callback}),

  /**
   * On SignOut Event
   * @param dispatch
   * @param callback
   */
  onSignOut: ({dispatch}, callback) => dispatch('addEventListener', {name: 'signOut', callback}),

  /**
   * Add event listener
   * @param commit
   * @param payload {name, callback}
   */
  addEventListener: ({commit}, payload) => commit('ADD_EVENT_LISTENER', payload),

  /**
   * Remove event listener
   * @param commit
   * @param payload
   */
  removeEventListener: ({commit}, payload) => commit('REMOVE_EVENT_LISTENER', payload),
}

// mutations
const mutations: MutationTree<AuthState> = {
  SAVE(state, { userWallet, authAccount }) {
    state.userWallet = userWallet
    state.authAccount = authAccount
  },
  // Forget mutation
  FORGET(state) {
    state.userWallet = null
  },

  // Add Event Listener mutation
  ADD_EVENT_LISTENER(state, {name, callback}) {
    state.eventListener[name].push(callback)
  },

  // Remove Event Listener mutation
  REMOVE_EVENT_LISTENER(state, {name, callback}) {
    if (callback) {
      const index = state.eventListener[name].findIndex((item) => item === callback)
      state.eventListener[name].splice(index, 1)
    } else {
      state.eventListener[name] = []
    }
  },
}

const namespaced: boolean = true
export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}
