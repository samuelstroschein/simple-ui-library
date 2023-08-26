import { context } from "esbuild";

const ctx = await context({
  entryPoints: ["src/main.ts"],
  outdir: "dist",
  bundle: true,
  minify: false,
  plugins: [
    {
      name: "logger",
      setup: ({ onEnd }) => onEnd(() => console.info("🎉 changes processed")),
    },
  ],
});

// if (process.env.WATCH) {
await ctx.watch({});
console.info("👀 watching for changes...");
// } else {
//   await ctx.rebuild();
//   console.info("✅ build complete");
//   await ctx.dispose();
// }
