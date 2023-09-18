const logs = await Bun.build({
  entrypoints: ["./src/cli/index.ts"],
  outdir: "./dist/cli",
  target: "bun",
  // splitting: true,
  // minify: true,
  // external: ["elysia"],
});

if (!logs.success) {
  console.log(logs.logs);
  process.exit(1);
}
