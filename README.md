Here is an answer to make datatable.net to work with Vite and VueJs (and its plugins `select`, `RowGroup`, `Buttons`,...)

https://stackoverflow.com/questions/71075605/implementing-datatables-net-with-vite-and-vue-how-to-fix-datatable-is/74039112#74039112

Before, do `yarn create vite`.

`import` for "jquery" and "datatable.net" have to be typed with "jquery" and "datatable.net" and not typed with "min.js". Look at the source of `jquery.dataTables.js`: it expects some of form of name.


`src/main.js`
```
import jQuery from "jquery";
import $ from "jquery";

import DataTable from "datatables.net";
DataTable(window, $);

// 'select ' can be disabled
import select from "datatables.net-select/js/dataTables.select.min.js";
select(window, $);

// 'RowGroup ' can be disabled
import RowGroup from "datatables.net-rowgroup/js/dataTables.rowGroup.min.js";
RowGroup(window, $);


// 'Buttons' can be disabled
import Buttons from "datatables.net-buttons/js/dataTables.buttons.min.js";
Buttons(window, $);

import b1 from "datatables.net-buttons/js/buttons.colVis.min.js";
b1(window, $);

import b2 from "datatables.net-buttons/js/buttons.print.min.js";
b2(window, $);

import b3 from "datatables.net-buttons/js/buttons.html5.min.js";
b3(window, $);
// end of 'Buttons part

import "datatables.net-css";

import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";

import "@/style.css";
import App from "@/App.vue";

createApp(App).mount("#app");

```
`vite.config.js`
```
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
```

`src/App.vue`
```
<template>
  <div>
    <h2>Implement jQuery DataTable in Vue Js</h2>
    <table class="table" id="datatable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Title</th>
          <th>Product Price</th>
          <th>Created On</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.userId }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.completed }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  mounted() {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
      $("#datatable").DataTable({
        data: response.data,
        columns: [
          { data: "userId" },
          { data: "id" },
          { data: "title" },
          { data: "completed" },
        ],

        pageLength: 10,
        lengthMenu: [
          [5, 10, 25, 50],
          [5, 10, 25, 50],
        ],

        // 'rowGroup' can be disabled
        // 'rowGroup' needs datatables.net-rowgroup/js/dataTables.rowGroup.min.js

        rowGroup: { dataSrc: "userId" },

        // 'select' can be disabled
        // 'select' needs datatables.net-select/js/dataTables.select.min.js
        select: "single", // "single" or "multi" or "true"

        // 'buttons' can be disabled
        // 'buttons' needs
        // - datatables.net-buttons/js/dataTables.buttons.min.js and buttons.colVis.min.js and buttons.print.min.js and buttons.html5.min.js
        // - dom :"B"

        dom: "Blfrtip", //'Blfrtip' for "B"uttons copy, lfrtip options byr défaut
        buttons: [
          "copyHtml5",

          "csvHtml5",
          "print",
          // start of example of custom button
          {
            text: "Remove rowGroup",
            action: function (e, dt, node, config) {
              dt.rowGroup().dataSrc("").draw();
            },
          },
          {
            text: "Add rowGroup",
            action: function (e, dt, node, config) {
              dt.rowGroup().dataSrc("userId").draw();
            },
          },
          {
            text: "Single Select",
            action: function (e, dt, node, config) {
              dt.select.style("single").draw();
            },
          },
          {
            text: "Multi select",
            action: function (e, dt, node, config) {
              dt.select.style("multi").draw();
            },
          },
          // end of example of custom button
        ],
      });
    });
  },
  data: function () {
    return {
      products: [],
    };
  },
};
</script>
```

`package.json`

(Don't forget `yarn install`)

```
{
    "private": true,
    "name": "vite-project",
    "version": "0.0.0",
    "scripts": {
        "build": "vite build",
        "dev": "vite --host",
        "devlocal": "vite",
        "format": "yarn run prettier && yarn run lint",
        "format:packagejson": "npx prettier-package-json --tab-width 2 --write",
        "lint": "eslint --ext .js,.vue --ignore-path .gitignore --fix src   --fix *.js --no-error-on-unmatched-pattern",
        "prettier": "npx  prettier  --write src/*.?js src/*.html index.html --no-error-on-unmatched-pattern",
        "preview": "vite preview"
    },
    "dependencies": {
        "@babel/core": "^7.19.6",
        "@babel/eslint-parser": "^7.19.1",
        "@originjs/vite-plugin-commonjs": "^1.0.3",
        "@popperjs/core": "^2.11.6",
        "@vue/eslint-config-prettier": "^7.0.0",
        "axios": "^1.1.2",
        "bootstrap": "^5.2.2",
        "buffer": "^6.0.3",
        "datatables.net": "^1.11.4",
        "datatables.net-buttons": "^2.2.2",
        "datatables.net-dt": "^1.11.4",
        "datatables.net-rowgroup": "^1.2.0",
        "datatables.net-select": "^1.4.0",
        "eslint": "^8.25.0",
        "eslint-config-prettier": "^8.5.0",
        "eslint-plugin-vue": "^9.6.0",
        "jquery": "^3.6.1",
        "prettier": "^2.7.1",
        "process": "^0.11.10",
        "vite-plugin-html": "^3.2.0",
        "vue": "^3.2.37"
    },
    "devDependencies": {
        "@vitejs/plugin-vue": "^3.1.0",
        "eslint-plugin-html": "^7.1.0",
        "eslint-plugin-prettier": "^4.2.1",
        "vite": "^3.1.0"
    },
    "compilerOptions": {
        "target": "es2015",
        "types": [
            "vite/client"
        ]
    },
    "eslintConfig": {
        "root": true,
        "env": {
            "node": true,
            "commonjs": true,
            "browser": true,
            "es6": true
        },
        "parserOptions": {
            "sourceType": "module"
        },
        "plugins": [
            "vue",
            "html",
            "prettier"
        ],
        "rules": {
            "no-unused-vars": "off"
        },
        "extends": [
            "plugin:vue/vue3-essential",
            "eslint:recommended",
            "@vue/prettier"
        ]
    }
}
```
`index.html`
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%- title %></title>
  </head>
  <body>
    <div id="app"></div>

    <script type="module" src="/src/main.js"></script>
  </body>
</html>

```

