import { expect, test } from "bun:test";
import { htmlStreamWithLayout, htmlWithLayout } from "..";
import { cache } from "../../cache";
import { Suspense } from "../../jsx";
import { swapScript } from "../../jsx/suspense";

function Layout({ children }: { children: string }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

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

test("renders html with layout", async () => {
  const res = await htmlWithLayout(() => <p>hi world</p>, Layout);
  const html = await res.text();

  expect(html).toBe(`<html><body><p>hi world</p></body></html>`);
});

let count = 0;
const getCount = () => ++count;
const cachedGetCount = cache(getCount);

test("cache still works with layout", async () => {
  const Foo = () => <p>count: {cachedGetCount()}</p>;
  const Bar = () => (
    <div>
      <Foo />
      <Foo />
    </div>
  );

  const res = await htmlWithLayout(() => <Bar />, Layout);
  const html = await res.text();

  expect(html).toBe(
    `<html><body><div><p>count: 1</p><p>count: 1</p></div></body></html>`,
  );
});

test("streaming with layout", async () => {
  console.log("renderToStream, doesn't resolve immediately");
  const res = htmlStreamWithLayout(
    () => (
      <Suspense fallback={<p>loading...</p>}>
        <Wait ms={100} />
      </Suspense>
    ),
    Layout,
  );

  const expectedChunks = [
    `
      <html>
        <body>
          <div id="B:1" data-fallback>
              <p>loading...</p>
          </div>
        </body>
      </html>
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

  for await (const chunk of res.body!) {
    expect(chunk.replace(/[\s\n\t\r]+/g, "")).toBe(
      expectedChunks[index]!.replace(/[\s\n\t\r]+/g, ""),
    );
    index++;
  }

  expect(index).toBe(expectedChunks.length);
});
