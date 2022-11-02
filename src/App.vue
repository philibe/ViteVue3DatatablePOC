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
