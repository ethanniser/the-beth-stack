import { BETH_GLOBAL } from "../shared/global";

export async function renderToString<T extends () => JSX.Element>(
  lazyHtml: T
): JSX.Element {
  BETH_GLOBAL.reset();
  const resultPromise = lazyHtml();
  resultPromise.then(() => BETH_GLOBAL.reset());
  return resultPromise;
}

export async function renderToStringResponse<T extends () => JSX.Element>(
  lazyHtml: T
): Promise<Response> {
  const result = await renderToString(lazyHtml);
  return new Response(result, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

export function renderToStreamResponse<T extends () => JSX.Element>(
  lazyHtml: T
): Response {
  const stream = renderToStream(lazyHtml);
  return new Response(stream, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

export function renderToStream<T extends () => JSX.Element>(
  lazyHtml: T
): ReadableStream<string> {
  BETH_GLOBAL.reset();
  const stream = new ReadableStream<string>({
    start(c) {
      BETH_GLOBAL.streamController = c;
      lazyHtml()
        .then((data) => {
          BETH_GLOBAL.streamController?.enqueue(data);
          BETH_GLOBAL.checkIfEndAndClose();
        })
        .catch((error) => {
          console.error("Error in promise:", error);
          // Handle error appropriately
          BETH_GLOBAL.streamController?.error(error);
          BETH_GLOBAL.closeNow();
        });
    },
  });

  return stream;
}
