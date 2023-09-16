import Elysia from "elysia";
import "../register";
import "../htmx";
import { renderToString, renderToStream, baseHtml } from "../render";
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

const app = new Elysia()
  .get("/", () => renderToStream(() => <App />))
  .get("/blocking", async () => {
    const result = await renderToString(() => <App />);
    return baseHtml + result + "</body></html>";
  })
  .get("/foo", () => renderToString(() => <Foo />))
  .listen(3000);

console.log(
  `app is listening on http://${app.server?.hostname}:${app.server?.port}`
);
