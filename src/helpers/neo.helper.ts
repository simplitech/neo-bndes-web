import Neon, { wallet, rpc, api } from '@cityofzion/neon-js'
import { Account } from '@cityofzion/neon-core/lib/wallet'
import { TransactionOutput } from '@cityofzion/neon-core/lib/tx'
import {lastSelectedAccount} from '@/helpers/vuex/auth.helper'
import {DoInvokeResp, TestInvokeResp} from '@/types/app'

export const contractPath = 'http://52.14.134.207:30333'
export const neoscan = 'http://52.14.134.207:4000/api/main_net'
export const scriptHash = 'ff03a96ee5ccc2f18d6327e657f9be8fa62d1a94'

export const privateNet = new rpc.Network({
  name: 'PrivateNet',
  extra: {neoscan},
})

Neon.add.network(privateNet)

export const hexstring2str = (hexstring?: string) =>
  hexstring && hexstring.length ? Neon.u.hexstring2str(hexstring) : ''

export const str2hexstring = (str?: string) =>
  str && str.length ? Neon.u.str2hexstring(str) : ''

export const reverseHex = (hex?: string) =>
  hex && hex.length ? Neon.u.reverseHex(hex) : ''

export const addressToScriptHash = (address?: string) =>
  address && address.length ? reverseHex(wallet.getScriptHashFromAddress(address)) : ''

export const hex2number = (hex?: string) =>
  hex && hex.length ? parseInt(hex, 16) : ''

export const testInvoke = async (operation: string, ...args: any[]): Promise<TestInvokeResp> => {
  const script = Neon.create.script({ scriptHash, operation, args })

  const resp = await rpc.Query.invokeScript(script).execute(contractPath)

  const result = resp.result.stack && resp.result.stack.length
    ? resp.result.stack[resp.result.stack.length - 1].value
    : null

  const gasConsumed = resp.result.gas_consumed

  return {result, gasConsumed}
}

export const doInvoke = async (operation: string, ...args: any[]): Promise<DoInvokeResp> => {
  return doInvokeWithAccount(lastSelectedAccount(), operation, ...args)
}

export const doInvokeWithAccount =
  async (account: Account, operation: string, ...args: any[]): Promise<DoInvokeResp> => {

  const resp = await testInvoke(operation, ...args)

  const intents = []

  if (parseFloat(resp.gasConsumed) >= 10) {
    intents.push(new TransactionOutput({
      assetId: Neon.CONST.ASSET_ID.GAS,
      value: Number(resp.gasConsumed),
      scriptHash,
    }))
  }

  const opResult = await api.doInvoke({
    api: new api.neoscan.instance('PrivateNet'),
    // @ts-ignore
    account,
    intents,
    script: { scriptHash, operation, args },
    gas: 0,
  })

  return Object.assign(opResult, {
    testResp: resp,
  })
}
