import * as elements from "typed-html";
import { TodoItem } from "./todo-item";
import { TodoForm } from "./todo-form";
import { Todo } from "../db/schema";

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  );
}