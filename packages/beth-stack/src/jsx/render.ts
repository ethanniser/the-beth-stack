import { BETH_GLOBAL_RENDER_CACHE } from "../shared/global";

// Ensure the lazyHtml function returns a Promise that resolves to a JSX.Element
export async function renderToString<T extends () => Promise<JSX.Element>>(lazyHtml: T): Promise<JSX.Element> {
  BETH_GLOBAL_RENDER_CACHE.reset();
  try {
    const result = await lazyHtml();
    return result;
  } catch (error) {
    console.error("Error in renderToString:", error);
    throw new Error("Failed to render to string");
  }
}

export async function renderToStringResponse<T extends () => Promise<JSX.Element>>(lazyHtml: T): Promise<Response> {
  try {
    const result = await renderToString(lazyHtml);
    return new Response(result, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error in renderToStringResponse:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}

export function renderToStreamResponse<T extends () => Promise<JSX.Element>>(lazyHtml: T): Response {
  const stream = renderToStream(lazyHtml);
  return new Response(stream, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

export function renderToStream<T extends () => Promise<JSX.Element>>(lazyHtml: T): ReadableStream<string> {
  BETH_GLOBAL_RENDER_CACHE.reset();
  const stream = new ReadableStream<string>({
    start(controller) {
      BETH_GLOBAL_RENDER_CACHE.streamController = controller;
      lazyHtml()
        .then((data) => {
          BETH_GLOBAL_RENDER_CACHE.streamController?.enqueue(data);
          BETH_GLOBAL_RENDER_CACHE.checkIfEndAndClose();
        })
        .catch((error) => {
          console.error("Error in renderToStream:", error);
          // Handle error appropriately
          BETH_GLOBAL_RENDER_CACHE.streamController?.error(error);
          BETH_GLOBAL_RENDER_CACHE.closeNow();
        });
    },
    cancel(reason) {
      console.warn("Stream cancelled:", reason);
      BETH_GLOBAL_RENDER_CACHE.closeNow();
    },
  });
  return stream;
}
