/**
 * Schema of Block
 * @author Simpli© CLI generator
 */
import {InputType, Schema} from '@/simpli'
import Block from '@/model/resource/Block'

/* TODO: review generated schema */
export default (model: Block): Schema => ({
  idBlockPk: {
    content: model.idBlockPk,
    editable: false,
  },

  height: {
    content: model.height,
    inputType: InputType.NUMBER,
    meta: {
      required: true,
      step: '1',
    },
  },

  hash: {
    content: model.hash,
    inputType: InputType.NUMBER,
    meta: {
      required: true,
      step: '1',
    },
  },

  creationDate: {
    content: model.creationDate,
    inputType: InputType.NUMBER,
    meta: {
      required: true,
      step: '1',
    },
  },

  sizeInBytes: {
    content: model.sizeInBytes,
    inputType: InputType.NUMBER,
    meta: {
      required: true,
      step: '1',
    },
  },
})
