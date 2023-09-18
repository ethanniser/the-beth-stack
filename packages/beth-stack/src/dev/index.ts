export function liveReloadScript({
  port = 3001,
  debounceTime = 100,
}: {
  port?: number;
  debounceTime?: number;
} = {}): string {
  return `
        let reloadTimeout;
        (function () {
          let socket = new WebSocket("ws://localhost:${port}/ws");

          socket.onopen = function(e) {
            console.log("connected")
          };


          socket.onmessage = function(event) {
            console.log("event", event.data)
            // Clear any existing reload timeout
            clearTimeout(reloadTimeout);

            // Set a new reload timeout
            reloadTimeout = setTimeout(() => {
              location.reload();
            }, ${debounceTime});  // 50ms debounce time
          };

          socket.onclose = function(event) {
            console.log("closed");
          };

          socket.onerror = function(error) {
            console.log("error: " + error.message);
          };
        })();
        `;
}
