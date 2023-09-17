import { BethRenderCache } from "../cache/cache";
import { BethPersistCache } from "../cache/persist";

export const BETH_GLOBAL_RENDER_CACHE = new BethRenderCache();
export const BETH_GLOBAL_PERSISTED_CACHE = new BethPersistCache();
