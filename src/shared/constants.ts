export const BACKEND_AND_ADMIN_ROLES = ['admin'];

export const TOTAL_COUNT_HEADER_NAME = 'x-total-count';
export const NEXT_PAGE_HEADER_NAME = 'x-next-page';
export const PAGE_HEADER_NAME = 'x-page';
export const PAGES_COUNT_HEADER_NAME = 'x-pages-count';
export const PER_PAGE_HEADER_NAME = 'x-per-page';
export const CORS_EXPOSED_HEADERS =
  `${NEXT_PAGE_HEADER_NAME},${PAGE_HEADER_NAME},${PAGES_COUNT_HEADER_NAME},` +
  `${PER_PAGE_HEADER_NAME},${TOTAL_COUNT_HEADER_NAME}`;

export const DbModel = {
  USER: 'User',
  STYLE: 'Style',
  PRODUCT: 'Product',
  COLOR: 'Color',
  ORDER: 'Order',
  TRANSACTION: 'Transaction',
  STORE: 'Store',
  COMMENT: 'Comment',
};

export enum TransactionStatusEnum {
  ERROR = 'error', // giao dich bi huy
  SUCCESS = 'success', // thanh cong
  PENDING = 'pending', // transaction dang cho
  FAILED = 'failed', //cac transaction khong thanh cong
  PROCESSING = 'processing', // cac transaction dang xu ly
}

export enum OrderStatusEnum {
  CLOSE = 'close',
  OPEN = 'open',
}

export enum ProductMaterialEnum {
  LEATHER = 'leather',
  FABRIC = 'fabric',
}

export function addMongooseParam(mongooseObject = {}, key: string, value: string | object) {
  if (!mongooseObject) {
    mongooseObject = {};
  }

  mongooseObject[key] = value;

  return mongooseObject;
}
