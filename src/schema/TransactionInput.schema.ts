/**
 * Schema of TransactionInput
 * @author Simpli© CLI generator
 */
import {InputType, Schema} from '@/simpli'
import {bool} from '@/simpli'
import TransactionInput from '@/model/resource/TransactionInput'

/* TODO: review generated schema */
export default (model: TransactionInput): Schema => ({
  asset: {
    content: model.asset && model.asset.$id,
    input: InputType.SELECT,
  },

  transaction1: {
    content: model.transaction1 && model.transaction1.$id,
    input: InputType.SELECT,
  },

  transaction2: {
    content: model.transaction2 && model.transaction2.$id,
    input: InputType.SELECT,
  },

  idTransactionInputPk: {
    content: model.idTransactionInputPk,
    editable: false,
  },

  amount: {
    content: model.amount,
    input: InputType.NUMBER,
    meta: {
      required: true,
      step: '1',
    },
  },

  spent: {
    content: bool(model.spent),
    input: InputType.CHECKBOX,
  },

  to: {
    content: model.to,
    input: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },
})
