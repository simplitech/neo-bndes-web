import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {AuthState, RootState} from '@/types/store'
import {$, abort, push, errorAndPush, infoAndPush, info, error} from '@/simpli'
import {wallet} from '@cityofzion/neon-js'
import { Wallet } from '@cityofzion/neon-core/lib/wallet'

// initial state
const state: AuthState = {
  userWallet: null,
  lastSelectedAccount: null,
  eventListener: {
    signIn: [],
    auth: [],
    signOut: [],
  },
}

// getters
const getters: GetterTree<AuthState, RootState> = {
  isLogged: ({userWallet}) => userWallet != null,
  userWallet: ({userWallet}) => userWallet,
  lastSelectedAccount: ({lastSelectedAccount}) => lastSelectedAccount,
}

// actions
const actions: ActionTree<AuthState, RootState> = {
  /**
   * Sign in account
   * @param getters
   * @param dispatch
   * @param request
   */
  addAccount: async ({getters, commit}, account: Account) => {
    const userWallet = getters.userWallet || new Wallet()
    userWallet.addAccount(account)
    commit('SAVE', userWallet)

    state.eventListener.signIn.forEach((item) => item(getters.userWallet))
    infoAndPush('system.info.welcome', '/my-wallet')
  },

  saveWallet: async ({getters, commit}, userWallet: Wallet) => {
    commit('SAVE', userWallet)

    state.eventListener.signIn.forEach((item) => item(getters.userWallet))
  },

  exportJson: async ({getters}) => {
    const content = JSON.stringify(getters.userWallet.export())
    const filename = 'wallet.json'

    const blob = new Blob([content], { type: 'text/json;charset=utf-8;' })
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename)
    } else {
      const link = document.createElement('a')
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', filename)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  },

  selectAccount: async ({commit}, { account, password }) => {
    await account.decrypt(password)
    commit('SELECT_ACCOUNT', account)
  },

  /**
   * Sign out account
   * @param state
   * @param commit
   * @param showError
   */
  signOut: ({state, commit}, showError: boolean = false) => {
    if (showError) error('system.error.unauthorized')
    else push('/my-account')

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
  SAVE(state, userWallet) {
    state.userWallet = userWallet
  },

  SELECT_ACCOUNT(state, account) {
    state.lastSelectedAccount = account
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
