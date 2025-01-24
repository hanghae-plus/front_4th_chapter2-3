import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import * as path from "node:path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@app": path.resolve(__dirname, "src/app"),
      "@widgets": path.resolve(__dirname, "src/widgets"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@entities": path.resolve(__dirname, "src/entities"),
      "@features": path.resolve(__dirname, "src/features"),
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
  server: {
    proxy: {
      "/api": {
        // target: 'https://jsonplaceholder.typicode.com',
        target: "https://dummyjson.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
