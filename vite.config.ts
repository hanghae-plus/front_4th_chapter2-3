import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
  resolve: {
    alias: [
      { find: "@shared", replacement: "/src/shared" },
      { find: "@app", replacement: "/src/app" },
      { find: "@entities", replacement: "/src/entities" },
      { find: "@features", replacement: "/src/features" },
      { find: "@widgets", replacement: "/src/widgets" },
      { find: "@pages", replacement: "/src/pages" },
    ],
  },
})
