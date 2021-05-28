import * as mongoose from 'mongoose';
import { TransactionStatusEnum, ProductMaterialEnum } from '../../shared/constants';
import { getStringEnumValues } from '../../shared/helper';
const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: Boolean,
    required: false,
    default: 1,
  },
  oldFashion: {
    type: Boolean,
    required: false,
    default: 0,
  },
  styleIds: {
    type: [String],
    required: false,
  },
  size: {
    type: [
      {
        sizeDetail: { type: String },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
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
  description: {
    type: String,
    required: false,
    trim: true,
  },
  material: {
    type: String,
    enum: getStringEnumValues(ProductMaterialEnum),
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  images: {
    type: [String],
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
