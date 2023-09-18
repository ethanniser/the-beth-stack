import idkHtml from ".";
import "./htmx";

globalThis.Html = idkHtml;

declare global {
  /**
   * The html factory namespace.
   */
  var Html: typeof idkHtml;
}
