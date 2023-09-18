import { describe, expect, test } from "bun:test";
import { persistedCache, revalidateTag, setGlobalPersistCacheConfig } from "..";
import { renderToString } from "../../jsx";
import "../../jsx/register";

describe("SWR OFF (not default)", () => {
  const setup = () =>
    setGlobalPersistCacheConfig({
      returnStaleWhileRevalidate: false,
    });
  test("request during interval revalidation", async () => {
    setup();
    let count = 0;
    const getCount = async () =>
      new Promise((resolve) => setTimeout(() => resolve(++count), 100));
    const cachedGetCount = persistedCache(getCount, "getCount7", {
      revalidate: 1,
    });

    const Component = async () => {
      const data = await cachedGetCount();
      return <p>number: {data}</p>;
    };

    const html = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html).toBe(`<p>number: 1</p><p>number: 1</p>`);

    // cache request goes off during revalidation
    // should result in 'pending cache hit' log + updated data

    await new Promise((resolve) =>
      setTimeout(async () => {
        const html3 = await renderToString(() => (
          <>
            <Component />
            <Component />
          </>
        ));

        expect(html3).toBe(`<p>number: 2</p><p>number: 2</p>`);

        resolve(void 0);
      }, 1050)
    );
  });

  test("request during tag revalidation", async () => {
    setup();
    let count = 0;
    const getCount = async () =>
      new Promise((resolve) => setTimeout(() => resolve(++count), 100));
    const cachedGetCount = persistedCache(getCount, "getCount8", {
      tags: ["tag1"],
    });

    const Component = async () => {
      const data = await cachedGetCount();
      return <p>number: {data}</p>;
    };

    const html = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html).toBe(`<p>number: 1</p><p>number: 1</p>`);

    setTimeout(() => {
      count++;
      revalidateTag("tag1");
    }, 1000);

    // cache request goes off during revalidation
    // should result in 'pending cache hit' log + updated data

    await new Promise((resolve) =>
      setTimeout(async () => {
        const html3 = await renderToString(() => (
          <>
            <Component />
            <Component />
          </>
        ));

        expect(html3).toBe(`<p>number: 3</p><p>number: 3</p>`);

        resolve(void 0);
      }, 1010)
    );
  });

  test("interval during tag revalidation", async () => {
    setup();
    let count = 0;
    const getCount = async () =>
      new Promise((resolve) => setTimeout(() => resolve(++count), 300));
    const cachedGetCount = persistedCache(getCount, "getCount9", {
      tags: ["tag1"],
      revalidate: 1,
    });

    const Component = async () => {
      const data = await cachedGetCount();
      return <p>number: {data}</p>;
    };

    const html = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html).toBe(`<p>number: 1</p><p>number: 1</p>`);

    setTimeout(() => {
      count++;
      revalidateTag("tag1");
    }, 900);

    // should see pending cache hit for interval revalidation

    // cache request goes off during revalidation
    // should result in 2nd 'pending cache hit' log + updated data

    await new Promise((resolve) =>
      setTimeout(async () => {
        const html3 = await renderToString(() => (
          <>
            <Component />
            <Component />
          </>
        ));

        expect(html3).toBe(`<p>number: 3</p><p>number: 3</p>`);

        resolve(void 0);
      }, 1100)
    );
  });

  test("interval during tag revalidation", async () => {
    setup();
    let count = 0;
    const getCount = async () =>
      new Promise((resolve) => setTimeout(() => resolve(++count), 300));
    const cachedGetCount = persistedCache(getCount, "getCount10", {
      tags: ["tag1"],
      revalidate: 1,
    });

    const Component = async () => {
      const data = await cachedGetCount();
      return <p>number: {data}</p>;
    };

    const html = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html).toBe(`<p>number: 1</p><p>number: 1</p>`);

    setTimeout(() => {
      count++;
      revalidateTag("tag1");
    }, 1100);

    // should see pending cache hit for tag revalidation

    // cache request goes off during revalidation
    // should result in 2nd 'pending cache hit' log + updated data

    await new Promise((resolve) =>
      setTimeout(async () => {
        const html3 = await renderToString(() => (
          <>
            <Component />
            <Component />
          </>
        ));

        expect(html3).toBe(`<p>number: 3</p><p>number: 3</p>`);

        resolve(void 0);
      }, 1150)
    );
  });
});

