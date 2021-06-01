import * as mongoose from 'mongoose';
import { IPagination, IPaginationHeader } from 'src/adapter/pagination/pagination.interface';

export function getStringEnumValues<E extends Record<keyof E, string>>(e: E): E[keyof E][] {
  return (Object.keys(e) as (keyof E)[]).map((k) => e[k]);
}

export function checkObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export function isEmptyObj(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

const convertObject = (dbObj: any, exclude?: Array<string>): object => {
  const apiObj = {};

  if (!dbObj) {
    return null;
  }

  if (typeof dbObj.toObject === 'function') {
    dbObj = dbObj.toObject();
  }

  for (let name of Object.keys(dbObj)) {
    let value = dbObj[name];

    if (name === '_id') {
      name = 'id';
      value = value.toString();
    }

    if (name.indexOf('_') === 0) {
      continue;
    }

    if (exclude?.indexOf(name) >= 0) {
      continue;
    }

    apiObj[name] = value;
  }

  return apiObj;
};

export function getHeaders(pagination: IPagination, totalCount: number): IPaginationHeader {
  const page = Number(pagination.page);
  const perPage = Number(pagination.perPage);
  const pagesCount = Math.ceil(totalCount / perPage);

  return {
    'x-page': page,
    'x-total-count': totalCount,
    'x-pages-count': pagesCount,
    'x-per-page': perPage,
    'x-next-page': page === pagesCount ? page : page + 1,
  };
}

export interface IPaginationResponse<T> {
  items: T[];
  headers: IPaginationHeader;
}

export const db2api = (db: any, exclude?: Array<string>): any => {
  let response = null;

  if (db instanceof Array) {
    response = [];
    for (const obj of db) {
      response.push(convertObject(obj, exclude));
    }
  } else {
    response = convertObject(db, exclude);
  }
  return response;
};

export function isObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}