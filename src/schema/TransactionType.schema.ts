/**
 * Schema of TransactionType
 * @author Simpli© CLI generator
 */
import {InputType, Schema} from '@/simpli'
import TransactionType from '@/model/resource/TransactionType'

/* TODO: review generated schema */
export default (model: TransactionType): Schema => ({
  idTransactionTypePk: {
    content: model.idTransactionTypePk,
    editable: false,
  },

  name: {
    content: model.name,
    inputType: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },
})
