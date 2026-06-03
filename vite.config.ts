/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue(), tailwindcss(), dts({ tsconfigPath: "./tsconfig.app.json" })],
  test: {
    globals: true,
    environment: "jsdom",
  },
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "YourDesignSystem",
      fileName: "index",
    },
    rollupOptions: {
      // Don't bundle peer deps into the library:
      external: ["vue", "@headlessui/vue", "@headlessui-float/vue", "@phosphor-icons/vue"],
      output: { globals: { vue: "Vue" } },
    },
  },
});