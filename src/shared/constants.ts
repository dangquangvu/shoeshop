export const BACKEND_AND_ADMIN_ROLES = ['admin'];

export const BACKEND_ROLES = ['admin', 'user'];

export const DbModel = {
  USER: 'User',
  BLOG: 'Blog',
  COMMENT: 'Comment',
};

export enum TransactionStatusEnum {
  ERROR = 'error', //co loi xay ra
  SUCCESS = 'success', // thanh cong
  PENDING = 'pending', // transaction dang xu ly do
  FAILED = 'failed', //cac transaction khong thanh cong
  PROCESSED = 'processed', // cac transaction dang xu ly
}

export enum PaymentMethod {
  MOMO = 'momo',
}

export enum TransactionType {
  TOPUP = 'topup',
  PURCHASE = 'purchase',
}

export interface IPagination {
  page: number;
  perPage: number;
  startIndex?: number;
  endIndex?: number;
}

export function addMongooseParam(
  mongooseObject = {},
  key: string,
  value: string | object,
) {
  if (!mongooseObject) {
    mongooseObject = {};
  }

  mongooseObject[key] = value;

  return mongooseObject;
}
