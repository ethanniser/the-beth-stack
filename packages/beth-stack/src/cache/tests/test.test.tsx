import "../../shared/global";
import { beforeEach, describe, expect, test } from "bun:test";
import {
  persistedCache,
  revalidateTag,
  setGlobalPersistCacheConfig,
} from "../persist copy";
import "../../jsx/register";
import { renderToString } from "../../jsx/render";

beforeEach(() => {
  setGlobalPersistCacheConfig(null);
});

let cacheKey = 0;
function getCacheKey() {
  return (cacheKey++).toString();
}

describe("basic operations", () => {
  test("throws on duplicate key", () => {
    let getCount = async () => 1;
    const _ = persistedCache(getCount, "cache key");
    let error;
    try {
      persistedCache(getCount, "cache key");
    } catch (e) {
      error = e;
    }
    expect(error).toBe(Error);
  });

  test("dedupes like normal 'cache'", async () => {
    let count = 0;
    let getCount = async () => ++count;
    let cachedGetCount = persistedCache(getCount, getCacheKey());

    const Component = async () => {
      const count = await cachedGetCount();
      return <div>{count}</div>;
    };

    const html = await renderToString(() => (
      <div>
        <Component />
        <Component />
        <Component />
      </div>
    ));

    expect(html).toBe(
      `
      <div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
      `.replace(/\s+/g, ""),
    );
  });

  test("holds value between renders", async () => {
    let count = 0;
    let getCount = async () => ++count;
    let cachedGetCount = persistedCache(getCount, getCacheKey());

    const Component = async () => {
      const count = await cachedGetCount();
      return <div>{count}</div>;
    };

    const html = await renderToString(() => (
      <div>
        <Component />
        <Component />
        <Component />
      </div>
    ));

    expect(html).toBe(
      `
      <div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
      `.replace(/\s+/g, ""),
    );

    const html2 = await renderToString(() => (
      <div>
        <Component />
        <Component />
        <Component />
      </div>
    ));

    expect(html2).toBe(
      `
      <div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
      `.replace(/\s+/g, ""),
    );
  });
});

describe("immediate seeding", () => {
  test("by default the cache function is run immediately", async () => {
    let count = 0;
    let getCount = async () => ++count;
    let cachedGetCount = persistedCache(getCount, getCacheKey());

    expect(count).toBe(1);

    const Component = async () => {
      const count = await cachedGetCount();
      return <div>{count}</div>;
    };

    const html = await renderToString(() => (
      <div>
        <Component />
        <Component />
        <Component />
      </div>
    ));

    expect(html).toBe(
      `
      <div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
      `.replace(/\s+/g, ""),
    );
  });
  test("can be disabled to not", async () => {
    let count = 0;
    let getCount = async () => ++count;
    let cachedGetCount = persistedCache(getCount, getCacheKey(), {
      seedImmediately: false,
    });

    expect(count).toBe(0);

    const Component = async () => {
      const count = await cachedGetCount();
      return <div>{count}</div>;
    };

    const html = await renderToString(() => (
      <div>
        <Component />
        <Component />
        <Component />
      </div>
    ));

    expect(html).toBe(
      `
      <div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
      `.replace(/\s+/g, ""),
    );
  });
});

