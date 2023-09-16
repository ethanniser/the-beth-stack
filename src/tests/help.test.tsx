import { expect, test } from "bun:test";
import "../register";

test("idek", () => {
  const x = <p>foo</p>;
  const y = Promise.resolve("foo");
  expect(Bun.peek(x)).toBe("<p>foo</p>");
  expect(Bun.peek(y)).toBe("foo");
  expect(Bun.peek.status(x)).toBe("fulfilled");
  expect(Bun.peek.status(y)).toBe("fulfilled");

  const Test = async () => <p>foo</p>;
  expect(Bun.peek.status(<Test />)).toBe("pending");
});
