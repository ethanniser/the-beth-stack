import { BETH_GLOBAL } from "./global";

export function render<T extends string | Promise<string>>(x: T): T {
  BETH_GLOBAL.reset();
  return x;
}

export function renderToStream(node: JSX.Element): Response {
  // BETH_GLOBAL.reset();
  const stream = new ReadableStream<string>({
    start(c) {
      c.enqueue(`
      <!DOCTYPE html>
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Document</title>
        </head>
      <body>
      `);
      BETH_GLOBAL.streamController = c;
      node
        .then((data) => {
          console.log("sending initial data", data);
          BETH_GLOBAL.streamController?.enqueue(data);
          BETH_GLOBAL.checkIfEnd();
        })
        .catch((error) => {
          console.error("Error in promise:", error);
          // Handle error appropriately
          BETH_GLOBAL.streamController?.error(error);
          BETH_GLOBAL.endStream();
        });
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/html" },
  });
}