describe("interval revalidation", () => {
  test("by default interval is off", async () => {
    let count = 0;
    let getCount = async () => ++count;
    let cachedGetCount = persistedCache(getCount, getCacheKey());

    expect(count).toBe(1);

    const Component = async () => {
      const count = await cachedGetCount();
      return <div>{count}</div>;
    };

    const html = await renderToString(() => (
      <div>
        <Component />
        <Component />
        <Component />
      </div>
    ));

    expect(html).toBe(
      `
      <div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
      `.replace(/\s+/g, ""),
    );

    await new Promise((resolve) =>
      setTimeout(async () => {
        const html2 = await renderToString(() => (
          <>
            <Component />
            <Component />
          </>
        ));

        expect(html2).toBe(`<div>1</div><div>1</div>`);

        resolve(void 0);
      }, 1100),
    );
  });
  test("interval reruns callback", async () => {
    let count = 0;
    const getCount = async () => ++count;
    const cachedGetCount = persistedCache(getCount, getCacheKey(), {
      revalidate: 1,
    });

    const Component = async () => {
      const count = await cachedGetCount();
      return <div>{count}</div>;
    };

    const html = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html).toBe(`<div>1</div><div>1</div>`);

    count++;

    // should the be same right away

    const html2 = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html2).toBe(`<div>1</div><div>1</div>`);

    // and the same until a second has passed

    await new Promise((resolve) =>
      setTimeout(async () => {
        const html3 = await renderToString(() => (
          <>
            <Component />
            <Component />
          </>
        ));

        expect(html3).toBe(`<div>1</div><div>1</div>`);

        resolve(void 0);
      }, 500),
    );

    // but after a second it should be different

    await new Promise((resolve) =>
      setTimeout(async () => {
        const html3 = await renderToString(() => (
          <>
            <Component />
            <Component />
          </>
        ));

        expect(html3).toBe(`<div>3</div><div>3</div>`);

        resolve(void 0);
      }, 1100),
    );
  });
  test("interval with Infinity or 0 is ignored", async () => {
    let count = 0;
    const getCount = async () => ++count;

    // Infinity revalidation interval
    const cachedGetCountInfinity = persistedCache(getCount, getCacheKey(), {
      revalidate: Infinity,
    });

    // 0 revalidation interval
    const cachedGetCountZero = persistedCache(getCount, getCacheKey(), {
      revalidate: 0,
    });

    const ComponentInfinity = async () => {
      const count = await cachedGetCountInfinity();
      return <div>{count}</div>;
    };

    const ComponentZero = async () => {
      const count = await cachedGetCountZero();
      return <div>{count}</div>;
    };

    const htmlInfinity = await renderToString(() => <ComponentInfinity />);
    const htmlZero = await renderToString(() => <ComponentZero />);

    expect(htmlInfinity).toBe(`<div>1</div>`);
    expect(htmlZero).toBe(`<div>2</div>`);

    // Increment count and wait for a short period
    count++;

    await new Promise((resolve) => setTimeout(resolve, 1100));

    const htmlInfinityAfterDelay = await renderToString(() => (
      <ComponentInfinity />
    ));
    const htmlZeroAfterDelay = await renderToString(() => <ComponentZero />);

    // Even after the delay, the rendered values should not change as the revalidation interval is Infinity or 0.
    expect(htmlInfinityAfterDelay).toBe(`<div>1</div>`);
    expect(htmlZeroAfterDelay).toBe(`<div>2</div>`);
  });
});

// TODO
describe("manual revalidation", () => {
  test("by default no tags are applied", async () => {});
  test("custom tags can be applied", async () => {});
  test("tags can be revalidated", async () => {});
  test("tags stay independant", async () => {});
  test("two entries with shared tag both revalidate", async () => {});
  test("revalidateTag returns promise that resolves when revalidation is complete", async () => {});
});

