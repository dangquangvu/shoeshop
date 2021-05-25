import { DbModel } from 'src/shared/constants';
import * as mongoose from 'mongoose';
import { getStringEnumValues } from 'src/shared/helper';

export const BlogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      default: '',
      required: false,
      trim: true,
    },
    slug: {
      type: String,
      default: '',
      required: true,
      trim: true,
    },
    blogCategory: {
      type: String,
      default: '',
      required: false,
      trim: true,
    },
    blogText: {
      type: String,
      default: '',
      required: true,
      trim: true,
    },
    blogImage: {
      type: String,
      default: '',
      required: false,
      trim: true,
    },
    authorId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: DbModel.USER,
    },
    author: {
      type: String,
      default: '',
      required: false,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
