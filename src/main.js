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
