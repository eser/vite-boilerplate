import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import ssg from "./etc/plugins/vite-plugin-ssg/index.js";

export default defineConfig({
  plugins: [
    react(),
    mdx(),
    ssg({
      autoDiscoverUrls: [
        /src\/(.*)\/index\.page\.jsx?$/,
      ],
      urls: {
        "/index": { context: { deneme: 1 } },
        "/index_new": { context: { new: true }, source: "/index" },
      },
    }),
  ],
  build: {
    minify: false,
  },
  // optimizeDeps: {
  //   include: [
  //     "cross-fetch",
  //   ],
  // },
});
