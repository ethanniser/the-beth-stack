import { existsSync, unlinkSync } from "node:fs";
import { Database } from "bun:sqlite";
import { BETH_GLOBAL_PERSISTED_CACHE } from "../shared/global";
import { cache } from "./render";

export type CacheOptions = {
  persist?: "memory" | "json";
  revalidate?: number;
  tags?: string[];
  seedImmediately?: {
    arguments?: any[];
  } | boolean;
};

export type GlobalCacheConfig = {
  log: boolean;
  defaultCacheOptions: Required<CacheOptions>;
  returnStaleWhileRevalidate: boolean;
  onRevalidateErrorReturnStale: boolean;
  rethrowOnUnseededError: boolean;
};

export function persistedCache<T extends () => Promise<any>>(
  callBack: T,
  key: string,
  options?: CacheOptions,
): T {
  const filledOptions = {
    ...BETH_GLOBAL_PERSISTED_CACHE.getDefaultOptions(),
    ...options,
  };

  if (globalThis.RENDER_COUNT <= 1) {
    BETH_GLOBAL_PERSISTED_CACHE.seed({
      callBack,
      key,
      options: filledOptions,
    });
  }
  return cache(() =>
    BETH_GLOBAL_PERSISTED_CACHE.getCachedValue(key, filledOptions.persist),
  ) as T;
}

// returns promise that resolves when all data with the tag have completed revalidation
export async function revalidateTag(tag: string): Promise<void> {
  return BETH_GLOBAL_PERSISTED_CACHE.revalidateTag(tag);
}

export function setGlobalPersistCacheConfig(
  config: Partial<GlobalCacheConfig>,
) {
  BETH_GLOBAL_PERSISTED_CACHE.setConfig(config);
}

class CacheNotFound extends Error {
  constructor(
    message: string,
    readonly location: "memory" | "json",
  ) {
    super(message);
  }
}

export class BethPersistCache {
  private callBackMap: Map<
    string,
    {
      callBack: () => Promise<any>;
      tags: string[];
      location: "memory" | "json";
    }
  >;
  private pendingMap: Map<string, Promise<any>>;
  private inMemoryDataCache: Map<string, any>;
  private jsonDataCache: Database;
  private intervals: Set<Timer>;
  private keys: Set<string>;
  private inInitialLoad: Set<string>;
  private config: GlobalCacheConfig;
  private neverSeeded: Set<string>;
  private toReThrow: Map<string, any>;

