import { existsSync, unlinkSync } from "node:fs";
import { Database } from "bun:sqlite";
import { BETH_GLOBAL_PERSISTED_CACHE } from "../shared/global";
import { cache } from "./render";

type Brand<K, T> = K & { __brand: T };
type FunctionKey = Brand<string, "FunctionKey">;
type ArgKey = Brand<string, "ArgKey">;

export type CacheOptions = {
  persist?: "memory" | "json";
  revalidate?: number;
  tags?: string[];
  seedImmediately?:
    | boolean
    | {
        initialArgs: any[];
      }
    | {
        multipleInitialArgs: any[][];
      };
};

export type GlobalCacheConfig = {
  log?: "debug" | "major" | "none";
  defaultCacheOptions: Required<CacheOptions>;
  returnStaleWhileRevalidate: boolean;
  onRevalidateErrorReturnStale: boolean;
  rethrowOnUnseededError: boolean;
};

export declare function persistedCache<T extends () => Promise<any>>(
  callBack: T,
  key: string,
  options?: CacheOptions,
): T;

// returns promise that resolves when all data with the tag have completed revalidation
export declare function revalidateTag(tag: string): Promise<void>;

export declare function setGlobalPersistCacheConfig(
  config: Partial<GlobalCacheConfig>,
): void;

type StoredCache = {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
};

class BethMemoryCache implements StoredCache {
  private cache: Map<string, any>;
  constructor() {
    this.cache = new Map();
  }
  public get(key: string) {
    return this.cache.get(key);
  }
  public set(key: string, value: any) {
    this.cache.set(key, value);
  }
}
class BethJsonCache implements StoredCache {
  private db: Database;
  constructor() {
    this.db = new Database("beth-cache.json");
    this.db.exec(
      "CREATE TABLE IF NOT EXISTS cache (key TEXT PRIMARY KEY, value TEXT)",
    );
  }
  public get(key: string) {
    const result = this.db.get("SELECT value FROM cache WHERE key = ?", key);
    if (result) {
      return JSON.parse(result.value);
    } else {
      throw new CacheNotFound(
        `No entry found in json cache when one was expected: ${key}`,
        "json",
      );
    }
  }
  public set(key: string, value: any) {
    this.db.run(
      "INSERT OR REPLACE INTO cache (key, value) VALUES (?, ?)",
      key,
      JSON.stringify(value),
    );
  }
}

class InvariantError extends Error {
  constructor(message: string) {
    super(`${message} - THIS SHOULD NEVER HAPPEN - PLEASE OPEN AN ISSUE`);
  }
}

export class BethPersistedCache {
  private config: GlobalCacheConfig;
  private primaryMap: Map<
    FunctionKey,
    {
      callBack: () => Promise<any>;
      tags: string[];
      location: "memory" | "json";
      argsMap: Map<
        any[],
        {
          argsKey: ArgKey;
          status:
            | "pending"
            | "unseeded"
            | "seeded"
            | "unseeded-error"
            | "seeded-error";
        }
      >;
    }
  >;
  private pendingMap: Map<ArgKey, Promise<any>>;
  private erroredMap: Map<ArgKey, any>;
  private inMemoryDataCache: BethMemoryCache;
  private jsonDataCache: BethJsonCache;
  private intervals: Set<Timer>;
  private keys: Set<string>;

  constructor() {}

  public setConfig(config: Partial<GlobalCacheConfig>): void {}

  public initializeEntry(
    callBack: () => Promise<any>,
    key: FunctionKey,
    options?: CacheOptions,
  ): void {}
  public getCachedValue(key: string, ...args: any[]): any {}

  public async revalidateTag(tag: string): Promise<void> {}

  private logDebug(): void {}

  private log(): void {}

  private rerunCallBack(key: FunctionKey) {}

  private setInterval(key: FunctionKey, revalidate: number) {}
}
