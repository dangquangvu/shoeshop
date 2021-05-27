import * as mongoose from 'mongoose';
import {getStringEnumValues} from '../../shared/helper';
import {OrderStatusEnum, TransactionStatusEnum} from '../../shared/constants';
const Schema = mongoose.Schema;

export const OrderSchema = new Schema({
  productIds: {
    type: [Schema.Types.ObjectId],
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
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
  isClose: {
    type: String,
    enum: getStringEnumValues(OrderStatusEnum),
  },
  messagesCustomer: {
    type: String,
    required: false,
    trim: true,
  },
  messagesCancel: {
    type: String,
    required: false,
    trim: true,
  },
  closeDate: {
    type: Date,
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
