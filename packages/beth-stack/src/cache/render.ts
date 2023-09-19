import { Children } from "../jsx";
import { BETH_GLOBAL_RENDER_CACHE } from "../shared/global";

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
  compareFn: (oldArgs: Args<T>, newArgs: Args<T>) => boolean = defaultCompare,
): T {
  return ((...args: Args<T>) => {
    const cached = BETH_GLOBAL_RENDER_CACHE.dedupeCache.get(fn) || new Map();

    BETH_GLOBAL_RENDER_CACHE.dedupeCache.set(fn, cached);

    for (let [keyArgs, cachedValue] of cached.entries()) {
      if (compareFn(args, keyArgs)) {
        if (cachedValue.type === "error") {
          throw cachedValue.error;
        } else {
          return cachedValue.value;
        }
      }
    }

    try {
      const functionResult = fn(...args);
      cached.set(args, { type: "result", value: functionResult });
      return functionResult;
    } catch (error) {
      cached.set(args, { type: "error", error });
      throw error;
    }
  }) as T;
}

type CachedValue<T> =
  | { type: "result"; value: T }
  | { type: "error"; error: any };

export class BethRenderCache {
  public dedupeCache: WeakMap<Function, Map<Array<any>, CachedValue<any>>>;
  public streamController: ReadableStreamDefaultController<string> | undefined;
  public counter: number;
  private suspenseMap: Map<Children, number>;
  public sentFirstChunk: boolean;

  constructor() {
    this.dedupeCache = new WeakMap();
    this.streamController = undefined;
    this.counter = 1;
    this.suspenseMap = new Map();
    this.sentFirstChunk = false;
  }

  public reset() {
    this.dedupeCache = new WeakMap();
    this.streamController = undefined;
    this.counter = 1;
    this.suspenseMap = new Map();
    this.sentFirstChunk = false;
  }

  public registerChild(child: Children[]): number {
    const id = this.counter++;
    this.suspenseMap.set(child, id);
    return id;
  }

  public dismissChild(child: Children[]): number | undefined {
    const id = this.suspenseMap.get(child);
    if (id) {
      this.suspenseMap.delete(child);
    }
    return id;
  }

  public closeNow() {
    this.streamController?.close();
    this.reset();
  }

  public checkIfEndAndClose() {
    if (this.suspenseMap.size === 0) {
      this.closeNow();
    }
  }
}
