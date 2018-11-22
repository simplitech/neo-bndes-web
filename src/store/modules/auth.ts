import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import * as types from '@/store/mutation-types'
import {AuthState, RootState} from '@/types/store'
import {$, push, successAndPush, errorAndPush, infoAndPush} from '@/simpli'
import LoginSerialized from '@/model/request/LoginSerialized'
import LoginResp from '@/model/response/LoginResp'
import Admin from '@/model/resource/Admin'

// initial state
const state: AuthState = {
  token: undefined,
  id: undefined,
  admin: new Admin(),
  unauthenticatedPath: undefined,
  eventListener: {
    signIn: [],
    auth: [],
    signOut: [],
  },
}

// getters
const getters: GetterTree<AuthState, RootState> = {
  isLogged: ({id, token}) => !!id && !!token,
  token: ({token}) => token,
  id: ({id}) => id,
  admin: ({admin}) => admin,
  unauthenticatedPath: ({unauthenticatedPath}) => unauthenticatedPath,
}

// actions
const actions: ActionTree<AuthState, RootState> = {
  /**
   * Sign in account
   * @param state
   * @param commit
   * @param getters
   * @param model format => model: { account, password } (non-encrypted)
   */
  signIn: async ({state, commit, getters}, model: LoginSerialized) => {
    const loginResp = new LoginResp()

    await loginResp.signIn(model, 'signIn', 1000)

    if (loginResp.token) localStorage.setItem('token', loginResp.token)
    if (loginResp.id) localStorage.setItem('id', loginResp.id as string)
    if (loginResp.admin) localStorage.setItem('admin', JSON.stringify(loginResp.admin))

    commit(types.POPULATE)

    if (getters!.unauthenticatedPath && $.route.name !== 'signIn') {
      infoAndPush('system.info.welcome', getters!.unauthenticatedPath)
    } else {
      infoAndPush('system.info.welcome', '/dashboard')
    }
    commit(types.SET_UNAUTHENTICATED_PATH, undefined)

    state.eventListener.signIn.forEach((item) => item(loginResp))
  },

  /**
   * Verifies authorization and refresh user info.
   * Note: If it is not logged then dispatches signOut
   * @param dispatch
   * @param commit
   * @param getters
   */
  auth: async ({dispatch, commit, getters}) => {
    commit(types.POPULATE)

    if (getters.isLogged) {
      const loginResp = new LoginResp()

      await loginResp.auth()

      dispatch('refresh', loginResp)
      state.eventListener.auth.forEach((item) => item(loginResp))
    } else {
      commit(types.SET_UNAUTHENTICATED_PATH, $.route.path)
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

    commit(types.FORGET)
    state.eventListener.signOut.forEach((item) => item())
  },

  /**
   * Reset password
   * @param context
   * @param model
   */
  resetPassword: async (context, model: LoginSerialized) => {
    await new LoginResp(Number).resetPassword(model)
    successAndPush('system.success.resetPassword', '/signIn')
  },

  /**
   * Recover password
   * @param context
   * @param model
   */
  recoverPassword: async (context, model: LoginSerialized) => {
    await new LoginResp(String).recoverPassword(model)
    successAndPush('system.success.recoverPassword', '/signIn')
  },

  /**
   * Refresh user info
   * @param commit
   * @param data
   */
  refresh: ({commit}, data: LoginResp) => {
    if (data.token) localStorage.setItem('token', data.token)
    if (data.id) localStorage.setItem('id', data.id as string)
    if (data.admin) localStorage.setItem('admin', JSON.stringify(data.admin))

    commit(types.POPULATE)
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
  addEventListener: ({commit}, payload) => commit(types.ADD_EVENT_LISTENER, payload),

  /**
   * Remove event listener
   * @param commit
   * @param payload
   */
  removeEventListener: ({commit}, payload) => commit(types.REMOVE_EVENT_LISTENER, payload),
}

// mutations
const mutations: MutationTree<AuthState> = {
  // Populate mutation
  [types.POPULATE](state) {
    const token = localStorage.getItem('token')!
    const id = localStorage.getItem('id')!
    const admin = JSON.parse(localStorage.getItem('admin')!)

    state.token = token
    state.id = id
    state.admin = admin
  },
  // Forget mutation
  [types.FORGET](state) {
    state.token = undefined
    state.id = undefined
    state.admin = new Admin()

    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('admin')
  },
  // Set UnauthenticatedPath mutation
  [types.SET_UNAUTHENTICATED_PATH](state, val) {
    state.unauthenticatedPath = val
  },
  // Add Event Listener mutation
  [types.ADD_EVENT_LISTENER](state, {name, callback}) {
    state.eventListener[name].push(callback)
  },
  // Remove Event Listener mutation
  [types.REMOVE_EVENT_LISTENER](state, {name, callback}) {
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
