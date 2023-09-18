// This file is a result from https://github.com/Desdaemon/typed-htmx and https://htmx.org
// Missing something? Please submit a issue report or a PR:
// https://github.com/kitajs/html

declare namespace JSX {
  interface HtmlTag extends Htmx.Attributes {}
}

declare namespace Htmx {
  /**
   * Either `true`, `false`, `"true"` or `"false"`.
   */
  type BoolStr = boolean | "true" | "false";
  type AnyStr = string & {};
  type HxSwap =
    | "innerHTML"
    | "outerHTML"
    | "beforebegin"
    | "afterbegin"
    | "beforeend"
    | "afterend"
    | "delete"
    | "none"
    | "morph"
    | "morphdom";

  /**
   * Either `this` which refers to the element itself, or a modifier followed by a CSS selector, e.g. `closest form`.
   */
  type HxTarget = "this" | "closest " | "find " | "next " | "previous ";

  /**
   * A CSS selector, followed by one of these sync strategies, e.g. `form:abort`.
   */
  type HxSync =
    | ":drop"
    | ":abort"
    | ":replace"
    | ":queue"
    | ":queue first"
    | ":queue last"
    | ":queue all";

  /**
   * Evaluate the values given, you can prefix the values with javascript: or js:.
   */
  type HxHeaders = AnyStr | "javascript:" | "js:";

  /**
   * An event followed by one of these modifiers, e.g. `click once`.
   */
  type HxTriggerModifier =
    | " once"
    | " changed"
    | " delay:"
    | " throttle:"
    | " from:"
    | " target:"
    | " consume"
    | " queue:first"
    | " queue:last"
    | " queue:all"
    | " queue:none";

  /**
   * An extensible directory of htmx extensions.
   *
   * ## Declaring a new extension
   *
   * ```tsx
   * declare global {
   *   namespace JSX {
   *     interface HtmxExtensions {
   *       myExtension: "my-extension";
   *     }
   *     interface HtmlTag {
   *       ["my-extension-attr"]?: string
   *       // Add any other attributes your extension uses here
   *     }
   *   }
   * }
   *
   * <div hx-ext="my-extension">
   *   <span my-extension-attr="foo">Hello</span>
   * </div>
   * ```
   */
  interface Extensions {
    /**
     * Includes the commonly-used `X-Requested-With` header that identifies ajax requests in many backend frameworks.
     *
     * CDN: https://unpkg.com/htmx.org/dist/ext/ajax-header.js
     * @see https://htmx.org/extensions/ajax-header/
     */
    ajaxHeaders: "ajax-headers";

    /**
     * Server-Sent Events.
     *
     * CDN: https://unpkg.com/htmx.org/dist/ext/sse.js
     * @see https://htmx.org/extensions/server-sent-events/
     */
    serverSentEvents: "sse";

    /**
     * WebSockets support.
     *
     * CDN: https://unpkg.com/htmx.org/dist/ext/ws.js
     * @see https://htmx.org/extensions/web-sockets/
     */
    ws: "ws";

    /**
     * Class utilities.
     *
     * CDN: https://unpkg.com/htmx.org/dist/ext/class-tools.js
     * @see https://htmx.org/extensions/class-tools/
     */
    classTools: "class-tools";

    /**
     * Tool for debugging htmx requests.
     *
     * CDN: https://unpkg.com/htmx.org/dist/ext/debug.js
     * @see https://htmx.org/extensions/debug/
     */
    debug: "debug";

    /**
     * Disable elements during requests.
     *
     * CDN: https://unpkg.com/htmx.org/dist/ext/disable-element.js
     * @see https://htmx.org/extensions/disable-element/
     */
    disableElement: "disable-element";

    /**
     * Includes a JSON serialized version of the triggering event, if any.
     *
     * CDN: https://unpkg.com/htmx.org/dist/ext/event-header.js
     * @see https://htmx.org/extensions/event-header/
     */
    eventHeader: "event-header";

    /**
     * Support for adding tags to `<head>`.
     *
     * CDN: https://unpkg.com/htmx.org/dist/ext/head-support.js
     * @see https://htmx.org/extensions/head-support/
     */
    headSupport: "head-support";

    /**
     * Support for [Idiomorph](https://github.com/bigskysoftware/idiomorph), an alternative swapping mechanism for htmx.
     *
     * CDN: https://unpkg.com/idiomorph/dist/idiomorph-ext.min.js
     * @see https://github.com/bigskysoftware/idiomorph#htmx
     */
    idiomorph: "morph";

