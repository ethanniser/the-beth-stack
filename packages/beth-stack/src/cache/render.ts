import { Children } from "../jsx";
import { BETH_GLOBAL_RENDER_CACHE } from "../shared/global";

export function cache<T extends (...args: any[]) => any>(fn: T): T {
  return ((...args: unknown[]) => {
    const cachedResults = BETH_GLOBAL_RENDER_CACHE.dedupeCache.get(fn);

    if (cachedResults) {
      for (let [keyArgs, cachedValue] of cachedResults.entries()) {
        if (Bun.deepEquals(args, keyArgs, true)) {
          if (cachedValue.type === "error") {
            console.log("throwing cached error");
            throw cachedValue.error;
          } else {
            console.log("returning cached value");
            return cachedValue.value;
          }
        }
      }
    } else {
      const newCache = new Map();

      BETH_GLOBAL_RENDER_CACHE.dedupeCache.set(fn, newCache);

      try {
        const functionResult = fn(...args);
        newCache.set(args, { type: "result", value: functionResult });
        return functionResult;
      } catch (error) {
        newCache.set(args, { type: "error", error });
        throw error;
      }
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
    console.log("resetting render cache");
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
