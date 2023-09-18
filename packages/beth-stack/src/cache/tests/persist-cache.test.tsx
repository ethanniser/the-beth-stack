import { test, expect } from "bun:test";
import {
  persistedCache,
  revalidateTag,
  setGlobalPersistCacheConfig,
} from "../persist";
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
    }, 500)
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
    }, 1100)
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
    }, 500)
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
    }, 1100)
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
