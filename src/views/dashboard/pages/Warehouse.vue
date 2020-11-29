<template>
  <v-container class="pa-10" fluid>
    <v-row class="ml-7" style="width: 96%">
      <v-col cols="12">
        <v-card>
          <v-col cols="12">
            <v-card class="ml-10 mr-10 mt-10 mb-10">
              <v-data-table
                :headers="headers"
                :items="warehouses"
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
                    <b>Warehouse ID : </b> {{ item.id }} <br />
                    <b>Name : </b> {{ item.warehouse_name }}<br />
                    <b>Loction : </b> {{ item.warehouse_location }}<br />
                    <b>Quantity : </b> {{ item.spacification }}<br />
                  </td>
                </template> -->
                <template v-slot:top>
                  <v-toolbar elevation="2" style="background: #f5f5f5">
                    <v-toolbar-title
                      style="margin-left: -14px"
                      class="mt-2 mb-2 ml-2"
                      >Warehouse Details
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <v-switch
                      v-model="singleExpand"
                      label="Single expand"
                      class="mt-5"
                    ></v-switch> -->

                    <v-btn
                      class="ml-5"
                      color="primary"
                      float-right
                      @click="newwarehouse"
                    >
                      <v-icon color="white">mdi-plus</v-icon>Add Warehouse
                    </v-btn>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editwarehouse(item)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon small @click="deletewarehouse(item)"
                    >mdi-delete</v-icon
                  >
                </template>

                <template v-slot:item.details="{ item }">
                  <v-btn @click="viewDetails(item)" text> Details </v-btn>
                </template>
              </v-data-table>
              <!-- Add warehouse dialog -->
              <v-dialog v-model="addwarehouse" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Add Warehouse</span>
                  </v-card-title>

                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          outlined
                          dense
                          :rules="[v => !!v || 'Warehouse Name is required']"
                          v-model="warehouse_name"
                          label="Warehouse Name"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          outlined
                          dense
                           :rules="[v => !!v || 'Warehouse Location is required']"
                          v-model="warehouse_location"
                          label="Location"
                        ></v-text-field>
                      </v-col>
                      <!-- <v-col cols="12">
                        <v-text-field
                          outlined
                          dense
                          v-model="spacification"
                          label="Spacification"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          outlined
                          dense
                          v-model="quantity"
                          label="Quantity"
                        ></v-text-field>
                      </v-col> -->
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="confirm"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <!-- Edit Warehouse Dialog -->
              <v-dialog v-model="editwarehousedialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Edit Warehouse Information </span>
                  </v-card-title>

                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          outlined
                          dense
                          v-model="editedItem.warehouse_name"
                          label="Warehouse Name"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          outlined
                          dense
                          v-model="editedItem.warehouse_location"
                          label="Location"
                        ></v-text-field>
                      </v-col>
                      <!-- <v-col cols="12">
                        <v-text-field
                          outlined
                          dense
                          v-model="editedItem.spacification"
                          label="Spacification"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          outlined
                          dense
                          v-model="editedItem.quantity"
                          label="Quantity"
                        ></v-text-field>
                      </v-col> -->
                    </v-row>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" text @click="close">Cancel</v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="confirmwarehouseedit"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card>
          </v-col>
        </v-card>
      </v-col>
    </v-row>

    <!-- This Table is for Shop Details -->
    <v-row class="ml-7" style="width: 96%">
      <v-col cols="12">
        <v-card>
          <v-col cols="12">
            <v-card class="ml-10 mr-10 mt-10 mb-10">
              <v-data-table
                :headers="headershop"
                :items="shops"
                sort-by="id"
                class="elevation-1"
                style="background: #f5f5f5; font-size: 10em"
              >
                <!-- <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    <b>Shop ID : </b> {{ item.id }} <br />
                    <b>Name : </b> {{ item.name }}<br />
                    <b>Loction : </b> {{ item.location }}<br />
                    <b>Quantity : </b> {{ item.spacification }}<br />
                  </td>
                </template> -->

                <template v-slot:top>
                  <v-toolbar elevation="2" style="background: #f5f5f5">
                    <v-toolbar-title
                      style="margin-left: -14px"
                      class="mt-2 mb-2 ml-2"
                      >Shop Details
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <v-switch
                      v-model="singleExpand2"
                      label="Single expand"
                      class="mt-5"
                    ></v-switch> -->

                    <v-btn
                      class="ml-5"
                      color="primary"
                      float-right
                      @click="newShoup"
                    >
                      <v-icon color="white">mdi-plus</v-icon>Add Shop
                    </v-btn>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editshopItem(item)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon small @click="deleteshop(item)">mdi-delete</v-icon>
                </template>
                <template v-slot:item.shopdetails="{ item }">
                  <v-btn @click="viewShopDetails(item)" text> Details </v-btn>
                </template>
              </v-data-table>
              <!-- This dialog is for Create Shop -->
              <v-dialog v-model="addshoupialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Add Shop</span>
                  </v-card-title>

                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          outlined
                          dense
                            :rules="[v => !!v || 'Shop Name is required']"
                          v-model="shop_name"
                          label="Shop Name"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          outlined
                          dense
                            :rules="[v => !!v || 'Shop Location is required']"
                          v-model="shop_location"
                          label="Location"
                        ></v-text-field>
                      </v-col>
                      <!-- <v-col cols="12">
                        <v-text-field
                          outlined
                          dense
                          v-model="spacification"
                          label="Spacification"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          outlined
                          dense
                          v-model="quantity"
                          label="Quantity"
                        ></v-text-field>
                      </v-col> -->
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="confirmshop"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <v-dialog v-model="editshopdialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Edit Shop Information</span>
                  </v-card-title>

                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          outlined
                          dense
                          v-model="editedshopItem.shop_name"
                          label="Shop Name"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          outlined
                          dense
                          v-model="editedshopItem.shop_location"
                          label="Location"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red" text @click="closeeditdialog"
                        >Cancel</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="confirmshopedit"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card>
          </v-col>
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
    editshopdialog: false,
    addwarehouse: false,
    editwarehousedialog: false,
    addshoupialog: false,
    warehouse_name: "",
    warehouse_location: "",
    shop_location: "",
    shop_location: "",
    snackbar: "",

    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "warehouse_name",
      },
      { text: "Location", value: "warehouse_location" },
      //{ text: "Quantity", value: "quantity" },
      { text: "", value: "details", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
      // { text: "", value: "data-table-expand" },
    ],

    headershop: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "shop_name",
      },
      { text: "Location", value: "shop_location" },
      //{ text: "Quantity", value: "quantity" },
      { text: "", value: "shopdetails", sortable: false },

      { text: "Actions", value: "actions", sortable: false },
    ],

    shops: [],
    warehouses: [],
    contact: {},
    shopobject: {},
    editedIndex: -1,
    editedItem: {
      warehouse_name: "",
      warehouse_location: "",
    },
    defaultItem: {
      warehouse_name: "",
      warehouse_location: "",
    },

    editedshopItem: {
      shop_name: "",
      shop_location: "",
    },

    defaultshopItem: {
      shop_name: "",
      shop_location: "",
    },
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialog2(val) {
      val || this.close();
    },
  },
  methods: {
    initialize() {
      axios.get("productdetails/warehouses/").then((response) => {
        this.warehouses = response.data.data;
        console.log("this array for warehose", this.warehouses);
      });
    },

    newwarehouse() {
      this.addwarehouse = true;
    },
    confirm() {
      // This api will call after add warehouse information
      axios
        .post("productdetails/create_warehouse/", {
          warehouse_name: this.warehouse_name,
          warehouse_location: this.warehouse_location,
        })
        .then((response) => {
          if (response.data.success) {
            this.warehouses.push(response.data.data);
            this.close();
            this.text = response.data.message;
            this.color = "success";
            this.snackbar = true;
          }
        });
    },

    editwarehouse(item) {
      this.editedItem = item;
      this.editwarehousedialog = true;
    },

    confirmwarehouseedit(item) {
      axios
        .post(
          `productdetails/update_warehouse/${this.editedItem.id}/`,
          this.editedItem
        )
        .then((response) => {
          this.editwarehousedialog = false;
         this.text = response.data.message;
            this.color = "success";
            this.snackbar = true;
        });
    },

    deletewarehouse(item) {
      if (confirm("Do you really want to delete?")) {
        axios
          .post(`productdetails/delete_warehouse/${item.id}/`)
          .then((response) => {
            this.warehouses = this.warehouses.filter(
              (contact) => contact.id !== item.id
            );
            this.text = "Your Warehouse Deleted successfully !";
            this.snackbar = true;
          });
      }
    },

    newShoup() {
      this.addshoupialog = true;
    },

    getshopinfo() {
      axios.get("productdetails/shops/").then((response) => {
        this.shops = response.data.data;
        console.log("this array for warehose", this.shops);
      });
    },

    confirmshop() {
      axios
        .post("productdetails/create_shop/", {
          shop_name: this.shop_name,
          shop_location: this.shop_location,
        })
        .then((response) => {
          if (response.data.success) {
            this.shops.push(response.data.data);
            this.close();
          this.text = response.data.message;
            this.color = "success";
            this.snackbar = true;
          }
        });
    },

    editshopItem(item) {
      this.editedshopItem = item;
      this.editshopdialog = true;
    },

    confirmshopedit(item) {
      axios
        .post(
          `productdetails/update_shop/${this.editedshopItem.id}/`,
          this.editedshopItem
        )
        .then((response) => {
          this.editshopdialog = false;
          this.text = response.data.message;
            this.color = "success";
            this.snackbar = true;
        });
    },

    deleteshop(item) {
      if (confirm("Do you really want to delete?")) {
        axios
          .post(`productdetails/delete_shop/${item.id}/`)
          .then((response) => {
            this.shops = this.shops.filter(
              (shopobject) => shopobject.id !== item.id
            );
            this.text = "Shop  deleted successfully !";
            this.snackbar = true;
          });
      }
    },
    close() {
      this.editapidialog = false;
      this.addwarehouse = false;
      this.editwarehousedialog = false;
      this.addshoupialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeeditdialog() {
      this.editshopdialog = false;
      this.$nextTick(() => {
        this.editedshopItem = Object.assign({}, this.editedshopItem);
        this.editedshopItem = -1;
      });
    },

    viewDetails(item) {
      let routeData = this.$router.resolve({
        name: `/dashboard/pages/warehousedetails/${item.id}`,
      });
      routeData.href = `/dashboard/pages/warehousedetails/?id=${item.id}`;
      window.open(routeData.href, "_blank");
    },
    viewShopDetails(item) {
      let routeData = this.$router.resolve({
        name: `/dashboard/pages/shopdetails/${item.id}`,
      });
      routeData.href = `/dashboard/pages/shopdetails/?id=${item.id}`;
      window.open(routeData.href, "_blank");
    },
  },
  mounted() {
    this.initialize();
    this.getshopinfo();
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