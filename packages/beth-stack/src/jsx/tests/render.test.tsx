import { expect, test } from "bun:test";
import "../register";
import {
  renderToStream,
  renderToStreamResponse,
  renderToString,
  renderToStringResponse,
} from "../render";
import { Suspense, swapScript } from "../suspense";

function wait(ms: number): Promise<number> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(ms);
    }, ms),
  );
}

async function Wait({ ms }: { ms: number }) {
  const data = await wait(ms);

  return <div>loaded in: {data}ms</div>;
}

test("multiple children", async () => {
  const html = await (
    <div>
      <Wait ms={20} />
      <Wait ms={30} />
      <Wait ms={10} />
    </div>
  );

  expect(html).toBe(
    `<div><div>loaded in: 20ms</div><div>loaded in: 30ms</div><div>loaded in: 10ms</div></div>`,
  );
});

test("multiple children - nested", async () => {
  const html = await (
    <div>
      <Wait ms={20} />
      <Wait ms={30} />
      <div>
        <Wait ms={10} />
        <Wait ms={20} />
      </div>
    </div>
  );

  expect(html).toBe(
    `<div><div>loaded in: 20ms</div><div>loaded in: 30ms</div><div><div>loaded in: 10ms</div><div>loaded in: 20ms</div></div></div>`,
  );
});

test("array children 1", async () => {
  const html = await (
    <div>
      <div>
        {[1, 2, 3].map((i) => (
          <Wait ms={i * 10} />
        ))}
      </div>
    </div>
  );

  expect(html).toBe(
    `<div><div><div>loaded in: 10ms</div><div>loaded in: 20ms</div><div>loaded in: 30ms</div></div></div>`,
  );
});

test("array children - nested", async () => {
  const html = await (
    <div>
      {[1, 2, 3].map((_) => [1, 2, 3].map((i) => <Wait ms={i * 10} />))}
      <div>
        {[1, 2, 3].map((i) => (
          <Wait ms={i * 10} />
        ))}
      </div>
    </div>
  );

  expect(html.replace(/[\s\n\t\r]+/g, "")).toBe(
    `
      <div>
        <div>loaded in: 10ms</div>
        <div>loaded in: 20ms</div>
        <div>loaded in: 30ms</div>
        <div>loaded in: 10ms</div>
        <div>loaded in: 20ms</div>
        <div>loaded in: 30ms</div>
        <div>loaded in: 10ms</div>
        <div>loaded in: 20ms</div>
        <div>loaded in: 30ms</div>
        <div>
          <div>loaded in: 10ms</div>
          <div>loaded in: 20ms</div>
          <div>loaded in: 30ms</div>
        </div>
      </div>
    `.replace(/[\s\n\t\r]+/g, ""),
  );
});

test("no render func, resolves immediately", async () => {
  const html = await (
    <Suspense fallback={<p>loading...</p>}>
      <p>hi</p>
    </Suspense>
  );

  expect(html).toBe(`<p>hi</p>`);
});

test("no render func, doesn't resolve immediately", async () => {
  const html = await (
    <Suspense fallback={<p>loading...</p>}>
      <Wait ms={100} />
    </Suspense>
  );

  expect(html).toBe(`<div>loaded in: 100ms</div>`);
});

test("no render func, doesn't resolve immediately - multiple children", async () => {
  const html = await (
    <Suspense fallback={<p>loading...</p>}>
      <Wait ms={50} />
      <Wait ms={40} />
      <Wait ms={10} />
    </Suspense>
  );

  expect(html).toBe(
    `<div>loaded in: 50ms</div><div>loaded in: 40ms</div><div>loaded in: 10ms</div>`,
  );
});

test("renderToString, resolves immediately", async () => {
  const html = await renderToString(() => (
    <Suspense fallback={<p>loading...</p>}>
      <p>hi</p>
    </Suspense>
  ));

  expect(html).toBe(`<p>hi</p>`);
});

test("renderToString, resolves immediately - mutiple children", async () => {
  const html = await renderToString(() => (
    <Suspense fallback={<p>loading...</p>}>
      <p>hi</p>
      <p>bye</p>
    </Suspense>
  ));

  expect(html).toBe(`<p>hi</p><p>bye</p>`);
});

test("renderToString, doesn't resolve immediately", async () => {
  const html = await renderToString(() => (
    <Suspense fallback={<p>loading...</p>}>
      <Wait ms={100} />
    </Suspense>
  ));

  expect(html).toBe(`<div>loaded in: 100ms</div>`);
});

test("renderToString, doesn't resolve immediately  - multiple children", async () => {
  const html = await renderToString(() => (
    <Suspense fallback={<p>loading...</p>}>
      <Wait ms={100} />
      <Wait ms={50} />
    </Suspense>
  ));

  expect(html).toBe(`<div>loaded in: 100ms</div><div>loaded in: 50ms</div>`);
});

test("renderToStream, resolves immediately", async () => {
  const res = renderToStreamResponse(() => (
    <Suspense fallback={<p>loading...</p>}>
      <p>hi</p>
    </Suspense>
  ));

  const html = await res.text();

  expect(html).toBe(`<p>hi</p>`);
});

test("renderToStream, doesn't resolve immediately", async () => {
  console.log("renderToStream, doesn't resolve immediately");
  const stream = renderToStream(() => (
    <Suspense fallback={<p>loading...</p>}>
      <Wait ms={100} />
    </Suspense>
  ));

  const expectedChunks = [
    `
      <div id="B:1" data-fallback>
          <p>loading...</p>
      </div>
    `,
    swapScript +
      `
      <template id="N:1" data-replace>
          <div>loaded in: 100ms</div>
      </template>
      <script>
          $RC("N:1", "B:1");
      </script>
    `,
  ];

  let index = 0;

  for await (const chunk of stream) {
    expect(chunk.replace(/[\s\n\t\r]+/g, "")).toBe(
      expectedChunks[index]!.replace(/[\s\n\t\r]+/g, ""),
    );
    index++;
  }

  expect(index).toBe(expectedChunks.length);
});

test("renderTo*Response adds html headers", async () => {
  const res = renderToStreamResponse(() => (
    <Suspense fallback={<p>loading...</p>}>
      <p>hi</p>
    </Suspense>
  ));

  expect(res.headers.get("Content-Type")).toBe("text/html; charset=utf-8");

  const res2 = await renderToStringResponse(() => (
    <Suspense fallback={<p>loading...</p>}>
      <p>hi</p>
    </Suspense>
  ));

  expect(res2.headers.get("Content-Type")).toBe("text/html; charset=utf-8");
});
