import * as elements from "typed-html";
import { BaseHtml } from "../html";

export function get() {
  return (
    <BaseHtml>
      <body
        class="flex w-full h-screen justify-center items-center"
        hx-get="/todos"
        hx-swap="innerHTML"
        hx-trigger="load"
      />
    </BaseHtml>
  );
}