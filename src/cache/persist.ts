import { cache } from "./cache";
import { Database } from "bun:sqlite";

class BethPersistCache {
  private callBackMap: Map<
    string,
    {
      callBack: () => Promise<any>;
      tags: string[];
      cache: "memory" | "json";
    }
  >;
  private pendingMap: Map<string, Promise<any>>;
  private inMemoryDataCache: Map<string, any>;
  private jsonDataCache: Database;
  private intervals: Set<Timer>;
  private keys: Set<string>;
  private config: {
    log: boolean;
    defaultCacheOptions: {
      persist: "json" | "memory";
      revalidate: number;
      tags: string[];
    };
    returnStaleWhileRevalidate: boolean;
  };

  constructor() {
    this.callBackMap = new Map();
    this.inMemoryDataCache = new Map();
    this.jsonDataCache = new Database("beth-cache.sqlite");
    this.intervals = new Set();
    this.pendingMap = new Map();
    this.keys = new Set();
    this.config = {
      log: false,
      defaultCacheOptions: {
        persist: "json",
        revalidate: Infinity,
        tags: [],
      },
      returnStaleWhileRevalidate: true,
    };

    this.jsonDataCache.run(`
      DROP TABLE IF EXISTS cache;
    `);

    this.jsonDataCache.run(`
      CREATE TABLE cache (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);
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
    if (this.config.log) console.log("JSON Cache HIT:", key);
    const result = this.jsonDataCache
      .query("SELECT value FROM cache WHERE key = ?")
      .get(key) as { value: string } | undefined;
    if (!result) throw new Error("JSON Cache Miss");
    return JSON.parse(result.value);
  }

  public seed({
    key,
    tags,
    revalidate,
    callBack,
    cache,
  }: {
    cache: "memory" | "json";
    callBack: () => Promise<any>;
    key: string;
    tags: string[];
    revalidate: number;
  }) {
    if (this.keys.has(key)) {
      throw new Error(
        `Persistant Cache Key already exists: ${key} - these much be unqiue across your entire app`
      );
    } else {
      this.keys.add(key);
    }

    if (this.config.log) console.log("Cache MISS: ", key);

    const promise = callBack();
    this.pendingMap.set(key, promise);

    promise.then((value) => {
      this.pendingMap.delete(key);
      if (this.config.log) console.log(`Seeding ${cache} Cache:`, key);
      if (cache === "memory") {
        this.inMemoryDataCache.set(key, value);
      } else if (cache === "json") {
        this.setJsonCache(key, value);
      }
      this.callBackMap.set(key, {
        callBack,
        tags,
        cache,
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
    const { callBack, tags, cache } = result;
    const callBackPromise = callBack();
    this.pendingMap.set(key, callBackPromise);
    callBackPromise.then((value) => {
      if (cache === "memory") {
        this.inMemoryDataCache.set(key, value);
      } else if (cache === "json") {
        this.setJsonCache(key, value);
      }
      this.callBackMap.set(key, {
        callBack,
        tags,
        cache,
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
      if (this.config.log) console.log("Memory Cache HIT:", key);
      return cacheResult;
    } else {
      throw new Error("Memory Cache Miss");
    }
  }

  public revalidateTag(tag: string) {
    if (this.config.log) console.log("Revalidating tag:", tag);
    this.callBackMap.forEach((value, key) => {
      if (value.tags.includes(tag)) {
        this.rerunCallBack(key);
      }
    });
  }

  public getCachedValue(key: string, cache: "memory" | "json") {
    try {
      const pending = this.pendingMap.get(key);
      if (pending) {
        if (this.config.log) console.log("PENDING CACHE HIT:", key);
        return pending;
      }

      if (cache === "memory") {
        return this.getMemoryCache(key);
      } else if (cache === "json") {
        return this.getJsonCache(key);
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
}

const GLOBAL_CACHE = new BethPersistCache();

type CacheOptions = {
  persist?: "memory" | "json";
  revalidate?: number;
  tags?: string[];
};

export function persistedCache<T extends () => Promise<any>>(
  callBack: T,
  key: string,
  options?: CacheOptions
): T {
  const persist = options?.persist ?? "json";
  const revalidate = options?.revalidate ?? Infinity;
  const tags = options?.tags ?? [];

  GLOBAL_CACHE.seed({
    callBack,
    key,
    tags,
    revalidate,
    cache: persist,
  });
  return cache(() => GLOBAL_CACHE.getCachedValue(key, persist)) as T;
}

export function revalidateTag(tag: string) {
  GLOBAL_CACHE.revalidateTag(tag);
}
