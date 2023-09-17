import { BETH_GLOBAL } from "../shared/global";

type Args<T> = T extends (...args: infer U) => any ? U : never;

function defaultCompare<T extends Array<any>>(arr1: T, arr2: T): boolean {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (!Object.is(arr1[i], arr2[i])) {
      return false;
    }
  }
  return true;
}

export function cache<T extends (...args: any[]) => any>(
  fn: T,
  compareFn: (oldArgs: Args<T>, newArgs: Args<T>) => boolean = defaultCompare
): T {
  return ((...args: Args<T>) => {
    const cached = BETH_GLOBAL.dedupeCache.get(fn) || new Map();

    BETH_GLOBAL.dedupeCache.set(fn, cached);

    for (let [keyArgs, valueOrPromise] of cached.entries()) {
      if (compareFn(args, keyArgs)) {
        return valueOrPromise;
      }
    }

    const functionResult = fn(...args);
    cached.set(args, functionResult);

    return functionResult;
  }) as T;
}
