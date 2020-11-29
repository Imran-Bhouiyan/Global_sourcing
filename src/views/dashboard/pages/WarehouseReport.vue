<template>
  <v-container class="pa-5 mb-10" fluid>
    <v-row style="width: 100%">
      <v-col cols="12">
        <v-card style="background: #f5f5f5">
          <v-card-title class="pt-10 pl-10"
            >Warehouse Report by Product
            <v-spacer></v-spacer>
            <!-- <v-btn @click="download" text>
              <v-icon class="pr-5" large color="black">mdi-download </v-icon>
            </v-btn> -->
            <v-btn text @click="printData">
              <v-icon class="pr-5" large color="black">mdi-printer </v-icon>
            </v-btn>
          </v-card-title>
          <v-card style="background: #f5f5f5">
            <v-row>
              <v-col cols="4">
                <v-tabs
                  v-model="tab"
                  background-color="transparent"
                  color="primary"
                  grow
                >
                  <v-tab v-for="item in items" :key="item">
                    {{ item }}
                  </v-tab>
                </v-tabs>
              </v-col>

              <v-col cols="8" class="d-flex flex-row">
                <v-spacer></v-spacer>
                <v-col cols="2">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="From Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        dense
                        style="padding: 0px !important"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="2">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateto"
                        label="To Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        dense
                        style="padding: 0px !important"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateto"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <!-- <v-btn color="white" @click="fromdate">
                  From Date
                  <v-icon color="black" right>mdi-calendar-month </v-icon>
                </v-btn>

                <v-btn color="white" @click="todate">
                  To Date
                  <v-icon color="black" right>mdi-calendar-month </v-icon>
                </v-btn> -->

                <v-btn text @click="seereport" class="mr-2">
                  Full Report
                </v-btn>
              </v-col>
            </v-row>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card>
                  <v-toolbar elevation="2" style="background: #f5f5f5">
                    <v-toolbar-title
                      style="margin-left: -14px"
                      class="mt-2 mb-2 ml-2"
                    >
                      Daily Warehouse Report
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <div class="pr-5 pb-5 pt-5">
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        filled
                        rounded
                        dense
                        hide-details
                      ></v-text-field>
                    </div>
                  </v-toolbar>
                </v-card>

                <div id="dataapp">
                  <v-data-table
                    :headers="headers"
                    :items="Sales"
                    :search="search"
                    item-key="id"
                    class="elevation-1"
                    style="background: #f5f5f5; font-size: 10em"
                    hide-default-footer
                    disable-pagination
                  >
                    <template slot="body.append">
                      <tr class="text-h4 ml-0">
                        <th class="h4">Totals</th>

                        <th class="h6">{{ sumField("") }}</th>
                        <th class="h6">{{ sumField("") }}</th>
                        <th class="h6">{{ sumField("") }}</th>
                        <th class="h6">{{ sumField("") }}</th>
                        <th class="h6">{{ sumField("") }}</th>
                        <th class="h6">{{ sumField("") }}</th>
                        <th class="h6">{{ sumField("debit") }}</th>
                        <th class="h6">{{ sumField("credit") }}</th>
                        <th class="h6">{{ sumField("quantity") }}</th>
                        <th class="h6">{{ sumField("requested") }}</th>
                      </tr>
                    </template>

                    <template #item.spacification="{ item }"
                      >{{ item.product_color }} ,
                      {{ item.product_size }}</template
                    >
                    <!-- <template #item.warehouse="{ item }">{{ item.warehouse_name }} , {{ item.shop_name }}</template> -->
                  </v-data-table>
                </div>
              </v-tab-item>
              <v-tab-item>
                <v-data-table
                  :headers="headersweek"
                  :items="Salesweek"
                  :search="searchweek"
                  sort-by="id"
                  class="elevation-1"
                  style="background: #f5f5f5; font-size: 10em"
                >
                  <!-- 
                      :single-expand="singleExpand"
                :expanded.sync="expanded"
                show-expand
                  <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    <b>brand ID : </b> {{ item.id }} <br />
                    <b>Name : </b> {{ item.Brand_name }}<br />
                    <b>Loction : </b> {{ item.brand_location }}<br />
                    <b>Quantity : </b> {{ item.spacification }}<br />
                  </td>
                </template> -->
                  <template v-slot:top>
                    <v-toolbar elevation="2" style="background: #f5f5f5">
                      <v-toolbar-title
                        style="margin-left: -14px"
                        class="mt-2 mb-2 ml-2"
                      >
                        Weekly Warehouse Report
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <div class="pr-5 pb-5 pt-5">
                        <v-text-field
                          v-model="searchweek"
                          append-icon="mdi-magnify"
                          label="Search"
                          filled
                          rounded
                          dense
                          hide-details
                        ></v-text-field>
                      </div>
                      <!-- <v-switch
                      v-model="singleExpand"
                      label="Single expand"
                      class="mt-5"
                    ></v-switch>  v-if="item.Brand_name != 'Individual' "-->
                    </v-toolbar>
                  </template>
                </v-data-table>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" outlined centered color="black">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    snackbar: "",
    date: new Date().toISOString().substr(0, 2),
    menu: false,
    menu2: false,
    search: "",
    searchweek: "",
    headers: [
      {
        text: "Date",
        align: "start",

        value: "date",
      },
      { text: "Product Name", value: "product_name", sortable: false },
      { text: "Specifications", value: "spacification", sortable: false },
      { text: "Variant", value: "variant", sortable: false },
      { text: "Brand", value: "product_brand", sortable: false },
      { text: "Warehouse Name", value: "warehouse_name", sortable: false },
      { text: "Location", value: "warehouse_location", sortable: false },
      { text: "In Quantity", value: "debit", sortable: false },
      { text: "Out Quantity", value: "credit", sortable: false },
      { text: "In Stok", value: "quantity", sortable: false },
      { text: "Requested", value: "requested", sortable: false },
    ],

    headersweek: [
      {
        text: "Date",
        align: "start",

        value: "date",
      },
      { text: "Product Name", value: "product_name", sortable: false },
      { text: "Specifications", value: "spacification", sortable: false },
      { text: "Brand", value: "product_brand", sortable: false },
      { text: "Warehouse Name", value: "warehouse_name", sortable: false },
      { text: "Location", value: "warehouse_location", sortable: false },
      { text: "In Quantity", value: "debit", sortable: false },
      { text: "Out Quantity", value: "credit", sortable: false },
      { text: "In Stok", value: "quantity", sortable: false },
      { text: "Requested", value: "requested", sortable: false },
    ],

    Sales: [],
    contact: {},
    Salesweek: [],

    text: "",
    snackbar: false,
    tab: null,
    items: ["Daily Report", "Weekly Report"],
  }),

  methods: {
    initialize() {
      axios.get("productdetails/warehouse_report/").then((response) => {
        this.Sales = response.data.data;
      });
    },
    sumField(key) {
      // sum data in give key (property)
      return this.Sales.reduce((a, b) => a + (b[key] || 0), 0);
    },

    printData() {
      var divToPrint = document.getElementById("dataapp");
      // var newWin = window.open("");
      // newWin.document.write(divToPrint.outerHTML);
      // newWin.print();

      //newWin.close();

      var style = "<style>";
      style = style + "table {width: 100%;font: 17px Calibri;}";
      style =
        style +
        "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
      style = style + "padding: 2px 3px;text-align: center;}";
      style = style + "</style>";

      var win = window.open("", "", "height=1900,width=1900");
      win.document.write(style); //  add the style.
      win.document.write(divToPrint.outerHTML);
      win.document.close();
      win.print();
    },

    fromdate() {},
    seereport() {},
    todate() {},
  },
  mounted() {
    this.initialize();
  },
};
</script>




<style >
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 1.2rem;
  height: 48px;
}
</style>