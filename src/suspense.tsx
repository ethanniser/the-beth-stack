import { BETH_GLOBAL } from "./global";

const swapScript = `
  <script>
  $RC = function(newId, oldId) {
    let newContentDiv = document.getElementById(newId);
    let oldTemplate = document.getElementById(oldId);

    // Check for existence of both elements
    if (!newContentDiv || !oldTemplate) return;

    // Start from the next sibling of the template to find the fallback content
    let currentNode = oldTemplate.nextSibling;

    // Iterate and remove nodes until the <!--/$--> comment is found
    while (currentNode) {
        if (currentNode.nodeType === 8 && currentNode.data === "/$") {
            // Found the ending comment; break out of the loop
            break;
        }
        let nextNode = currentNode.nextSibling;
        currentNode.remove();
        currentNode = nextNode;
    }

    // Insert the new content in the place of the fallback
    oldTemplate.parentNode.insertBefore(newContentDiv, oldTemplate.nextSibling);

    // Remove the old template
    oldTemplate.remove();

    // Unhide the new content
    newContentDiv.removeAttribute('hidden');
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

  if (Bun.peek.status(children) === "fulfilled") {
    return <>{children}</>;
  }

  const suspended = Promise.all(children);
  suspended.then((childrenContent) => {
    const id = BETH_GLOBAL.dismissChild(children);
    if (!id) throw new Error("Suspense children not found");
    const content = childrenContent.join("");

    let withScript = `
        <div hidden id="N:${id}">
            ${content}
        </div>
        <script>
            $RC("N:${id}", "B:${id}");
        </script>
    `;

    if (!BETH_GLOBAL.sentFirstChunk) {
      withScript = swapScript + withScript;
      BETH_GLOBAL.sentFirstChunk = true;
    }

    BETH_GLOBAL.streamController?.enqueue(withScript);

    BETH_GLOBAL.checkIfEnd();
  });
  return fallback;
}
