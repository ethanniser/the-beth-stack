import { t } from "elysia";

import { db } from "../../db";
import { todos } from "../../db/schema";
import { eq } from "drizzle-orm";
import { App } from "../..";
import { Context } from "elysia";

export const del = {
    handler: async ({ params: { id } }: Context<App['router']>) => {
        await db.delete(todos).where(eq(todos.id, id)).run();
    },
    hooks: {
        params: t.Object({
            id: t.Numeric(),
        }),
    }
}