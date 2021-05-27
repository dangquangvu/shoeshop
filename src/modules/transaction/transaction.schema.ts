import * as mongoose from 'mongoose';
import {TransactionStatusEnum} from '../../shared/constants';
import {getStringEnumValues} from '../../shared/helper';
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
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: getStringEnumValues(TransactionStatusEnum),
  },
  productIds: {
    type: [Schema.Types.ObjectId],
  },
  messages: {
    type: String,
    required: false,
    trim: true,
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
