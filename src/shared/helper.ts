import * as mongoose from 'mongoose';
export function getStringEnumValues<E extends Record<keyof E, string>>(
  e: E,
): E[keyof E][] {
  return (Object.keys(e) as (keyof E)[]).map(k => e[k]);
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
