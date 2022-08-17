/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import ssg from "./etc/plugins/vite-plugin-ssg/index.js";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    mdx(),
    ssg({
      autoDiscoverUrls: [
        /src\/main\/(.*)\/index\.page\.[tj]sx?$/,
      ],
      urls: {
        "/index": { context: { deneme: 1 } },
        "/index_new": { context: { new: true }, source: "/index" },
      },
    }),
  ],
  build: {
    // minify: false,
    emptyOutDir: false,
  },
  // optimizeDeps: {
  //   include: [
  //     "cross-fetch",
  //   ],
  // },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
});