    /**
     * Use JSON encoding in the body of requests, rather than the default `x-www-form-urlencoded`.
     *
     * CDN: https://unpkg.com/htmx.org/dist/ext/json-enc.js
     * @see https://htmx.org/extensions/json-enc/
     */
    jsonEncode: "json-enc";

    /**
     * Support for inflight loading states.
     *
     * CDN: https://unpkg.com/htmx.org/dist/ext/loading-states.js
     * @see https://htmx.org/extensions/loading-states/
     */
    loadingStates: "loading-states";

    /**
     * Support for [morphdom](https://github.com/patrick-steele-idem/morphdom),
     * an alternative swapping mechanism for htmx.
     *
     * CDN: https://unpkg.com/htmx.org/dist/ext/morphdom-swap.js
     * @see https://htmx.org/extensions/morphdom-swap/
     */
    morphdom: "morphdom";
  }

  /**
   * Definitions for htmx attributes up to 1.9.3.
   */
  interface Attributes {
    /**
     * Issues a `GET` to the specified URL.
     * @see https://htmx.org/attributes/hx-get/
     */
    ["hx-get"]?: string;

    /**
     * Issues a `POST` to the specified URL.
     * @see https://htmx.org/attributes/hx-post/
     */
    ["hx-post"]?: string;

    /**
     * Issues a `PUT` to the specified URL.
     * @see https://htmx.org/attributes/hx-put/
     */
    ["hx-put"]?: string;

    /**
     * Issues a `DELETE` to the specified URL.
     * @see https://htmx.org/attributes/hx-delete/
     */
    ["hx-delete"]?: string;

    /**
     * Issues a `PATCH` to the specified URL.
     * @see https://htmx.org/attributes/hx-patch/
     */
    ["hx-patch"]?: string;

    /**
     * Add or remove [progressive enhancement] for links and forms.
     * @see https://htmx.org/attributes/hx-boost/
     *
     * [progressive enhancement]: https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement
     */
    ["hx-boost"]?: BoolStr;

    /**
     * Handle any event with a script inline.
     * @see https://htmx.org/attributes/hx-on/
     * @remarks Event listeners on htmx-specific events need to be specified with a spread attribute, and
     *            are otherwise not supported in vanilla JSX.
     * ```jsx
     * <div {...{'hx-on::before-request': '...'}} />
     * ```
     * @since 1.9.3
     */
    [`hx-on:`]?: string;

    /**
     * Handle any event with a script inline. Each listener is specified on a separate line.
     * @see https://htmx.org/attributes/hx-on/
     * @remarks Superseded by `hx-on:$event`, unless IE11 support is required.
     * @since 1.9.0
     */
    ["hx-on"]?: string;

    /**
     * Pushes the URL into the browser location bar, creating a new history entry.
     * @see https://htmx.org/attributes/hx-push-url/
     */
    ["hx-push-url"]?: BoolStr | AnyStr;

    /**
     * Select content to swap in from a response.
     * @see https://htmx.org/attributes/hx-select/
     */
    ["hx-select"]?: string;

    /**
     * Select content to swap in from a response, out of band (somewhere other than the target).
     * @see https://htmx.org/attributes/hx-select-oob/
     */
    ["hx-select-oob"]?: string;

    /**
     * Controls how content is swapped in (`outerHTML`, `beforeend`, `afterend`, …).
     * @see https://htmx.org/attributes/hx-swap/
     * @see {@linkcode InsertPosition} which is used in [{@linkcode Element.insertAdjacentHTML}](https://developer.mozilla.org/docs/Web/API/Element/insertAdjacentHTML)
     * @remarks
     * - `morph` swaps are part of the {@linkcode Extensions.idiomorph idiomorph} extension.
     * - `morphdom` swaps are part of the {@linkcode Extensions.morphdom morphdom} extension.
     */
    ["hx-swap"]?: HxSwap | AnyStr;

    /**
     * Marks content in a response to be out of band (should swap in somewhere other than the target).
     * @see https://htmx.org/attributes/hx-swap-oob/
     */
    ["hx-swap-oob"]?: "true" | HxSwap | AnyStr;

    /**
     * Specifies the target element to be swapped.
     * @see https://htmx.org/attributes/hx-target/
     */
    ["hx-target"]?: HxTarget | AnyStr;

    /**
     * Specifies the event that triggers the request.
     * @see https://htmx.org/attributes/hx-trigger/
     */
    ["hx-trigger"]?: "every " | HxTriggerModifier | AnyStr;

    /**
     * Adds values to the parameters to submit with the request (JSON-formatted).
     * @see https://htmx.org/attributes/hx-vals/
     */
    ["hx-vals"]?: HxHeaders;

