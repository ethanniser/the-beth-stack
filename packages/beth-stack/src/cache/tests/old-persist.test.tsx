import "../../shared/global";
import { describe, expect, test } from "bun:test";
import {
  persistedCache,
  revalidateTag,
  setGlobalPersistCacheConfig,
} from "../old-persist";
import "../../jsx/register";
import { renderToString } from "../../jsx/render";

setGlobalPersistCacheConfig({
  // log: true,
});

test("static json cache", async () => {
  let count = 0;
  const getCount = async () => ++count;
  const cachedGetCount = persistedCache(getCount, "getCount1");

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

  // This should result in no 'cache hit' log, because the render cache is never reset from the previous render
  const html2 = await (
    <>
      <Component />
      <Component />
    </>
  );

  expect(html2).toBe(`<p>number: 1</p><p>number: 1</p>`);

  // even in a new render we get the same results
  const Test = () => <Component />;

  const html3 = await renderToString(() => (
    <>
      <Test />
      <Component />
    </>
  ));

  expect(html3).toBe(`<p>number: 1</p><p>number: 1</p>`);
});

test("static memory cache", async () => {
  let count = 0;
  const getCount = async () => ++count;
  const cachedGetCount = persistedCache(getCount, "getCount2", {
    persist: "memory",
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

  // even in a new render we get the same results
  const Test = () => <Component />;

  const html3 = await renderToString(() => (
    <>
      <Test />
      <Component />
    </>
  ));

  expect(html3).toBe(`<p>number: 1</p><p>number: 1</p>`);
});

test("json cache revalidate interval", async () => {
  let count = 0;
  const getCount = async () => ++count;
  const cachedGetCount = persistedCache(getCount, "getCount3", {
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

  count++;

  // should the be same right away

  const html2 = await renderToString(() => (
    <>
      <Component />
      <Component />
    </>
  ));

  expect(html2).toBe(`<p>number: 1</p><p>number: 1</p>`);

  // and the same until a second has passed

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

      expect(html3).toBe(`<p>number: 3</p><p>number: 3</p>`);

      resolve(void 0);
    }, 1100),
  );
});

test("memory cache revalidate interval", async () => {
  let count = 0;
  const getCount = async () => ++count;
  const cachedGetCount = persistedCache(getCount, "getCount4", {
    persist: "memory",
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

  count++;

  // should the be same right away

  const html2 = await renderToString(() => (
    <>
      <Component />
      <Component />
    </>
  ));

  expect(html2).toBe(`<p>number: 1</p><p>number: 1</p>`);

  // and the same until a second has passed

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

      expect(html3).toBe(`<p>number: 3</p><p>number: 3</p>`);

      resolve(void 0);
    }, 1100),
  );
});

test("json cache revalidate tag", async () => {
  let count = 0;
  const getCount = async () => ++count;
  const cachedGetCount = persistedCache(getCount, "getCount5", {
    tags: ["tag1"],
  });

  const Component = async () => {
    const data = await cachedGetCount();
    return <p>number: {data}</p>;
  };

  // initial cache miss
  const html = await renderToString(() => (
    <>
      <Component />
      <Component />
    </>
  ));

  expect(html).toBe(`<p>number: 1</p><p>number: 1</p>`);

  count++;

  // should the be same right away

  // hit cache
  const html2 = await renderToString(() => (
    <>
      <Component />
      <Component />
    </>
  ));

  expect(html2).toBe(`<p>number: 1</p><p>number: 1</p>`);

  // by default swr is off, so must wait for revalidate to complete
  await revalidateTag("tag1");

  // now should be different

  const html3 = await renderToString(() => (
    <>
      <Component />
      <Component />
    </>
  ));

  expect(html3).toBe(`<p>number: 3</p><p>number: 3</p>`);
});

