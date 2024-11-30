import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy: {
      "/api": {
        target: "https://rush-construction-backend.onrender.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
// vite.config.js

/*  npm install vite-plugin-eslint --save-dev
 very imp for login type error*/
