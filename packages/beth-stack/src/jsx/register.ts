/// <reference types="./htmx.d.ts" />

import idkHtml from ".";

globalThis.Html = idkHtml;

declare global {
  /**
   * The html factory namespace.
   */
  var Html: typeof idkHtml;
}
