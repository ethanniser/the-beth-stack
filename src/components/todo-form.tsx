import * as elements from "typed-html";

export function TodoForm() {
  return (
    <form
      class="flex flex-row space-x-3"
      hx-post="/todos"
      hx-swap="beforebegin"
      _="on submit target.reset()"
    >
      <select name="content" class="border border-black">
        <option value="" disabled="true" selected="true">
          Select a Todo
        </option>
        <option value="beth">Learn the BETH stack</option>
        <option value="vim">Learn vim</option>
        <option value="like">Like the video</option>
        <option value="sub">Subscribe to Ethan</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}