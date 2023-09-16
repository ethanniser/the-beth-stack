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

  const suspended = Array.isArray(children) ? Promise.all(children) : children;
  suspended.then((childrenContent) => {
    const id = BETH_GLOBAL.dismissChild(children);
    console.log("suspense dismissed", BETH_GLOBAL.suspenseMap.size);
    if (!id) throw new Error("Suspense children not found");
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

    BETH_GLOBAL.streamController?.enqueue(withScript);

    BETH_GLOBAL.checkIfEnd();
  });
  return fallback;
}
