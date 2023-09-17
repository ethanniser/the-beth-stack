import { BethRenderCache } from "../cache/render";
import { BethPersistCache } from "../cache/persist";

declare global {
  var BETH_GLOBAL_RENDER_CACHE: BethRenderCache;
  var BETH_GLOBAL_PERSISTED_CACHE: BethPersistCache;
}

globalThis.BETH_GLOBAL_RENDER_CACHE = new BethRenderCache();
globalThis.BETH_GLOBAL_PERSISTED_CACHE = new BethPersistCache();

export const BETH_GLOBAL_RENDER_CACHE =
  globalThis.BETH_GLOBAL_RENDER_CACHE ?? new BethRenderCache();
export const BETH_GLOBAL_PERSISTED_CACHE =
  globalThis.BETH_GLOBAL_PERSISTED_CACHE ?? new BethPersistCache();