  constructor() {
    this.callBackMap = new Map();
    this.inMemoryDataCache = new Map();
    this.intervals = new Set();
    this.pendingMap = new Map();
    this.keys = new Set();
    this.inInitialLoad = new Set();
    this.neverSeeded = new Set();
    this.toReThrow = new Map();
    this.config = {
      log: false,
      defaultCacheOptions: {
        persist: "json",
        revalidate: Infinity,
        tags: [],
        seedImmediately: true,
      },
      returnStaleWhileRevalidate: true,
      onRevalidateErrorReturnStale: true,
      rethrowOnUnseededError: false,
    };

    if (existsSync("beth-cache.sqlite")) unlinkSync("beth-cache.sqlite");
    this.jsonDataCache = new Database("beth-cache.sqlite", {
      readwrite: true,
      create: true,
    });
    this.jsonDataCache.run(`
      CREATE TABLE IF NOT EXISTS cache (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);
  }

  public setConfig(config: Partial<GlobalCacheConfig>) {
    this.config.defaultCacheOptions = {
      ...this.config.defaultCacheOptions,
      ...config.defaultCacheOptions,
    };

    this.config.log = config.log ?? this.config.log;
    this.config.returnStaleWhileRevalidate =
      config.returnStaleWhileRevalidate ??
      this.config.returnStaleWhileRevalidate;

    this.config.onRevalidateErrorReturnStale =
      config.onRevalidateErrorReturnStale ??
      this.config.onRevalidateErrorReturnStale;
  }

  private setJsonCache(key: string, value: any) {
    this.jsonDataCache.run(
      `
      INSERT INTO cache (key, value)
      VALUES (?, ?)
      ON CONFLICT (key) DO UPDATE SET value = excluded.value;
    `,
      [key, JSON.stringify(value)],
    );
  }

  private getJsonCache(key: string) {
    const result = this.jsonDataCache
      .query("SELECT value FROM cache WHERE key = ?")
      .get(key) as { value: string } | undefined;
    if (!result) {
      throw new CacheNotFound(
        `No entry found in json cache when one was expected: ${key}`,
        "json",
      );
    }
    return JSON.parse(result.value);
  }

  public seed({
    key,
    callBack,
    options,
  }: {
    callBack: () => Promise<any>;
    key: string;
    options?: CacheOptions;
  }) {
    const {
      persist: location,
      revalidate,
      tags,
    } = {
      ...this.config.defaultCacheOptions,
      ...options,
    };

    if (this.keys.has(key)) {
      throw new Error(
        `Persistant Cache Key already exists: ${key} - these much be unqiue across your entire app`,
      );
    } else {
      this.keys.add(key);
    }

    this.callBackMap.set(key, {
      callBack,
      tags,
      location,
    });

    if (this.config.log) {
      console.log("Initial Callback run to seed cache: ", key);
    }

    const promise = callBack();
    this.inInitialLoad.add(key);
    this.pendingMap.set(key, promise);

    promise
      .then((value) => {
        if (this.config.log) console.log(`Seeding ${location} Cache:`, key);
        if (location === "memory") {
          this.inMemoryDataCache.set(key, value);
        } else if (location === "json") {
          this.setJsonCache(key, value);
        }
        this.inInitialLoad.delete(key);
        this.pendingMap.delete(key);
        if (revalidate > 0) {
          this.setInterval(key, revalidate);
        }
      })
      .catch((e) => {
        this.inInitialLoad.delete(key);
        this.pendingMap.delete(key);
        this.neverSeeded.add(key);
        if (this.config.log) console.log(`Initial Callback Errored:`, key);
      });
  }

  private rerunCallBack(key: string) {
    const pending = this.pendingMap.get(key);
    if (pending) {
      if (this.config.log) console.log("PENDING CACHE HIT:", key);
      return pending;
    }

    if (this.config.log) console.log("Rerunning callback:", key);
    const result = this.callBackMap.get(key);
    if (!result) {
      throw new Error("No callback found for key: " + key);
    }
    const { callBack, location } = result;
    const callBackPromise = callBack();
    this.pendingMap.set(key, callBackPromise);
    callBackPromise
      .then((value) => {
        if (this.config.log)
          console.log(`Callback complete, setting ${location} cache:`, key);
        if (location === "memory") {
          this.inMemoryDataCache.set(key, value);
        } else if (location === "json") {
          this.setJsonCache(key, value);
        }
        this.toReThrow.delete(key);
        this.pendingMap.delete(key);
      })
      .catch((e) => {
        this.pendingMap.delete(key);
        if (this.config.log) console.log(`Rerunning callback Errored:`, key);
        if (this.config.onRevalidateErrorReturnStale) {
          if (this.config.log)
            console.log(`Returning stale data dispite error:`, key);
          return this.getCachedValue(key, location);
        } else {
          if (this.neverSeeded.has(key)) {
            if (this.config.log)
              console.log(
                "Never seeded revalidation errored, remaining never seeded:",
                key,
              );
          } else {
            console.log("Revalidating Errored, storing to rethrow:", key);
            this.toReThrow.set(key, e);
          }
        }
      });
    return callBackPromise;
  }

  private setInterval(key: string, revalidate: number) {
    if (revalidate === Infinity) {
      if (this.config.log) console.log("No revalidate interval for:", key);
      return;
    }
    const interval = setInterval(() => {
      if (this.config.log)
        console.log(`Cache Revalidating (on ${revalidate}s interval):`, key);
      this.rerunCallBack(key);
    }, revalidate * 1000);
    if (this.config.log)
      console.log("Setting Revalidate Interval:", key, revalidate);
    this.intervals.add(interval);
  }

  private getMemoryCache(key: string) {
    const cacheResult = this.inMemoryDataCache.get(key);
    if (cacheResult) {
      return cacheResult;
    } else {
      throw new CacheNotFound(
        `No entry found in memory cache when one was expected: ${key}`,
        "memory",
      );
    }
  }

  public async revalidateTag(tag: string): Promise<void> {
    if (this.config.log) console.log("Revalidating tag:", tag);
    const revalidatePromises: Promise<void>[] = [];
    this.callBackMap.forEach((value, key) => {
      if (value.tags.includes(tag)) {
        const done = this.rerunCallBack(key);
        revalidatePromises.push(done);
      }
    });
    return Promise.allSettled(revalidatePromises).then(() => void 0);
  }

  public getCachedValue(key: string, cache: "memory" | "json") {
    if (this.toReThrow.has(key)) {
      const error = this.toReThrow.get(key);
      this.toReThrow.delete(key);
      if (this.config.log)
        console.log(
          "Rethrowing Error from last revalidation (this not the default and enabled by config):",
          key,
        );
      throw error;
    }
    try {
      // if SWR is turned off, and the revalidation is in progress, return the pending promise
      // even if SWR is on, during the initial load, we have nothing else to return
      const pending = this.pendingMap.get(key);
      const inInitialLoad = this.inInitialLoad.has(key);
      const SWR = this.config.returnStaleWhileRevalidate;
      const neverSeeded = this.neverSeeded.has(key);

      // console.log("DEBUG", { pending, inInitialLoad, SWR });

      if (neverSeeded) {
        if (this.config.log)
          console.log("Never Seeded - Rerunning Callback:", key);
        const result = this.rerunCallBack(key);

        result.then(() => {
          this.neverSeeded.delete(key);
        });
        return result;
      }

      if (pending && inInitialLoad) {
        // if we are in the initial load, we have nothing else to return except the pending promise
        if (this.config.log) console.log("Hit Initial Load Pending:", key);
        return pending;
      } else if (pending && !SWR) {
        // if revalidation is in progress, and SWR is turned off, return the pending promise
        if (this.config.log) console.log("Pending Cache HIT:", key);
        return pending;
      } else {
        // at this point either we are either just at a standard cache hit
        // or a stale hit (if SWR is turned on)
        // so we can return the cached value, and log based off pending (if it exists its a stale hit)
        if (cache === "memory") {
          if (this.config.log) {
            if (pending) {
              console.log(`Memory Cache STALE HIT:`, key);
            } else {
              console.log(`Memory Cache HIT:`, key);
            }
          }
          return this.getMemoryCache(key);
        } else if (cache === "json") {
          if (this.config.log) {
            if (pending) {
              console.log(`JSON Cache STALE HIT:`, key);
            } else {
              console.log(`JSON Cache HIT:`, key);
            }
          }
          return this.getJsonCache(key);
        }
      }
    } catch (e) {
      if (e instanceof CacheNotFound) {
        return this.rerunCallBack(key);
      } else {
        throw e;
      }
    }
  }

  public getDefaultOptions() {
    return this.config.defaultCacheOptions;
  }
}
