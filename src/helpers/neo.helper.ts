import Neon, { wallet, rpc, api } from '@cityofzion/neon-js'
import { Account } from '@cityofzion/neon-core/lib/wallet'
import { TransactionOutput } from '@cityofzion/neon-core/lib/tx'
import { getUserWallet } from '@/simpli'

export const contractPath = 'http://52.14.134.207:30333'
export const neoscan = 'http://52.14.134.207:4000/api/main_net'
export const scriptHash = '7bf2fdd890bdc8aef2c822dd0236aa22e7e32793'

export const privateNet = new rpc.Network({
  name: process.env.VUE_PRIVATE_NET_NAME as string,
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

export const testInvoke = async (operation: string, ...args: any[]) => {
  const script = Neon.create.script({ scriptHash, operation, args })

  const resp = await rpc.Query.invokeScript(script).execute(contractPath)

  const result = resp.result.stack
  && resp.result.stack.length
    ? resp.result.stack[resp.result.stack.length - 1].value
    : null

  const gasConsumed = resp.result.gas_consumed

  return {result, gasConsumed}
}

export const doInvoke = async (operation: string, ...args: any[]) => {
  const userWallet = getUserWallet()
  const resp = await testInvoke(operation, ...args)

  const transactionOutput = new TransactionOutput({
    assetId: Neon.CONST.ASSET_ID.GAS,
    value: resp.gasConsumed,
    scriptHash,
  })

  const opResult = await api.doInvoke({
    api: new api.neoscan.instance('PrivateNet'),
    // @ts-ignore
    privateKey: userWallet.privateKey,
    address: userWallet.address,
    intents: [transactionOutput],
    script: { scriptHash, operation, args },
    gas: 0,
  })

  if (opResult.response.result) return resp.result

  throw Error('There is no result')
}
