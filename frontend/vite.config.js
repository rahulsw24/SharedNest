import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        // Do not rewrite unless your backend API doesn't include `/api` in its paths
        // Removes "/api" if necessary
      },
    },
  },
});
