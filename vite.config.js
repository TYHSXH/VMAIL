import { defineConfig } from "vite";

export default defineConfig({
  root: "frontend",
  base: "/static/",
  build: {
    outDir: "../app",
    emptyOutDir: true,
    assetsDir: "assets",
    target: "es2022",
  },
});
