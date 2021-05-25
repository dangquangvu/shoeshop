import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { getStringEnumValues } from 'src/shared/helper';
import { UserRoles } from './auth.interface';

export const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      minlength: 5,
      maxlength: 255,
    },
    email: {
      type: String,
      lowercase: true,
      maxlength: 255,
      minlength: 6,
      required: [true, 'EMAIL_IS_BLANK'],
      unique: true,
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: [true, 'PASSWORD_IS_BLANK'],
    },
    roles: [
      {
        type: String,
        enum: getStringEnumValues(UserRoles),
        default: 'user',
        required: true,
      },
    ],
    gender: {
      type: Boolean,
      default: true,
    },
    enterprise: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    permission: {
      type: Array,
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