describe("pending behavior (swr)", () => {
  test("by default SWR is on", async () => {
    let count = 0;
    let getCount = async () =>
      new Promise((resolve) => setTimeout(() => resolve(++count), 200));
    let cachedGetCount = persistedCache(getCount, getCacheKey(), {
      revalidate: 1,
    });

    expect(count).toBe(1);

    const Component = async () => {
      const count = await cachedGetCount();
      return <div>{count}</div>;
    };

    await new Promise((resolve) => setTimeout(resolve, 1050));

    // should hit during the pending revlidation
    // but still get the stale value

    const html = await renderToString(() => (
      <div>
        <Component />
        <Component />
        <Component />
      </div>
    ));

    expect(html).toBe(
      `
      <div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
      `.replace(/\s+/g, ""),
    );
  });
  test("but can be disabled to return pending value", async () => {
    setGlobalPersistCacheConfig({
      returnStaleWhileRevalidating: false,
    });
    let count = 0;
    let getCount = async () =>
      new Promise((resolve) => setTimeout(() => resolve(++count), 200));
    let cachedGetCount = persistedCache(getCount, getCacheKey(), {
      revalidate: 1,
    });

    expect(count).toBe(1);

    const Component = async () => {
      const count = await cachedGetCount();
      return <div>{count}</div>;
    };

    await new Promise((resolve) => setTimeout(resolve, 1050));

    // should hit during the pending revlidation
    // and should recieve the pending value

    const html = await renderToString(() => (
      <div>
        <Component />
        <Component />
        <Component />
      </div>
    ));

    expect(html).toBe(
      `
      <div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
      </div>
      `.replace(/\s+/g, ""),
    );
  });
  test("the pending promise can reject", async () => {
    setGlobalPersistCacheConfig({
      returnStaleWhileRevalidating: false,
    });
    let count = 0;
    let getCount = async () =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (++count === 2) {
            reject(new Error("error"));
          }
          resolve(count);
        }, 200),
      );
    let cachedGetCount = persistedCache(getCount, getCacheKey(), {
      revalidate: 1,
    });

    expect(count).toBe(1);

    const Component = async () => {
      const count = await cachedGetCount();
      return <div>{count}</div>;
    };

    await new Promise((resolve) => setTimeout(resolve, 1050));

    // should hit during the pending revlidation
    // and should recieve the pending value (which rejects)

    const html = renderToString(() => (
      <div>
        <Component />
        <Component />
        <Component />
      </div>
    ));

    expect(html).rejects.toBe(Error);
  });
});

describe("error in immediate seed", () => {
  test("by default it will remain unseeded and be rerun", async () => {
    let count = 0;
    let getCount = async () => {
      if (count++ === 1) {
        throw new Error("error");
      }
      return count;
    };
    let cachedGetCount = persistedCache(getCount, getCacheKey());

    expect(count).toBe(1);

    const Component = async () => {
      const count = await cachedGetCount();
      return <div>{count}</div>;
    };

    const html = await renderToString(() => (
      <div>
        <Component />
        <Component />
        <Component />
      </div>
    ));

    expect(html).toBe(
      `
      <div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
      </div>
      `.replace(/\s+/g, ""),
    );
  });
  test("can be disabled to rethrow", async () => {
    setGlobalPersistCacheConfig({
      errorHandling: {
        duringImmediateSeed: "rethrow",
      },
    });

    let count = 0;
    let getCount = async () => {
      if (count++ === 1) {
        throw new Error("error");
      }
      return count;
    };
    let cachedGetCount = persistedCache(getCount, getCacheKey(), {});

    expect(count).toBe(1);

    const Component = async () => {
      const count = await cachedGetCount();
      return <div>{count}</div>;
    };

    const html = () =>
      renderToString(() => (
        <div>
          <Component />
          <Component />
          <Component />
        </div>
      ));

    expect(html).toThrow();

    // after rethrowing the error, the function should be rerun

    const html2 = await renderToString(() => (
      <div>
        <Component />
        <Component />
        <Component />
      </div>
    ));

    expect(html2).toBe(
      `
      <div>
        <div>2</div>
        <div>2</div>
        <div>2</div>
      </div>
      `.replace(/\s+/g, ""),
    );
  });
});

// TODO
describe("error in unseeded revalidation", () => {
  test("by default it will remain unseeded and be rerun", async () => {});
  test("can be disabled to rethrow", async () => {});
});

// TODO
describe("error in seeded revalidation", () => {
  test("by default it will return last valid data", async () => {});
  test("can be disabled to rethrow", async () => {});
  test("can be disabled to rerun", async () => {});
});

// TODO
describe("argumentitive functions", () => {
  test("works with functions with arguments", async () => {});
  test("different sets of arguments are cached seperately", async () => {});
  test("different sets of arguments are compared with deepStrictEqual", async () => {});
  test("revalidating reruns with all stored sets of arguments", async () => {});
  test("can be seeded immediately with arguments", async () => {});
  test("can be seeded immediately with multiple sets of arguments", async () => {});
});
