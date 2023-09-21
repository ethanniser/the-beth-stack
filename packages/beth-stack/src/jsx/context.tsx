import type { Children } from ".";

class GlobalContextContext {
  private stack = new Array<symbol>();
  private map = new Map<symbol, any>();

  public set<T>(context: Context<T>, value: T) {
    this.map.set(context.id, value);
  }

  public get<T>(context: Context<T>): T | null {
    return this.map.get(context.id) ?? null;
  }

  public push(id: symbol) {
    this.stack.push(id);
  }

  public pop() {
    const id = this.stack.pop();
    if (!id) {
      throw new Error("Context stack is empty");
    }
    this.map.delete(id);
  }
}

export const GLOBAL_CONTEXT_CONTEXT = new GlobalContextContext();

class Context<T> {
  readonly id = Symbol("context");

  public Provider = ({
    children,
    value,
  }: {
    children: (value: T) => Children;
    value: T;
  }) => {
    GLOBAL_CONTEXT_CONTEXT.push(this.id);
    GLOBAL_CONTEXT_CONTEXT.set(this, value);

    const [fn] = children as unknown as [(value: T) => Children];

    const result = fn(value);

    GLOBAL_CONTEXT_CONTEXT.pop();

    return <>{result}</>;
  };
}

export function defineContext<T>(): Context<T> {
  return new Context<T>();
}

export function consumeContext<T>(context: Context<T>): T | null {
  return GLOBAL_CONTEXT_CONTEXT.get(context);
}
