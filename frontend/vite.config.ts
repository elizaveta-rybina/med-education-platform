import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "app": path.resolve(__dirname, "./src/app"),
      "components": path.resolve(__dirname, "./src/components"),
      "pages": path.resolve(__dirname, "./src/pages"),
      "data": path.resolve(__dirname, "./src/data"),
      "assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
