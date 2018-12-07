import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {AuthState, RootState} from '@/types/store'
import {$, abort, push, errorAndPush, infoAndPush} from '@/simpli'
import AuthRequest from '@/model/request/AuthRequest'
import {wallet} from '@cityofzion/neon-js'

// initial state
const state: AuthState = {
  wif: null,
  userWallet: null,
  eventListener: {
    signIn: [],
    auth: [],
    signOut: [],
  },
}

// getters
const getters: GetterTree<AuthState, RootState> = {
  isLogged: ({wif}) => !!wif,
  wif: ({wif}) => wif,
  userWallet: ({userWallet}) => userWallet,
}

// actions
const actions: ActionTree<AuthState, RootState> = {
  /**
   * Sign in account
   * @param getters
   * @param dispatch
   * @param request
   */
  signIn: async ({getters, commit}, request: AuthRequest) => {
    await request.validate()

    const encryptedWIF = request.encryptedWIF || ''
    const passphrase = request.passphrase || ''

    if (!wallet.isNEP2(encryptedWIF || '')) {
      abort('system.error.invalidEncryptedWif')
    }

    const wif = await wallet.decrypt(encryptedWIF, passphrase)
    if (wif) localStorage.setItem('wif', wif)

    commit('POPULATE')

    infoAndPush('system.info.welcome', '/dashboard')

    state.eventListener.signIn.forEach((item) => item(getters.userWallet))
  },

  /**
   * Verifies authorization and refresh user info.
   * Note: If it is not logged then dispatches signOut
   * @param dispatch
   * @param commit
   * @param getters
   */
  auth: async ({dispatch, commit, getters}) => {
    commit('POPULATE')

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
    if (showError) errorAndPush('system.error.unauthorized', '/signIn')
    else push('/signIn')

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
  // Populate mutation
  POPULATE(state) {
    const wif = localStorage.getItem('wif') || null

    const userWallet = wif ? new wallet.Account(wif) : null

    state.wif = wif
    state.userWallet = userWallet
  },

  // Forget mutation
  FORGET(state) {
    state.wif = null
    state.userWallet = null

    localStorage.removeItem('wif')
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
