import "../jsx/register";
import { type Elysia } from "elysia";
import { setGlobalPersistCacheConfig } from "../cache";
import { GlobalCacheConfig } from "../cache/persist";
import { renderToStreamResponse, renderToStringResponse } from "../jsx";
import { BETH_GLOBAL_RENDER_CACHE } from "../shared/global";

type BethPluginOptions = GlobalCacheConfig;

export function html<T extends () => JSX.Element>(
  lazyHtml: T,
): Promise<Response> {
  return renderToStringResponse(lazyHtml);
}

export function htmlStream<T extends () => JSX.Element>(lazyHtml: T): Response {
  return renderToStreamResponse(lazyHtml);
}

export function htmlWithLayout<
  T extends () => JSX.Element,
  U extends (...args: any) => JSX.Element,
>(lazyHtml: T, Layout: U): Promise<Response> {
  const fullComponent = () => <Layout>{lazyHtml()}</Layout>;
  return renderToStringResponse(fullComponent);
}

export function htmlStreamWithLayout<
  T extends () => JSX.Element,
  U extends (...args: any) => JSX.Element,
>(lazyHtml: T, Layout: U): Response {
  const fullComponent = () => <Layout>{lazyHtml()}</Layout>;
  return renderToStreamResponse(fullComponent);
}
export function bethStack(options: Partial<BethPluginOptions> = {}) {
  // setGlobalPersistCacheConfig(options);

  return function bethPlugin(app: Elysia) {
    return (
      app
        .decorate("html", html)
        .decorate("htmlStream", htmlStream)
        .decorate("htmlWithLayout", htmlWithLayout)
        .decorate("htmlStreamWithLayout", htmlStreamWithLayout)
        // ! FIX WHEN ELYSIA IS FIXED
        .onRequest(() => {
          BETH_GLOBAL_RENDER_CACHE.reset();
        })
        .onResponse(() => {
          BETH_GLOBAL_RENDER_CACHE.reset();
        })
    );
  };
}
