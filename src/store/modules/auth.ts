import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {AuthState, RootState} from '@/types/store'
import {push, infoAndPush, error} from '@/simpli'
import {wallet} from '@cityofzion/neon-js'
import { Wallet, Account } from '@cityofzion/neon-core/lib/wallet'
import MasterAccountsCollection from '@/model/collection/MasterAccountsCollection'

const state: AuthState = {
  userWallet: null,
  lastSelectedAccount: null,
}

const getters: GetterTree<AuthState, RootState> = {
  isLogged: ({userWallet}) => userWallet != null,
  userWallet: ({userWallet}) => userWallet,
  lastSelectedAccount: ({lastSelectedAccount}) => lastSelectedAccount,
}

const actions: ActionTree<AuthState, RootState> = {
  addAccount: async ({getters, commit}, account: Account) => {
    const userWallet = getters.userWallet || new Wallet()
    userWallet.addAccount(account)
    commit('SAVE', userWallet)

    infoAndPush('system.info.welcome', '/my-wallet')
  },

  saveWallet: async ({getters, commit}, userWallet: Wallet) => {
    commit('SAVE', userWallet)
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
    try {
      if (password) {
        await account.decrypt(password)
      }
      commit('SELECT_ACCOUNT', account)
    } catch (e) {
      error(e.message)
    }
  },

  doIHaveAMasterAccount: async ({ getters }) => {
    if (!getters.userWallet) {
      return false
    }

    const masterAccounts = new MasterAccountsCollection()
    await masterAccounts.get()

    return getters.userWallet.accounts.some((acc: Account) =>
      masterAccounts.items.some((ma) => ma.address === acc.address))
  },

  signOut: ({state, commit}, showError: boolean = false) => {
    if (showError) error('system.error.unauthorized')
    else push('/my-account')

    commit('FORGET')
  },
}

const mutations: MutationTree<AuthState> = {
  SAVE(state, userWallet) {
    state.userWallet = userWallet
  },

  SELECT_ACCOUNT(state, account) {
    state.lastSelectedAccount = account
  },

  FORGET(state) {
    state.userWallet = null
    state.lastSelectedAccount = null
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
