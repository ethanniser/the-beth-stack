export function liveReloadScript(port?: number): string {
  return `
        (function () {
          let socket = new WebSocket("ws://localhost:3001/ws");

          socket.onopen = function(e) {
            console.log("connected")
          };

          socket.onmessage = function(event) {
            location.reload();
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
