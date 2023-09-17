import "../jsx/register";
import "../jsx/htmx";
import { setGlobalPersistCacheConfig } from "../cache";
import { renderToStreamResponse, renderToStringResponse } from "../jsx";
import { Elysia } from "elysia";
import { GlobalCacheConfig } from "../cache/persist";
import { BETH_GLOBAL_RENDER_CACHE } from "../shared/global";

type BethPluginOptions = GlobalCacheConfig;

export function bethStack(options: Partial<BethPluginOptions> = {}) {
  setGlobalPersistCacheConfig(options);

  async function html<T extends () => JSX.Element>(
    lazyHtml: T
  ): Promise<Response> {
    return renderToStringResponse(lazyHtml);
  }

  function htmlStream<T extends () => JSX.Element>(lazyHtml: T): Response {
    return renderToStreamResponse(lazyHtml);
  }

  return new Elysia({
    name: "BETH-STACK",
  })
    .decorate("html", html)
    .decorate("htmlStream", htmlStream)
    .onRequest(() => {
      BETH_GLOBAL_RENDER_CACHE.reset();
    })
    .onResponse(() => {
      BETH_GLOBAL_RENDER_CACHE.reset();
    });
}
