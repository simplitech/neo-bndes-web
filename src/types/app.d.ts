import {DoInvokeConfig} from '@cityofzion/neon-api/lib/funcs/types'

export interface TestInvokeResp {
  result: any,
  gasConsumed: string,
}

export interface DoInvokeResp extends DoInvokeConfig {
  testResp: TestInvokeResp,
}

export interface ResponseItem {
  type: string,
  value: string,
}