    /**
     * Shows a `confirm()` dialog before issuing a request.
     * @see https://htmx.org/attributes/hx-confirm/
     */
    ["hx-confirm"]?: string;

    /**
     * Disables htmx processing for the given node and any children nodes.
     * @see https://htmx.org/attributes/hx-disable/
     */
    ["hx-disable"]?: boolean;

    /**
     * Control and disable automatic attribute inheritance for child nodes.
     * @see https://htmx.org/attributes/hx-disinherit/
     */
    ["hx-disinherit"]?: "*" | AnyStr;

    /**
     * Changes the request encoding type.
     * @see https://htmx.org/attributes/hx-encoding/
     */
    ["hx-encoding"]?: "multipart/form-data";

    /**
     * Extensions to use for this element.
     * @see https://htmx.org/attributes/hx-ext/
     * @see {@linkcode Extensions} for how to declare extensions in JSX.
     */
    ["hx-ext"]?: Htmx.Extensions[keyof Htmx.Extensions] | "ignore:" | AnyStr;

    /**
     * Adds to the headers that will be submitted with the request.
     * @see https://htmx.org/attributes/hx-headers/
     */
    ["hx-headers"]?: HxHeaders | AnyStr;

    /**
     * Prevent sensitive data being saved to the history cache.
     * @see https://htmx.org/attributes/hx-history/
     */
    ["hx-history"]?: "false";

    /**
     * The element to snapshot and restore during history navigation.
     * @see https://htmx.org/attributes/hx-history-elt/
     */
    ["hx-history-elt"]?: boolean;

    /**
     * Include additional data in requests.
     * @see https://htmx.org/attributes/hx-include/
     */
    ["hx-include"]?: string;

    /**
     * The element to put the `htmx-request` class on during the request.
     * @see https://htmx.org/attributes/hx-indicator/
     */
    ["hx-indicator"]?: string;

    /**
     * Filters the parameters that will be submitted with a request.
     * @see https://htmx.org/attributes/hx-params/
     */
    ["hx-params"]?: "*" | "none" | "not " | AnyStr;

    /**
     * Specifies elements to keep unchanged between requests.
     * @see https://htmx.org/attributes/hx-preserve/
     * @remarks `true` is only observed by the `head-support` extension,
     *            where it prevents an element from being removed from the `<head>`.
     */
    ["hx-preserve"]?: boolean | "true";

    /**
     * Shows a `prompt()` before submitting a request.
     * @see https://htmx.org/attributes/hx-prompt/
     */
    ["hx-prompt"]?: string;

    /**
     * Replace the URL in the browser location bar.
     * @see https://htmx.org/attributes/hx-replace-url/
     */
    ["hx-replace-url"]?: BoolStr | AnyStr;

    /**
     * Configures various aspects of the request.
     * @see https://htmx.org/attributes/hx-request/
     */
    ["hx-request"]?:
      | `"timeout": `
      | `"credentials": `
      | `"noHeaders": `
      | HxHeaders;

    /**
     * Control how requests made by different elements are synchronized.
     * @see https://htmx.org/attributes/hx-sync/
     */
    ["hx-sync"]?: HxSync;

    /**
     * Force elements to validate themselves before a request.
     * @see https://htmx.org/attributes/hx-validate/
     */
    ["hx-validate"]?: boolean;

    /**
     * Adds values dynamically to the parameters to submit with the request.
     * @deprecated superseded by `hx-vals`
     */
    ["hx-vars"]?: AnyStr;

    /**
     * The URL of the SSE server.
     * @see https://htmx.org/extensions/server-sent-events/
     */
    ["sse-connect"]?: string;

    /**
     * The name of the message to swap into the DOM.
     * @see https://htmx.org/extensions/server-sent-events/
     */
    ["sse-swap"]?: string;

    /**
     * A URL to establish a WebSocket connection against.
     * @see https://htmx.org/extensions/web-sockets/
     */
    ["ws-connect"]?: string;

    /**
     * Sends a message to the nearest websocket based on the trigger value for the element.
     * @see https://htmx.org/extensions/web-sockets/
     */
    ["ws-send"]?: boolean;

    /**
     * Apply class transitions on this element.
     * @see https://htmx.org/extensions/class-tools/
     */
    ["classes"]?: `add ` | `remove ` | `toggle ` | AnyStr;

    /**
     * The element or elements to disable during requests.
     * Accepts CSS selectors.
     * @see https://htmx.org/extensions/disable-element/
     */
    ["hx-disable-element"]?: "self" | AnyStr;

    /**
     * The strategy for merging new head content.
     * @see https://htmx.org/extensions/head-support/
     */
    ["hx-head"]?: "merge" | "append" | "re-eval";
  }
}
