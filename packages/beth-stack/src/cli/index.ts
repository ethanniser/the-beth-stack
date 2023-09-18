#!/usr/bin/env bun
import { Elysia } from "elysia";
import { type ElysiaWS } from "elysia/ws";

let wsConnections = new Set<ElysiaWS<any, any>>();

function dispatch() {
  wsConnections.forEach((connection) => {
    console.log("sending refresh");
    connection.send("refresh");
  });
}

const port = process.argv[2] || 3001;

const app = new Elysia()
  .ws("/ws", {
    open(ws) {
      // console.log("open");
      wsConnections.add(ws);
    },
    close(ws) {
      // console.log("close");
      wsConnections.delete(ws);
    },
    // message(ws, message) {
    //   console.log("message", message);
    // },
  })
  .get("/restart", () => {
    // console.log("recieved restart");
    dispatch();
  })
  .listen(port);

console.log(
  `🦊 Livereload running ${app.server?.hostname}:${app.server?.port}`,
);
