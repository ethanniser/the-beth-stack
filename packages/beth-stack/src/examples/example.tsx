import { Elysia } from "elysia";
import "../jsx/register";
import { renderToStreamResponse, renderToStringResponse } from "../jsx/render";
import { Suspense } from "../jsx/suspense";

const app = new Elysia()
  .get("/", () =>
    renderToStringResponse(() => (
      <Suspense fallback={<p>loading...</p>}>
        <Wait ms={1000} />
      </Suspense>
    )),
  )
  .get("/stream", () =>
    renderToStreamResponse(() => (
      <Suspense fallback={<p>loading...</p>}>
        <Wait ms={1000} />
      </Suspense>
    )),
  )
  .listen(3000);

console.log(`listening on http://localhost:${app.server?.port}`);

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
