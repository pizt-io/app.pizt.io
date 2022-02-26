import { defineConfig } from "vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import WindiCSS from "vite-plugin-windicss";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@core", replacement: path.resolve(__dirname, "src/core") },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "src/constants"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@store", replacement: path.resolve(__dirname, "src/store") },
      { find: "@types", replacement: path.resolve(__dirname, "src/types") },
      { find: "@modules", replacement: path.resolve(__dirname, "src/modules") },
      {
        find: "@styles",
        replacement: path.resolve(__dirname, "src/core/styles"),
      },
      { find: "@use", replacement: path.resolve(__dirname, "src/core/use") },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "src/core/utils"),
      },
    ],
  },
  plugins: [
    vue(),
    WindiCSS(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: [".."],
    },
  },
});
