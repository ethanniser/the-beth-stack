import { expect, test } from "bun:test";
import "../register";
import { ErrorBoundary } from "../error";
import { renderToStream, renderToString } from "../render";
import { Suspense } from "../suspense";

async function Reject() {
  const data = await Promise.reject("error");

  return <div>loaded in: {data}ms</div>;
}

test("catches errors", async () => {
  const html = await (
    <ErrorBoundary fallback={<p>error</p>}>
      <Reject />
    </ErrorBoundary>
  );

  expect(html).toBe(`<p>error</p>`);
});

test("catches errors in suspense", async () => {
  const html = await (
    <ErrorBoundary fallback={<p>error</p>}>
      <Suspense fallback={<div>loading...</div>}>
        <Reject />
      </Suspense>
    </ErrorBoundary>
  );

  expect(html).toBe(`<p>error</p>`);

  const html2 = await (
    <Suspense fallback={<div>loading...</div>}>
      <ErrorBoundary fallback={<p>error</p>}>
        <Reject />
      </ErrorBoundary>
    </Suspense>
  );

  expect(html2).toBe(`<p>error</p>`);
});
