import { Context, t } from "elysia";
import * as elements from "typed-html";

import { db } from "../../db";
import { todos } from "../../db/schema";
import { TodoItem } from "../../components/todo-item";
import { TodoList } from "../../components/todo-list";
import { App } from "../..";

export async function get() {
  const data = await db.select().from(todos).all();
  return <TodoList todos={data} />;
}

export const post = {
  handler: async ({ body }: Context<App['router']>) => {
    const content = {
      beth: "Learn the BETH stack",
      vim: "Learn vim",
      like: "Like the video",
      sub: "Subscribe to Ethan",
    };

    const newTodo = await db
      .insert(todos)
      .values({ content: content[body.content]})
      .returning()
      .get();
    return <TodoItem {...newTodo} />;
  },
  hooks: {
    body: t.Object({
      content: t.Union([
        t.Literal("beth"),
        t.Literal("vim"),
        t.Literal("like"),
        t.Literal("sub"),
      ]),
    }),
  }
}