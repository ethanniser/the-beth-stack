import Elysia from "elysia";
import "../register";
import "../htmx";
import { renderToString, renderToStream } from "../render";
import { Suspense } from "../suspense";

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

const Foo = async () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Wait ms={1000} />
  </Suspense>
);

const App = () => (
  <div>
    <p>I am sent immediately</p>
    <Suspense fallback={<div>Loading...</div>}>
      <Wait ms={1000} />
      <button hx-get="/foo" hx-swap="outerHTML">
        click me
      </button>
    </Suspense>
    <p>hey me too!</p>
  </div>
);

const App2 = () => (
  <div>
    <p>I am sent immediately</p>
    <Suspense fallback={<div>Loading...</div>}>
      <Wait ms={1000} />
      <div>hello</div>
    </Suspense>
    <p>hey me too!</p>
    <Suspense fallback={<div>loading 2...</div>}>
      <Wait ms={2000} />
      <div>hello two!</div>
      <Suspense fallback={<div>loading 3...</div>}>
        <Wait ms={3000} />
        <div>hello three!</div>
      </Suspense>
    </Suspense>
  </div>
);

const app = new Elysia()
  .get("/", () => renderToStream(() => <App />))
  .get("/2", () => renderToStream(() => <App2 />))
  .get("/foo", () => renderToString(() => <Foo />))
  .listen(3000);

console.log(
  `app is listening on http://${app.server?.hostname}:${app.server?.port}`
);
