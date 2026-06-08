import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@db": path.resolve(__dirname, "./src/db"),
      "@shared": path.resolve(__dirname, "./src/shared"),
    },
  },
});
