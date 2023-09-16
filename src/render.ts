import { BETH_GLOBAL } from "./global";

export const baseHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Document</title>
          <script src="https://unpkg.com/htmx.org@1.9.5"></script>
        </head>
      <body>
`;

export async function renderToString<T extends () => JSX.Element>(
  lazyHtml: T
): JSX.Element {
  BETH_GLOBAL.reset();
  return lazyHtml();
}

export function renderToStream<T extends () => JSX.Element>(
  lazyHtml: T
): Response {
  BETH_GLOBAL.reset();
  const stream = new ReadableStream<string>({
    start(c) {
      c.enqueue(baseHtml);
      BETH_GLOBAL.streamController = c;
      lazyHtml()
        .then((data) => {
          BETH_GLOBAL.streamController?.enqueue(data);
          BETH_GLOBAL.checkIfEnd();
        })
        .catch((error) => {
          console.error("Error in promise:", error);
          // Handle error appropriately
          BETH_GLOBAL.streamController?.error(error);
          BETH_GLOBAL.streamController?.close();
        });
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/html" },
  });
}
