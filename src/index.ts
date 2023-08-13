import html from "@elysiajs/html";
import { Elysia } from "elysia";
import { autoroutes } from "elysia-autoroutes";

const app = new Elysia()
  .use(autoroutes({ routesDir: './routes' }))
  .use(html())
  .get("/styles.css", () => Bun.file("./tailwind-gen/styles.css"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;