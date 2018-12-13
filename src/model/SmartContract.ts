/**
 * SmartContract
 * @author ftgibran
 */
import {$, Model, testInvoke, doInvoke, str2hexstring} from '@/simpli'

export abstract class SmartContract extends Model {
  abstract $operation: string
  abstract get $params(): string[]

  get resolvedParams() {
    return this.$params.map((arg: string) => str2hexstring(arg))
  }

  async testInvoke() {
    return await this.fetch(() => testInvoke(this.$operation, this.resolvedParams))
  }

  async doInvoke() {
    return await this.fetch(() => doInvoke(this.$operation, this.resolvedParams))
  }

  async fetch(func: () => Promise<any>) {
    await this.validate()

    try {
      return await $.await.run(func, this.$operation)
    } catch (e) {
      $.snotify.error(e.message)
      throw e
    }
  }
}
