import { expect, test } from "bun:test";
import { consumeContext, defineContext } from "../context";
import "../register";

const MyContext = defineContext<number>();
const NestedContext = defineContext<string>();

function ConsumerComponent() {
  const value = consumeContext(MyContext);
  return <div>{value}</div>;
}

test("provides and consumes context", async () => {
  const html = await (
    <MyContext.Provider value={42}>
      {() => <ConsumerComponent />}
    </MyContext.Provider>
  );

  expect(html).toBe(`<div>42</div>`);
});

test("returns null if context not provided", async () => {
  const value = consumeContext(MyContext);
  expect(value).toBe(null);
});

function OuterConsumer() {
  const value = consumeContext(MyContext);
  return <div>{value}</div>;
}

function InnerConsumer() {
  const value = consumeContext(NestedContext);
  return <div>{value}</div>;
}

function DualConsumer() {
  const outerValue = consumeContext(MyContext);
  const innerValue = consumeContext(NestedContext);
  return (
    <div>
      {outerValue}-{innerValue}
    </div>
  );
}

test("provides and consumes nested context", async () => {
  const html = await (
    <MyContext.Provider value={42}>
      {() => (
        <NestedContext.Provider value="nested">
          {() => <DualConsumer />}
        </NestedContext.Provider>
      )}
    </MyContext.Provider>
  );

  expect(html).toBe(`<div>42-nested</div>`);
});

test("outer context is available to inner consumer, but not vice versa", async () => {
  const html1 = await (
    <MyContext.Provider value={42}>
      {() => <InnerConsumer />}
    </MyContext.Provider>
  );

  expect(html1).toBe(`<div></div>`);

  const html2 = await (
    <NestedContext.Provider value="nested">
      {() => <OuterConsumer />}
    </NestedContext.Provider>
  );

  expect(html2).toBe(`<div></div>`);
});

test("context values are only accessible below their providers", async () => {
  const outerValueBefore = consumeContext(MyContext);
  const innerValueBefore = consumeContext(NestedContext);

  expect(outerValueBefore).toBe(null);
  expect(innerValueBefore).toBe(null);

  const html = await (
    <MyContext.Provider value={42}>
      {() => (
        <NestedContext.Provider value="nested">
          {() => <DualConsumer />}
        </NestedContext.Provider>
      )}
    </MyContext.Provider>
  );

  const outerValueAfter = consumeContext(MyContext);
  const innerValueAfter = consumeContext(NestedContext);

  expect(outerValueAfter).toBe(null);
  expect(innerValueAfter).toBe(null);
  expect(html).toBe(`<div>42-nested</div>`);
});
