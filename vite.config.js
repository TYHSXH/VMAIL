import { defineConfig } from "vite";

export default defineConfig({
  root: "frontend",
  base: "/static/",
  build: {
    manifest: true,
    outDir: "../app",
    emptyOutDir: true,
    assetsDir: "assets",
    target: "es2022",
    rollupOptions: { input: { main: "frontend/index.html", help: "frontend/help.html" } },
  },
});
