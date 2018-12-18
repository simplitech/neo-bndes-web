import {store} from '@/store'

export const getVersion = () => store.getters.version
export const getLanguage = () => store.getters.language
export const getCurrency = () => store.getters.currency
export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
