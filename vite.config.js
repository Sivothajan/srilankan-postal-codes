import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import inspect from "vite-plugin-inspect";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "./dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    inspect(),
  ],
});
