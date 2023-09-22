import { describe, expect, test } from "bun:test";
import Html, { PropsWithChildren } from "../../jsx";
import { renderToString } from "../../jsx/render";
import { cache } from "../render";

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

    // render doesnt resets after finished

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

test("if a function throws, the same error is rethrown", async () => {
  let first = true;
  const throws = cache(() => {
    if (first) {
      first = false;
      throw new Error("test");
    }
  });

  const Component = async () => {
    throws();
    return <p>hi</p>;
  };

  const html1 = () => <Component />;
  expect(html1).toThrow();
  const html2 = () => <Component />;
  expect(html2).toThrow();
  const html3 = () => <Component />;
  expect(html3).toThrow();
});

test("if a function throws, the same error is rethrown", async () => {
  let count = 0;
  const throws = cache(() => {
    count++;
    throw new Error(count.toString());
  });

  const Component = async () => {
    throws();
    return <p>hi</p>;
  };

  const html1 = () => <Component />;
  expect(html1).toThrow("1");
  const html2 = () => <Component />;
  expect(html2).toThrow("1");
  const html3 = () => <Component />;
  expect(html3).toThrow("1");
});

test("if a promise rejects, the same rejected promise is returned", async () => {
  let count = 0;
  const rejects = cache(async () => {
    count++;
    throw new Error(count.toString());
  });

  const Component = async () => {
    await rejects();
    return <p>hi</p>;
  };

  const html1 = () => <Component />;
  expect(html1).toThrow("1");

  const html2 = () => <Component />;
  expect(html2).toThrow("1");

  const html3 = () => <Component />;
  expect(html3).toThrow("1");
});
