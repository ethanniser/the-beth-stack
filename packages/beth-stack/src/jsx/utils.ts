;

/**
 * FORK OF [kitajs/html](https://github.com/kitajs/html)
 */

import type { Children } from ".";


;





const CAMEL_REGEX = /[a-z][A-Z]/;

export function isUpper(input: string, index: number): boolean {
  const code = input.charCodeAt(index);
  return code >= 65 /* A */ && code <= 90; /* Z */
}

export function isVoidElement(tag: string): boolean {
  // Ordered by most common to least common.
  return (
    tag === "meta" ||
    tag === "link" ||
    tag === "img" ||
    tag === "br" ||
    tag === "input" ||
    tag === "hr" ||
    tag === "area" ||
    tag === "base" ||
    tag === "col" ||
    tag === "command" ||
    tag === "embed" ||
    tag === "keygen" ||
    tag === "param" ||
    tag === "source" ||
    tag === "track" ||
    tag === "wbr"
  );
}

export function styleToString(style: object | string): string {
  // Faster escaping process that only looks for the " character.
  // As we use the " character to wrap the style string, we need to escape it.
  if (typeof style === "string") {
    let end = style.indexOf('"');

    // This is a optimization to avoid having to look twice for the " character.
    // And make the loop already start in the middle
    if (end === -1) {
      return style;
    }

    const length = style.length;

    let escaped = "";
    let start = 0;

    // Faster than using regex
    // https://jsperf.app/kakihu
    for (; end < length; end++) {
      if (style[end] === '"') {
        escaped += style.slice(start, end) + "&#34;";
        start = end + 1;
      }
    }

    // Appends the remaining string.
    escaped += style.slice(start, end);

    return escaped;
  }

  const keys = Object.keys(style);
  const length = keys.length;

  let key;
  let value;
  let index = 0;
  let result = "";

  for (; index < length; index++) {
    key = keys[index];
    // @ts-expect-error - this indexing is safe.
    value = style[key];

    if (value === null || value === undefined) {
      continue;
    }

    // @ts-expect-error - this indexing is safe.
    result += toKebabCase(key) + ":";

    // Only needs escaping when the value is a string.
    if (typeof value !== "string") {
      result += value.toString() + ";";
      continue;
    }

    let end = value.indexOf('"');

    // This is a optimization to avoid having to look twice for the " character.
    // And make the loop already start in the middle
    if (end === -1) {
      result += value + ";";
      continue;
    }

    const length = value.length;
    let start = 0;

    // Faster than using regex
    // https://jsperf.app/kakihu
    for (; end < length; end++) {
      if (value[end] === '"') {
        result += value.slice(start, end) + "&#34;";
        start = end + 1;
      }
    }

    // Appends the remaining string.
    result += value.slice(start, end) + ";";
  }

  return result;
}

export function attributesToString(attributes: object): string {
  if (!attributes) {
    return "";
  }

  const keys = Object.keys(attributes);
  const length = keys.length;

  let key, value, type;
  let result = "";
  let index = 0;

  for (; index < length; index++) {
    key = keys[index];

    // Skips all @kitajs/html specific attributes.
    if (key === "children" || key === "safe") {
      continue;
    }

    // @ts-expect-error - this indexing is safe.
    value = attributes[key];

    // React className compatibility.
    if (key === "className") {
      // @ts-expect-error - both were provided, so use the class attribute.
      if (attributes.class !== undefined) {
        continue;
      }

      key = "class";
    }

    if (key === "style") {
      result += ' style="' + styleToString(value) + '"';
      continue;
    }

    type = typeof value;

    if (type === "boolean") {
      // Only add the attribute if the value is true.
      if (value) {
        result += " " + key;
      }

      continue;
    }

    if (value === null || value === undefined) {
      continue;
    }

    result += " " + key;

    if (type !== "string") {
      // Non objects are
      if (type !== "object") {
        result += '="' + value.toString() + '"';
        continue;

        // Dates are always safe
      } else if (value instanceof Date) {
        result += '="' + value.toISOString() + '"';
        continue;
      }

      // The object may have a overridden toString method.
      // Which results in a non escaped string.
      value = value.toString();
    }

    let end = value.indexOf('"');

    // This is a optimization to avoid having to look twice for the " character.
    // And make the loop already start in the middle
    if (end === -1) {
      result += '="' + value + '"';
      continue;
    }

    result += '="';

    const length = value.length;
    let start = 0;

    // Faster than using regex
    // https://jsperf.app/kakihu
    for (; end < length; end++) {
      if (value[end] === '"') {
        result += value.slice(start, end) + "&#34;";
        start = end + 1;
      }
    }

    // Appends the remaining string.
    result += value.slice(start, end) + '"';
  }

  return result;
}

export function toKebabCase(camel: string): string {
  // This is a optimization to avoid the whole conversion process when the
  // string does not contain any uppercase characters.
  if (!CAMEL_REGEX.test(camel)) {
    return camel;
  }

  const length = camel.length;

  let start = 0;
  let end = 0;
  let kebab = "";
  let prev = true;
  let curr = isUpper(camel, 0);
  let next;

  for (; end < length; end++) {
    next = isUpper(camel, end + 1);

    // detects the start of a new camel case word and avoid lowercasing abbreviations.
    if (!prev && curr && !next) {
      // @ts-expect-error - this indexing is safe.
      kebab += camel.slice(start, end) + "-" + camel[end].toLowerCase();
      start = end + 1;
    }

    prev = curr;
    curr = next;
  }

  // Appends the remaining string.
  kebab += camel.slice(start, end);

  return kebab;
}

export function contentsToString(
  contents: Children[],
  escape?: boolean,
): string {
  const length = contents.length;

  if (length === 0) {
    return "";
  }

  let result = "";
  let content;
  let index = 0;

  for (; index < length; index++) {
    content = contents[index];

    // Ignores non 0 falsy values
    if (!content && content !== 0) {
      continue;
    }

    if (Array.isArray(content)) {
      result += contentsToString(content, escape);
    } else if (escape === true) {
      result += Bun.escapeHTML(content);
    } else {
      result += content;
    }
  }

  return result;
}

export function deepFlatten<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((acc, val) => {
    return Array.isArray(val) ? acc.concat(deepFlatten(val)) : acc.concat(val);
  }, []);
}