test("memory cache revalidate tag", async () => {
  let count = 0;
  const getCount = async () => ++count;
  const cachedGetCount = persistedCache(getCount, "getCount6", {
    tags: ["tag1"],
    persist: "memory",
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

  count++;

  // should the be same right away

  const html2 = await renderToString(() => (
    <>
      <Component />
      <Component />
    </>
  ));

  expect(html2).toBe(`<p>number: 1</p><p>number: 1</p>`);

  await revalidateTag("tag1");

  // now should be different

  const html3 = await renderToString(() => (
    <>
      <Component />
      <Component />
    </>
  ));

  expect(html3).toBe(`<p>number: 3</p><p>number: 3</p>`);
});

test("complex object storage to memory", async () => {
  const getData = async () => ({
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: [4, 5, 6],
    },
  });

  const cachedGetData = persistedCache(getData, "getData1", {
    persist: "memory",
  });

  const data = await cachedGetData();

  expect(data).toStrictEqual({
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: [4, 5, 6],
    },
  });
});
test("complex object storage to json", async () => {
  const getData = async () => ({
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: [4, 5, 6],
    },
  });

  const cachedGetData = persistedCache(getData, "getData2", {
    persist: "json",
  });

  const data = await cachedGetData();

  expect(data).toStrictEqual({
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: [4, 5, 6],
    },
  });
});

