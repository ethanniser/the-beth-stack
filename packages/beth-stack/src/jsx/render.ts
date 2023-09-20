import { BETH_GLOBAL_RENDER_CACHE } from "../shared/global";

export function renderToString<T extends () => JSX.Element>(
  lazyHtml: T,
): JSX.Element {
  BETH_GLOBAL_RENDER_CACHE.reset();
  const resultPromise = lazyHtml();
  resultPromise.finally(() => BETH_GLOBAL_RENDER_CACHE.reset());
  return resultPromise;
}

export async function renderToStringResponse<T extends () => JSX.Element>(
  lazyHtml: T,
): Promise<Response> {
  const result = await renderToString(lazyHtml);
  return new Response(result, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

export function renderToStreamResponse<T extends () => JSX.Element>(
  lazyHtml: T,
): Response {
  const stream = renderToStream(lazyHtml);
  return new Response(stream, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

export function renderToStream<T extends () => JSX.Element>(
  lazyHtml: T,
): ReadableStream<string> {
  BETH_GLOBAL_RENDER_CACHE.reset();
  const stream = new ReadableStream<string>({
    start(c) {
      BETH_GLOBAL_RENDER_CACHE.streamController = c;
      lazyHtml()
        .then((data) => {
          BETH_GLOBAL_RENDER_CACHE.streamController?.enqueue(data);
          BETH_GLOBAL_RENDER_CACHE.checkIfEndAndClose();
        })
        .catch((error) => {
          console.error("Error in promise:", error);
          // Handle error appropriately
          BETH_GLOBAL_RENDER_CACHE.streamController?.error(error);
          BETH_GLOBAL_RENDER_CACHE.closeNow();
        });
    },
  });

  return stream;
}
