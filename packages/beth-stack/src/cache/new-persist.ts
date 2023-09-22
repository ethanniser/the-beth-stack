import { existsSync, unlinkSync } from "node:fs";
import { Database } from "bun:sqlite";
import { BETH_GLOBAL_PERSISTED_CACHE } from "../shared/global";
import { cache } from "./render";

type Brand<K, T> = K & { __brand: T };
type FunctionKey = Brand<string, "FunctionKey">;
type ArgKey = Brand<string, "ArgKey">;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

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
  log: "debug" | "major" | "none";
  defaultCacheOptions: Required<CacheOptions>;
  errorHandling: Required<ErrorHandlingConfig>;
  returnStaleWhileRevalidating: boolean;
};

type ErrorHandlingConfig = {
  duringRevalidation?: "return-stale" | "rethrow" | "rerun on next call";
  duringRevalidationWhileUnseeded?: "rerun on next call" | "rethrow";
  duringImmediateSeed?: "rerun on next call" | "rethrow";
};

const startingConfig: GlobalCacheConfig = {
  log: "major",
  defaultCacheOptions: {
    persist: "json",
    revalidate: Infinity,
    tags: [],
    seedImmediately: true,
  },
  errorHandling: {
    duringRevalidation: "return-stale",
    duringRevalidationWhileUnseeded: "rerun on next call",
    duringImmediateSeed: "rerun on next call",
  },
  returnStaleWhileRevalidating: true,
};

export declare function persistedCache<T extends () => Promise<any>>(
  callBack: T,
  key: string,
  options?: CacheOptions,
): T;

// returns promise that resolves when all data with the tag have completed revalidation
export declare function revalidateTag(tag: string): Promise<void>;

// if null, will use default config
export declare function setGlobalPersistCacheConfig(
  config: DeepPartial<GlobalCacheConfig> | null,
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
    const result = this.cache.get(key);
    if (result) {
      return result;
    } else {
      throw new Error(
        `No entry found in memory cache when one was expected: ${key}`,
      );
    }
  }
  public set(key: string, value: any) {
    this.cache.set(key, value);
  }
}
class BethJsonCache implements StoredCache {
  private db: Database;
  constructor() {
    if (existsSync("beth-cache.sqlite")) {
      unlinkSync("beth-cache.sqlite");
    }

    this.db = new Database("beth-cache.sqlite");
    this.db.exec(
      "CREATE TABLE IF NOT EXISTS cache (key TEXT PRIMARY KEY, value TEXT NOT NULL)",
    );
  }
  public get(key: string) {
    const result = this.db
      .query("SELECT value FROM cache WHERE key = ?")
      .get(key) as { value: string } | undefined;
    if (result) {
      return JSON.parse(result.value);
    } else {
      throw new Error(
        `No entry found in json cache when one was expected: ${key}`,
      );
    }
  }
  public set(key: string, value: any) {
    this.db
      .query(
        `
        INSERT INTO cache (key, value)
        VALUES (?, ?)
        ON CONFLICT (key) DO UPDATE SET value = excluded.value;
        `,
      )
      .run(key, JSON.stringify(value));
  }
}

class InvariantError extends Error {
  constructor(message: string) {
    super(
      `${message} - THIS SHOULD NEVER HAPPEN - PLEASE OPEN AN ISSUE ethanniser/beth-stack`,
    );
  }
}

export class BethPersistedCache {
  private config: GlobalCacheConfig = startingConfig;
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
  > = new Map();
  private pendingMap: Map<ArgKey, Promise<any>> = new Map();
  private erroredMap: Map<ArgKey, any> = new Map();
  private inMemoryDataCache: BethMemoryCache = new BethMemoryCache();
  private jsonDataCache: BethJsonCache = new BethJsonCache();
  private intervals: Set<Timer> = new Set();
  private keys: Set<string> = new Set();

  constructor() {}

  public setConfig(config: Partial<GlobalCacheConfig>): void {}

  public clearAllIntervals(): void {
    this.intervals.forEach((interval) => clearInterval(interval));
  }
  public purgeAllCachedData(): void {
    this.primaryMap = new Map();
    this.erroredMap = new Map();
    this.inMemoryDataCache = new BethMemoryCache();
    this.jsonDataCache = new BethJsonCache();
    this.primaryMap.forEach((fnData, key) => {
      fnData.argsMap.forEach((fnData, key) => {
        fnData.status = "unseeded";
      });
    });
  }

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
