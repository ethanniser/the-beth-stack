import { Elysia } from "elysia";
import "../src/jsx/register";
import { renderToStream, renderToStringResponse } from "../src/jsx/render";
import { Suspense } from "./jsx/suspense";

const app = new Elysia()
  .get("/", () =>
    renderToStringResponse(() => (
      <Suspense fallback={<p>loading...</p>}>
        <Wait ms={1000} />
      </Suspense>
    ))
  )
  .listen(3000);

console.log("listening on http://localhost:3000");

function wait(ms: number): Promise<number> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(ms);
    }, ms)
  );
}

async function Wait({ ms }: { ms: number }) {
  const data = await wait(ms);

  return <div>loaded in: {data}ms</div>;
}
