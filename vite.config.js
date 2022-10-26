"use strict";
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";

const resolve = (dir) => path.resolve(__dirname, dir);

export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve("./src"),
      "~": resolve("./src/assets"),
      "#": resolve("./src/components"),
      "%": resolve("./src/views"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
});