describe("SWR ON (default)", () => {
  const setup = () =>
    setGlobalPersistCacheConfig({
      returnStaleWhileRevalidate: true,
    });

  test("request during interval revalidation", async () => {
    setup();
    let count = 0;
    const getCount = async () =>
      new Promise((resolve) => setTimeout(() => resolve(++count), 100));
    const cachedGetCount = persistedCache(getCount, "1getCount7", {
      revalidate: 1,
    });

    const Component = async () => {
      const data = await cachedGetCount();
      return <p>number: {data}</p>;
    };

    const html = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html).toBe(`<p>number: 1</p><p>number: 1</p>`);

    // cache request goes off during revalidation
    // should result in 'STALE cache hit' log + old data

    await new Promise((resolve) =>
      setTimeout(async () => {
        const html3 = await renderToString(() => (
          <>
            <Component />
            <Component />
          </>
        ));

        expect(html3).toBe(`<p>number: 1</p><p>number: 1</p>`);

        resolve(void 0);
      }, 1010)
    );
  });

  test("request during tag revalidation", async () => {
    setup();
    let count = 0;
    const getCount = async () =>
      new Promise((resolve) => setTimeout(() => resolve(++count), 100));
    const cachedGetCount = persistedCache(getCount, "1getCount8", {
      tags: ["tag1"],
    });

    const Component = async () => {
      const data = await cachedGetCount();
      return <p>number: {data}</p>;
    };

    const html = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html).toBe(`<p>number: 1</p><p>number: 1</p>`);

    setTimeout(() => {
      count++;
      revalidateTag("tag1");
    }, 1000);

    // cache request goes off during revalidation
    // should result in 'STALE cache hit' log + old data

    await new Promise((resolve) =>
      setTimeout(async () => {
        const html3 = await renderToString(() => (
          <>
            <Component />
            <Component />
          </>
        ));

        expect(html3).toBe(`<p>number: 1</p><p>number: 1</p>`);

        resolve(void 0);
      }, 1010)
    );
  });

  test("interval during tag revalidation", async () => {
    setup();
    let count = 0;
    const getCount = async () =>
      new Promise((resolve) => setTimeout(() => resolve(++count), 300));
    const cachedGetCount = persistedCache(getCount, "1getCount9", {
      tags: ["tag1"],
      revalidate: 1,
    });

    const Component = async () => {
      const data = await cachedGetCount();
      return <p>number: {data}</p>;
    };

    const html = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html).toBe(`<p>number: 1</p><p>number: 1</p>`);

    setTimeout(() => {
      count++;
      revalidateTag("tag1");
    }, 900);

    // should see pending cache hit for interval revalidation

    // cache request goes off during revalidation
    // should result in 'STALE cache hit' log + old data

    await new Promise((resolve) =>
      setTimeout(async () => {
        const html3 = await renderToString(() => (
          <>
            <Component />
            <Component />
          </>
        ));

        expect(html3).toBe(`<p>number: 1</p><p>number: 1</p>`);

        resolve(void 0);
      }, 1100)
    );
  });

  test("interval during tag revalidation", async () => {
    setup();
    let count = 0;
    const getCount = async () =>
      new Promise((resolve) => setTimeout(() => resolve(++count), 300));
    const cachedGetCount = persistedCache(getCount, "1getCount10", {
      tags: ["tag1"],
      revalidate: 1,
    });

    const Component = async () => {
      const data = await cachedGetCount();
      return <p>number: {data}</p>;
    };

    const html = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html).toBe(`<p>number: 1</p><p>number: 1</p>`);

    setTimeout(() => {
      count++;
      revalidateTag("tag1");
    }, 1100);

    // should see pending cache hit for tag revalidation

    // cache request goes off during revalidation
    // should result in 'STALE cache hit' log + old data

    await new Promise((resolve) =>
      setTimeout(async () => {
        const html3 = await renderToString(() => (
          <>
            <Component />
            <Component />
          </>
        ));

        expect(html3).toBe(`<p>number: 1</p><p>number: 1</p>`);

        resolve(void 0);
      }, 1150)
    );
  });
});
