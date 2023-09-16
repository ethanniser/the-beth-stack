import { BETH_GLOBAL } from "./global";

export async function Suspense({
  fallback,
  children,
}: {
  fallback: JSX.Element;
  children: JSX.Element | JSX.Element[];
}): Promise<string> {
  if (!Array.isArray(children))
    throw new Error("children isnt array (shouldnt be possible)");

  const id = BETH_GLOBAL.dismissChild(children);

  if (!id) throw new Error("Suspense children not found");

  const suspended = Array.isArray(children) ? Promise.all(children) : children;
  suspended.then((childrenContent) => {
    const content = childrenContent.join("");

    const withScript =
      `<div hidden id="$BETH-CONTENT-${id}">` +
      content +
      "</div>" +
      `
        <script>
          const fallback = document.getElementById("$BETH-FALLBACK-${id}");
          const content = document.getElementById("$BETH-CONTENT-${id}");
          if (fallback && content) {
            while (content.firstChild) {
                fallback.parentNode.insertBefore(content.firstChild, fallback);
            }
            fallback.remove();
            content.remove();
          }
        </script>
      `;

    const controller = BETH_GLOBAL.streamController;

    if (!controller)
      throw new Error("controller not found (shouldnt be possible)");

    console.log(
      "is controller a ReadableStreamDefaultController?",
      controller instanceof ReadableStreamDefaultController
    );
    controller.enqueue(withScript);

    BETH_GLOBAL.checkIfEnd();
  });
  return fallback;
}
