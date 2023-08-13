import { Context, t } from "elysia";
import * as elements from "typed-html";

import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { todos } from "../../../db/schema";
import { TodoItem } from "../../../components/todo-item";
import { App } from "../../..";


export const post = {
    handler: async ({ params: { id } }: Context<App['router']>) => {
        const oldTodo = await db
            .select()
            .from(todos)
            .where(eq(todos.id, id))
            .get();
        const newTodo = await db
            .update(todos)
            .set({ completed: !oldTodo.completed })
            .where(eq(todos.id, id))
            .returning()
            .get();
        return <TodoItem {...newTodo} />;
    },
    hooks: {
        params: t.Object({
            id: t.Numeric(),
        }),
    }
}