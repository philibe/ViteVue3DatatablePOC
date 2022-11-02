import path from "path";
import { defineConfig } from "vite";
//import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import vue from "@vitejs/plugin-vue";

import { createHtmlPlugin } from "vite-plugin-html";

console.log(path.basename(path.resolve(__dirname)));

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      // not mandatory
      {
        find: "jquery",
        replacement: path.resolve(
          __dirname,
          "node_modules/jquery/dist/jquery.min.js"
        ),
      },
      // not mandatory, only to force min.js
      {
        find: "datatables.net",
        replacement: path.resolve(
          __dirname,
          "node_modules/datatables.net/js/jquery.dataTables.min.js"
        ),
      },
      {
        find: "datatables.net-css",
        replacement: path.resolve(
          __dirname,
          "node_modules/datatables.net-dt/css/jquery.dataTables.min.css"
        ),
      },
    ],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  plugins: [
    vue(),
    createHtmlPlugin({
      inject: {
        data: {
          title: "DataTable.net with ViteJS and VueJs",
        },
      },
    }),
  ],
  base: "",
  build: {},
});
