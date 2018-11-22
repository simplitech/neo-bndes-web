/**
 * Schema of Transaction
 * @author Simpli© CLI generator
 */
import {InputType, Schema} from '@/simpli'
import Transaction from '@/model/resource/Transaction'

/* TODO: review generated schema */
export default (model: Transaction): Schema => ({
  block: {
    content: model.block && model.block.$id,
    input: InputType.SELECT,
  },

  transactionType: {
    content: model.transactionType && model.transactionType.$id,
    input: InputType.SELECT,
  },

  idTransactionPk: {
    content: model.idTransactionPk,
    editable: false,
  },

  hash: {
    content: model.hash,
    input: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },

  from: {
    content: model.from,
    input: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },
})
