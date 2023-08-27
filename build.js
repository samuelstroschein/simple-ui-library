import { context } from "esbuild";

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Library build of the module.
 */
const library = await context({
  entryPoints: ["src/**/*.ts"],
  outdir: "./dist",
  bundle: false,
  minify: isDevelopment === false,
  plugins: [
    {
      name: "logger",
      setup: ({ onEnd }) => onEnd(() => console.info("🎉 changes processed")),
    },
  ],
});

/**
 * Bundled build of the module.
 *
 * To be consumed directly in the browser.
 */
const bundle = await context({
  entryPoints: ["src/index.ts"],
  outdir: "./dist/bundle",
  bundle: true,
  minify: isDevelopment === false,
});

if (isDevelopment) {
  await library.watch({});
  await bundle.watch({});
  console.info("👀 watching for changes...");
} else {
  await library.rebuild();
  await library.dispose();
  console.info("✅ build library complete");
  await bundle.rebuild();
  await bundle.dispose();
  console.info("✅ build bundle complete");
}
