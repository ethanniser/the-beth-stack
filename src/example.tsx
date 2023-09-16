import Elysia from "elysia";
import Html from "./lib";
import { renderToStream } from "./lib/render";
import { Suspense } from "./lib/suspense";

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

const App = () => (
  <div>
    <p>I am sent immediately</p>
    <Suspense fallback={<div>Loading...</div>}>
      <Wait ms={1000} />
      <div>hello</div>
    </Suspense>
    <p>hey me too!</p>
    <Suspense fallback={<div>different loading!</div>}>
      <Wait ms={2000} />
      <div>hello two!</div>
    </Suspense>
  </div>
);

const app = new Elysia().get("/", () => renderToStream(<App />)).listen(3000);

console.log(
  `app is listening on http://${app.server?.hostname}:${app.server?.port}`
);
