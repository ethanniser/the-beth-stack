import { BethPersistedCache } from "../cache/new-persist";
import { BethRenderCache } from "../cache/render";

declare global {
  var BETH_GLOBAL_RENDER_CACHE: BethRenderCache;
  var BETH_GLOBAL_PERSISTED_CACHE: BethPersistedCache;
}

globalThis.BETH_GLOBAL_RENDER_CACHE ??= new BethRenderCache();
globalThis.BETH_GLOBAL_PERSISTED_CACHE ??= new BethPersistedCache();

export const BETH_GLOBAL_RENDER_CACHE = globalThis.BETH_GLOBAL_RENDER_CACHE;
export const BETH_GLOBAL_PERSISTED_CACHE =
  globalThis.BETH_GLOBAL_PERSISTED_CACHE;

declare global {
  var RENDER_COUNT: number;
}

globalThis.RENDER_COUNT ??= 0;
globalThis.RENDER_COUNT++;
