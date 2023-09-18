/**
 * FORK OF [kitajs/html](https://github.com/kitajs/html)
 */
/// <reference path="./jsx.d.ts" />

import { Suspense } from "../jsx/suspense";
import { BETH_GLOBAL_RENDER_CACHE } from "../shared/global";
import { attributesToString, contentsToString, isVoidElement } from "./utils";

type Children =
  | number
  | string
  | Promise<string>
  | boolean
  | null
  | undefined
  | Children[];

type PropsWithChildren<T = {}> = {
  children?: Children;
} & T;

type Component<T = {}> = (props: PropsWithChildren<T>) => JSX.Element;
type AsyncComponent<T = {}> = (props: PropsWithChildren<T>) => Promise<string>;
type SyncComponent<T = {}> = (props: PropsWithChildren<T>) => string;

const Fragment: unique symbol = Symbol.for("beth-stack-fragment");

async function createElement(
  name: string | Component | typeof Fragment,
  attributes: PropsWithChildren<unknown> | null,
  ...children: Children[]
): Promise<string> {
  const hasAnyPromiseChildren = children.reduce(
    (acc, child) => acc || child instanceof Promise,
    false
  );
  const hasAnyUnresolvedPromiseChildren = children.reduce(
    (acc, child) => acc || Bun.peek.status(child) !== "fulfilled",
    false
  );

  const insideStreamCall =
    BETH_GLOBAL_RENDER_CACHE.streamController !== undefined;

  if (
    name === Suspense &&
    hasAnyUnresolvedPromiseChildren &&
    insideStreamCall
  ) {
    const id = BETH_GLOBAL_RENDER_CACHE.registerChild(children);

    if (attributes !== null && "fallback" in attributes) {
      attributes.fallback = `
        <div id="B:${id}" data-fallback>
        ${await attributes.fallback}
        </div>
      `;
    }
  } else {
    if (hasAnyPromiseChildren) {
      // Converts children to a string if they are promises.
      children = await Promise.all(children);
    }
  }

  // Adds the children to the attributes if it is not present.
  if (attributes === null) {
    attributes = { children };
  }

  // Calls the element creator function if the name is a function
  if (typeof name === "function") {
    // In case the children attributes is not present, add it as a property.
    if (attributes.children === undefined) {
      attributes.children = children;
    }

    return name(attributes);
  }

  if (name === Fragment) {
    return contentsToString(children);
  }

  // Switches the tag name when this custom `tag` is present.
  if (name === "tag" && "of" in attributes) {
    name = String(attributes.of);
    delete attributes.of;
  }

  if (children.length === 0 && isVoidElement(name)) {
    return "<" + name + attributesToString(attributes) + "/>";
  }

  return (
    "<" +
    name +
    attributesToString(attributes) +
    ">" +
    contentsToString(
      children,
      "safe" in attributes &&
        typeof attributes.safe === "boolean" &&
        attributes.safe
    ) +
    "</" +
    name +
    ">"
  );
}

function compile<
  P extends { [K in keyof P]: K extends "children" ? Children : string }
>(
  cleanComponent: SyncComponent<P>,
  strict: boolean = true,
  separator: string = "/*\x00*/"
): SyncComponent<P> {
  const properties = new Set();

  const html = cleanComponent(
    // @ts-expect-error - this proxy will meet the props with children requirements.
    new Proxy(
      {},
      {
        get(_, name) {
          // Adds the property to the set of known properties.
          properties.add(name);

          const isChildren = name === "children";
          let access = `args[${separator}\`${name.toString()}\`${separator}]`;

          // Adds support to render multiple children
          if (isChildren) {
            access = `Array.isArray(${access}) ? ${access}.join(${separator}\`\`${separator}) : ${access}`;
          }

          // Uses ` to avoid content being escaped.
          return `\`${separator} + (${access} || ${
            strict && !isChildren
              ? `throwPropertyNotFound(${separator}\`${name.toString()}\`${separator})`
              : `${separator}\`\`${separator}`
          }) + ${separator}\``;
        },
      }
    )
  );

  const sepLength = separator.length;
  const length = html.length;

  // Adds the throwPropertyNotFound function if strict
  let body = "";
  let nextStart = 0;
  let index = 0;

  // Escapes every ` without separator
  for (; index < length; index++) {
    // Escapes the backtick character because it will be used to wrap the string
    // in a template literal.
    if (
      html[index] === "`" &&
      html.slice(index - sepLength, index) !== separator &&
      html.slice(index + 1, index + sepLength + 1) !== separator
    ) {
      body += html.slice(nextStart, index) + "\\`";
      nextStart = index + 1;
      continue;
    }

    // Escapes the backslash character because it will be used to escape the
    // backtick character.
    if (html[index] === "\\") {
      body += html.slice(nextStart, index) + "\\\\";
      nextStart = index + 1;
      continue;
    }
  }

  // Adds the remaining string
  body += html.slice(nextStart);

  if (strict) {
    // eslint-disable-next-line no-new-func
    return Function(
      "args",
      // Checks for args presence
      'if (args === undefined) { throw new Error("The arguments object was not provided.") };\n' +
        // Function to throw when a property is not found
        'function throwPropertyNotFound(name) { throw new Error("Property " + name + " was not provided.") };\n' +
        // Concatenates the body
        `return \`${body}\``
    ) as SyncComponent<P>;
  }

  // eslint-disable-next-line no-new-func
  return Function(
    "args",
    // Adds a empty args object when it is not present
    "if (args === undefined) { args = Object.create(null) };\n" +
      `return \`${body}\``
  ) as SyncComponent<P>;
}

export default {
  createElement,
  Fragment,
  compile,
};

export {
  Children,
  PropsWithChildren,
  Component,
  AsyncComponent,
  SyncComponent,
};

export { Suspense } from "./suspense";
export {
  renderToStream,
  renderToStreamResponse,
  renderToString,
  renderToStringResponse,
} from "./render";
