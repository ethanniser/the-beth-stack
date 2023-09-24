#!/usr/bin/env bun

await new Promise((res, rej) => {
  Bun.spawn(
    ["git", "clone", "https://github.com/ethanniser/beth-big.git", "."],
    {
      onExit(subprocess, exitCode, signalCode, error) {
        if (exitCode === 0) {
          res(null);
        } else {
          rej(error);
        }
      },
    },
  );
});

await new Promise((res, rej) => {
  Bun.spawn(["bun", "install"], {
    onExit(subprocess, exitCode, signalCode, error) {
      if (exitCode === 0) {
        res(null);
      } else {
        rej(error);
      }
    },
  });
});

console.log("\n\n");
console.log(
  "this cli is extremely new and barebones, contributions are welcome",
);
console.log("https://github.com/ethanniser/the-beth-stack");
console.log("looking for help? open an issue or ask in the discord");
console.log("Ethan's Discord: https://discord.gg/Z3yUtMfkwa");
