import { cache } from "./render";
import { Database } from "bun:sqlite";
import { unlinkSync } from "node:fs";
import { BETH_GLOBAL_PERSISTED_CACHE } from "../shared/global";

export type CacheOptions = {
  persist?: "memory" | "json";
  revalidate?: number;
  tags?: string[];
};

export type GlobalCacheConfig = {
  log: boolean;
  defaultCacheOptions: Required<CacheOptions>;
  returnStaleWhileRevalidate: boolean;
  dev: boolean;
};

export function persistedCache<T extends () => Promise<any>>(
  callBack: T,
  key: string,
  options?: CacheOptions
): T {
  const filledOptions = {
    ...BETH_GLOBAL_PERSISTED_CACHE.getDefaultOptions(),
    ...options,
  };

  BETH_GLOBAL_PERSISTED_CACHE.seed({
    callBack,
    key,
    options: filledOptions,
  });
  return cache(() =>
    BETH_GLOBAL_PERSISTED_CACHE.getCachedValue(key, filledOptions.persist)
  ) as T;
}

// returns promise that resolves when all data with the tag have completed revalidation
export async function revalidateTag(tag: string): Promise<void> {
  return BETH_GLOBAL_PERSISTED_CACHE.revalidateTag(tag);
}

export function setGlobalPersistCacheConfig(
  config: Partial<GlobalCacheConfig>
) {
  BETH_GLOBAL_PERSISTED_CACHE.setConfig(config);
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

  constructor() {
    this.callBackMap = new Map();
    this.inMemoryDataCache = new Map();
    this.intervals = new Set();
    this.pendingMap = new Map();
    this.keys = new Set();
    this.inInitialLoad = new Set();
    this.config = {
      log: false,
      defaultCacheOptions: {
        persist: "json",
        revalidate: Infinity,
        tags: [],
      },
      returnStaleWhileRevalidate: true,
      dev: false,
    };

    unlinkSync("beth-cache.sqlite");
    this.jsonDataCache = new Database("beth-cache.sqlite");
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
  }

  private setJsonCache(key: string, value: any) {
    this.jsonDataCache.run(
      `
      INSERT INTO cache (key, value)
      VALUES (?, ?)
      ON CONFLICT (key) DO UPDATE SET value = excluded.value;
    `,
      [key, JSON.stringify(value)]
    );
  }

  private getJsonCache(key: string) {
    const result = this.jsonDataCache
      .query("SELECT value FROM cache WHERE key = ?")
      .get(key) as { value: string } | undefined;
    if (!result) {
      if (this.config.log)
        console.log("No entry found in json cache when one was expected:", key);
      throw new Error("JSON Cache Miss");
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
        `Persistant Cache Key already exists: ${key} - these much be unqiue across your entire app`
      );
    } else {
      this.keys.add(key);
    }

    if (this.config.log) {
      console.log("Initial Callback run to seed cache: ", key);
    }

    const promise = callBack();
    this.inInitialLoad.add(key);
    this.pendingMap.set(key, promise);

    promise.then((value) => {
      if (this.config.log) console.log(`Seeding ${location} Cache:`, key);
      if (location === "memory") {
        this.inMemoryDataCache.set(key, value);
      } else if (location === "json") {
        this.setJsonCache(key, value);
      }
      this.inInitialLoad.delete(key);
      this.pendingMap.delete(key);
      this.callBackMap.set(key, {
        callBack,
        tags,
        location,
      });
      if (revalidate > 0) {
        this.setInterval(key, revalidate);
      }
    });
  }

  private rerunCallBack(key: string) {
    const pending = this.pendingMap.get(key);
    if (pending) {
      if (this.config.log) console.log("PENDING CACHE HIT:", key);
      return pending;
    }

    if (this.config.log) console.log("rerunning callback:", key);
    const result = this.callBackMap.get(key);
    if (!result) {
      throw new Error("No callback found for key: " + key);
    }
    const { callBack, tags, location } = result;
    const callBackPromise = callBack();
    this.pendingMap.set(key, callBackPromise);
    callBackPromise.then((value) => {
      if (this.config.log)
        console.log(`Callback complete, setting ${location} cache:`, key);
      if (location === "memory") {
        this.inMemoryDataCache.set(key, value);
      } else if (location === "json") {
        this.setJsonCache(key, value);
      }
      this.callBackMap.set(key, {
        callBack,
        tags,
        location,
      });
      this.pendingMap.delete(key);
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
      if (this.config.log)
        console.log(
          "No entry found in memory cache when one was expected:",
          key
        );
      throw new Error("Memory Cache Miss");
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
    return Promise.all(revalidatePromises).then(() => void 0);
  }

  public getCachedValue(key: string, cache: "memory" | "json") {
    try {
      // if SWR is turned off, and the revalidation is in progress, return the pending promise
      // even if SWR is on, during the initial load, we have nothing else to return
      const pending = this.pendingMap.get(key);
      const inInitialLoad = this.inInitialLoad.has(key);
      const SWR = this.config.returnStaleWhileRevalidate;

      // console.log("DEBUG", { pending, inInitialLoad, SWR });

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
      if (e instanceof Error) {
        if (e.message === "Memory Cache Miss") {
          return this.rerunCallBack(key);
        } else if (e.message === "JSON Cache Miss") {
          return this.rerunCallBack(key);
        } else {
          throw e;
        }
      } else {
        throw e;
      }
    }
  }

  public getDefaultOptions() {
    return this.config.defaultCacheOptions;
  }
}
