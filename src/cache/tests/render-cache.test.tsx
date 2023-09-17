import { describe, expect, test } from "bun:test";
import Html, { PropsWithChildren } from "../../jsx";

import { renderToString } from "../../jsx/render";
import { cache } from "../cache";

describe("async components", () => {
  test("basic", async () => {
    const Component = async () => <p>hi</p>;

    const html = await (<Component />);

    expect(html).toBe(`<p>hi</p>`);
  });

  test("with props", async () => {
    const Component = async ({ name }: { name: string }) => <p>hi {name}</p>;

    const html = await (<Component name="world" />);

    expect(html).toBe(`<p>hi world</p>`);
  });

  test("with text children", async () => {
    const Component = async ({ children }: { children: string }) => (
      <p>hi {children}</p>
    );

    const html = await (<Component>world</Component>);

    expect(html).toBe(`<p>hi world</p>`);
  });

  test("with async children", async () => {
    const Component = async ({ children }: PropsWithChildren) => (
      <div>{children}</div>
    );

    const Child = async () => <p>test</p>;

    const html = await (
      <Component>
        <Child />
        <Child />
      </Component>
    );

    expect(html).toBe(`<div><p>test</p><p>test</p></div>`);
  });

  test("data fetching", async () => {
    let data = 0;
    const getMockData = async () => ++data;

    const Component = async () => {
      const data = await getMockData();
      return <p>number: {data}</p>;
    };

    const html = await (<Component />);

    expect(html).toBe(`<p>number: 1</p>`);
  });

  test("data fetching in multiple components", async () => {
    let data = 0;
    const getMockData = async () => ++data;

    const Component = async () => {
      const data = await getMockData();
      return <p>number: {data}</p>;
    };

    const html = await (
      <>
        <Component />
        <Component />
      </>
    );

    expect(html).toBe(`<p>number: 1</p><p>number: 2</p>`);
  });

  test("cache dedupes data fetching", async () => {
    let data = 0;
    const getMockData = async () => ++data;
    const cachedGetMockData = cache(getMockData);

    const Component = async () => {
      const data = await cachedGetMockData();
      return <p>number: {data}</p>;
    };

    const html = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html).toBe(`<p>number: 1</p><p>number: 1</p>`);
  });

  test("cache resets each render", async () => {
    let data = 0;
    const getMockData = async () => ++data;
    const cachedGetMockData = cache(getMockData);

    const Component = async () => {
      const data = await cachedGetMockData();
      return <p>number: {data}</p>;
    };

    const html = await renderToString(() => (
      <>
        <Component />
        <Component />
      </>
    ));

    expect(html).toBe(`<p>number: 1</p><p>number: 1</p>`);

    data++;

    // if we don't reset cache with 'renderToString' then we get the same results

    const html2 = await (
      <>
        <Component />
        <Component />
      </>
    );

    expect(html2).toBe(`<p>number: 1</p><p>number: 1</p>`);

    // lazy evaluation means we get the new data (because it doesnt go off until inside renderToString)
    const Test = () => <Component />;

    const html3 = await renderToString(() => (
      <>
        <Test />
        <Component />
      </>
    ));

    expect(html3).toBe(`<p>number: 3</p><p>number: 3</p>`);
  });
});
