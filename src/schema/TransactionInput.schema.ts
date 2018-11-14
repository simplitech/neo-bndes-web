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
    inputType: InputType.SELECT,
  },

  transaction1: {
    content: model.transaction1 && model.transaction1.$id,
    inputType: InputType.SELECT,
  },

  transaction2: {
    content: model.transaction2 && model.transaction2.$id,
    inputType: InputType.SELECT,
  },

  idTransactionInputPk: {
    content: model.idTransactionInputPk,
    editable: false,
  },

  amount: {
    content: model.amount,
    inputType: InputType.NUMBER,
    meta: {
      required: true,
      step: '1',
    },
  },

  spent: {
    content: bool(model.spent),
    inputType: InputType.CHECKBOX,
  },

  to: {
    content: model.to,
    inputType: InputType.TEXT,
    meta: {
      required: true,
      maxlength: '255',
    },
  },
})
