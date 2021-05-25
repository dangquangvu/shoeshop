import * as mongoose from 'mongoose';
import { DbModel } from '../../shared/constants';
const Schema = mongoose.Schema;

export const CommentSchema = new Schema({
  id_user_cmt: {
    type: Schema.Types.ObjectId,
    ref: DbModel.USER,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  id_blog: {
    type: Schema.Types.ObjectId,
    ref: DbModel.BLOG,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  isedit: {
    type: Boolean,
    default: false,
  },
  isannounce: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});
