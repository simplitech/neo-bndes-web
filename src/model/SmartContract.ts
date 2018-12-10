/**
 * SmartContract
 * @author ftgibran
 */
import {$, Model, doInvoke} from '@/simpli'

export abstract class SmartContract extends Model {
  abstract $operation: string

  async doInvoke(...args: any[]) {
    const fetch = async () => await doInvoke(this.$operation, args)

    try {
      await $.await.run(fetch, this.$operation)
    } catch (e) {
      $.snotify.error(e.message)
      throw e
    }
  }
}
