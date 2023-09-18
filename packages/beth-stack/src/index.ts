export const htmxExtensionScript = `
        (function () {
          htmx.defineExtension("revalidate", {
            onEvent: function (name, evt) {
              if (name === "htmx:configRequest") {
                var revalidationTag = evt.srcElement.getAttribute("hx-revalidate");
                console.log("revalidationTag", revalidationTag) 
                if (revalidationTag) {
                  // Split the string into an array based on comma and trim spaces
                  var tags = revalidationTag.split(',').map(function(tag) {
                      return tag.trim();
                  });

                  // Convert array to JSON and set it to the header
                  evt.detail.headers["HX-Revalidate"] = JSON.stringify(tags);
                }
              }
            },
          });
        })();
        `;
