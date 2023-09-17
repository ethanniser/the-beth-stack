import { BETH_GLOBAL } from "../shared/global";

const swapScript = `
  <script>
$RC = function(newId, oldId) {
    let newContentTemplate = document.querySelector(\`template[id="\${newId}"][data-replace]\`);
    let oldFallbackDiv = document.querySelector(\`div[id="\${oldId}"][data-fallback]\`);

    if (!newContentTemplate || !oldFallbackDiv) return;

    let fragment = document.createDocumentFragment();
    while (newContentTemplate.content.firstChild) {
        fragment.appendChild(newContentTemplate.content.firstChild);
    }
    
    // Replace the entire oldFallbackDiv with the new content
    oldFallbackDiv.parentNode.replaceChild(fragment, oldFallbackDiv);

    // Remove the newContentTemplate
    newContentTemplate.remove();
};

  </script>
`;

export async function Suspense({
  fallback,
  children,
}: {
  fallback: JSX.Element;
  children: JSX.Element | JSX.Element[];
}): Promise<string> {
  if (!Array.isArray(children))
    throw new Error("children isnt array (shouldnt be possible)");

  const hasAnyUnresolvedPromiseChildren = children.reduce(
    (acc, child) => acc || Bun.peek.status(child) !== "fulfilled",
    false
  );

  if (!hasAnyUnresolvedPromiseChildren) {
    return children.join("");
  }

  const suspended = Promise.all(children);
  suspended.then((childrenContent) => {
    setTimeout(() => {
      const id = BETH_GLOBAL.dismissChild(children);
      if (!id) {
        BETH_GLOBAL.streamController?.error("Suspense children not found");
        throw new Error("Suspense children not found");
      }
      const content = childrenContent.join("");

      let withScript = `
        <template id="N:${id}" data-replace>
            ${content}
        </template>
        <script>
            $RC("N:${id}", "B:${id}");
        </script>
    `;

      if (!BETH_GLOBAL.sentFirstChunk) {
        withScript = swapScript + withScript;
        BETH_GLOBAL.sentFirstChunk = true;
      }

      BETH_GLOBAL.streamController?.enqueue(withScript);

      BETH_GLOBAL.checkIfEndAndClose();
    }, 0);
  });
  return fallback;
}
