/**
 * SmartContract
 * @author ftgibran
 */
import {$, Model, testInvoke, doInvoke} from '@/simpli'
import {DoInvokeResp, TestInvokeResp} from '@/types/app'

export abstract class SmartContract extends Model {
  abstract $operation: string
  abstract get $params(): string[]

  async testInvoke(): Promise<TestInvokeResp> {
    return await this.fetch(() => testInvoke(this.$operation, ...this.$params))
  }

  async doInvoke(): Promise<DoInvokeResp> {
    return await this.fetch(() => doInvoke(this.$operation, ...this.$params))
  }

  async fetch(func: () => Promise<TestInvokeResp | DoInvokeResp>) {
    await this.validate()

    try {
      return await $.await.run(func, this.$operation)
    } catch (e) {
      $.snotify.error(e.message)
      throw e
    }
  }
}
