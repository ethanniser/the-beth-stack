import { Children } from "../jsx";

class BethGlobalStore {
  public dedupeCache: WeakMap<Function, Map<Array<any>, any>>;
  public streamController: ReadableStreamDefaultController<string> | undefined;
  public counter: number;
  private suspenseMap: Map<Children, number>;
  public sentFirstChunk: boolean;

  constructor() {
    this.dedupeCache = new WeakMap();
    this.streamController = undefined;
    this.counter = 1;
    this.suspenseMap = new Map();
    this.sentFirstChunk = false;
  }

  public reset() {
    this.dedupeCache = new WeakMap();
    this.streamController = undefined;
    this.counter = 1;
    this.suspenseMap = new Map();
    this.sentFirstChunk = false;
  }

  public registerChild(child: Children[]): number {
    const id = this.counter++;
    this.suspenseMap.set(child, id);
    return id;
  }

  public dismissChild(child: Children[]): number | undefined {
    const id = this.suspenseMap.get(child);
    if (id) {
      this.suspenseMap.delete(child);
    }
    return id;
  }

  public closeNow() {
    this.streamController?.close();
    this.reset();
  }

  public checkIfEndAndClose() {
    if (this.suspenseMap.size === 0) {
      this.closeNow();
    }
  }
}

export const BETH_GLOBAL = new BethGlobalStore();
