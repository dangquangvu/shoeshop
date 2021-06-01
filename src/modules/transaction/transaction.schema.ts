import * as mongoose from 'mongoose';
import { TransactionStatusEnum } from '../../shared/constants';
import { getStringEnumValues } from '../../shared/helper';
const Schema = mongoose.Schema;

export const TransactionSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: getStringEnumValues(TransactionStatusEnum),
  },
  products: {
    type: [
      {
        id: { type: String },
        sizeDetail: { type: String },
        quantity: {
          type: Number,
        },
        amount: {
          type: Number,
        },
      },
    ],
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  isClose: {
    type: Boolean,
    default: false
  },
  messagesCustomer: {
    type: String,
    required: false,
    trim: true,
    default: null
  },
  messagesCancel: {
    type: String,
    required: false,
    trim: true,
    default: null
  },
  closeDate: {
    type: Date,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
