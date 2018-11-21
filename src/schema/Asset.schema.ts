/**
 * Schema of Asset
 * @author Simpli© CLI generator
 */
import {InputType, Schema} from '@/simpli'
import Asset from '@/model/resource/Asset'

/* TODO: review generated schema */
export default (model: Asset): Schema => ({
  idAssetPk: {
    content: model.idAssetPk,
    editable: false,
  },

  name: {
    content: model.name,
    input: InputType.TEXT,
    meta: {
      maxlength: '255',
    },
  },
})