describe("errors", () => {
  setGlobalPersistCacheConfig({
    log: true,
  });

  test("throw in inital callback", async () => {
    // should set to neverSeeded
    // will rerun the callback on the next call
    // if throw again, still neverSeeded and will rerun
    let count = 0;
    const getCount = async () => {
      count++;
      if (count < 3) {
        throw count.toString();
      }
      return count;
    };
    const cachedGetCount = persistedCache(getCount, "throw1");

    const Component = async () => {
      const data = await cachedGetCount();
      return <p>number: {data}</p>;
    };

    const html = () =>
      renderToString(() => (
        <>
          <Component />
          <Component />
        </>
      ));

    expect(html).toThrow("1");

    const html2 = () =>
      renderToString(() => (
        <>
          <Component />
          <Component />
        </>
      ));

    expect(html2).toThrow("2");

    const html3 = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html3).toBe(`<p>number: 3</p><p>number: 3</p>`);
  });

  test("throw in revalidate was seeded (on reval error return stale: true)", async () => {
    setGlobalPersistCacheConfig({
      onRevalidateErrorReturnStale: true,
    });
    let count = 0;
    const getCount = async () => {
      count++;
      if (count === 2) {
        throw count.toString();
      }
      return count;
    };
    const cachedGetCount = persistedCache(getCount, "throw2", {
      tags: ["tag1"],
    });

    // seeds ok

    const Component = async () => {
      const data = await cachedGetCount();
      return <p>number: {data}</p>;
    };

    // hit cache

    const html = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html).toBe("<p>number: 1</p><p>number: 1</p>");

    await revalidateTag("tag1");
    // ^^ THIS SHOULD LEAD TO THE CALLBACK RUNNING AGAIN AND THROWING
    // but the old data is returned

    const html2 = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html2).toBe("<p>number: 1</p><p>number: 1</p>");

    await revalidateTag("tag1");

    const html3 = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html3).toBe(`<p>number: 3</p><p>number: 3</p>`);
  });
  test("throw in revalidate was seeded (on reval error return stale: false)", async () => {
    setGlobalPersistCacheConfig({
      onRevalidateErrorReturnStale: false,
    });

    let count = 0;
    const getCount = async () => {
      count++;
      console.log("getCount", count);
      if (count === 2) {
        throw count.toString();
      }
      return count;
    };
    const cachedGetCount = persistedCache(getCount, "throw3", {
      tags: ["tag9"],
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

    expect(html).toBe("<p>number: 1</p><p>number: 1</p>");

    await revalidateTag("tag9");
    // ^^ THIS SHOULD LEAD TO THE CALLBACK RUNNING AGAIN AND THROWING
    // but bc of config option, the error is caught and stored
    // to be rethrown on the next call

    const html2 = () =>
      renderToString(() => (
        <>
          <Component />
          <Component />
        </>
      ));

    expect(html2).toThrow("2");

    await revalidateTag("tag9");

    const html3 = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html3).toBe(`<p>number: 3</p><p>number: 3</p>`);
  });
  test("throw in revalidate was never seeded (on reval error return stale: false) 2", async () => {
    setGlobalPersistCacheConfig({
      onRevalidateErrorReturnStale: false,
    });

    let count = 0;
    const getCount = async () => {
      count++;
      console.log("getCount", count);
      if (count !== 3) {
        throw count.toString();
      }
      return count;
    };
    // throws so neverSeeded
    const cachedGetCount = persistedCache(getCount, "throw4", {
      tags: ["tag2"],
    });

    const Component = async () => {
      const data = await cachedGetCount();
      return <p>number: {data}</p>;
    };

    // also throws so still neverSeeded
    await revalidateTag("tag2");

    await revalidateTag("tag2");
    // this should fill the cache and clear the stored error

    const html3 = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html3).toBe(`<p>number: 3</p><p>number: 3</p>`);
  });
  test("throw in revalidate was never seeded (on reval error return stale: true) zz", async () => {
    setGlobalPersistCacheConfig({
      onRevalidateErrorReturnStale: true,
    });
    let count = 0;
    const getCount = async () => {
      count++;
      console.log("getCount", count);
      if (count !== 4) {
        throw count.toString();
      }
      return count;
    };

    console.log("first time");

    // runs first time, throws so neverSeeded
    const cachedGetCount = persistedCache(getCount, "throw5", {
      tags: ["tag4"],
    });

    const Component = async () => {
      const data = await cachedGetCount();
      return <p>number: {data}</p>;
    };
    // console.log("---- second time");
    // // runs second time, throws so neverSeeded
    const html = renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    // expect(html).rejects.toBe("1");

    // console.log("----- third time");
    // runs third time, throws so neverSeeded
    // await revalidateTag("tag4");
    // ^^ THIS SHOULD LEAD TO THE CALLBACK RUNNING AGAIN AND THROWING
    // which should keep it 'neverSeeded'

    // runs fourth time, WORKS
    console.log("forth time");
    // const html2 = await renderToString(() => (
    //   <>
    //     <Component />
    //     <Component />
    //   </>
    // ));

    // expect(html2).toBe(`<p>number: 4</p><p>number: 4</p>`);
  });
  // test("throw in revalidate was never seeded (on reval error return stale: false)", async () => {
  //   setGlobalPersistCacheConfig({
  //     onRevalidateErrorReturnStale: false,
  //   });
  //   let count = 0;
  //   const getCount = async () => {
  //     count++;
  //     console.log("getCount", count);
  //     if (count !== 4) {
  //       throw count.toString();
  //     }
  //     return count;
  //   };
  //   // runs first time, throws so neverSeeded
  //   const cachedGetCount = persistedCache(getCount, "throw6", {
  //     tags: ["tag5"],
  //   });

  //   const Component = async () => {
  //     const data = await cachedGetCount();
  //     return <p>number: {data}</p>;
  //   };

  //   // runs second time, throws so neverSeeded
  //   const html = renderToString(() => (
  //     <>
  //       <Component />
  //       <Component />
  //     </>
  //   ));

  //   expect(html).rejects.toBe("2");

  //   console.log("test");

  //   // runs third time, throws so neverSeeded
  //   await revalidateTag("tag5");
  //   // ^^ THIS SHOULD LEAD TO THE CALLBACK RUNNING AGAIN AND THROWING
  //   // which should keep it 'neverSeeded'
  //   console.log("test2");

  //   // runs fourth time, WORKS
  //   const html2 = await renderToString(() => (
  //     <>
  //       <Component />
  //       <Component />
  //     </>
  //   ));

  //   console.log("test3");

  //   expect(html2).toBe(`<p>number: 4</p><p>number: 4</p>`);
  // });
});
