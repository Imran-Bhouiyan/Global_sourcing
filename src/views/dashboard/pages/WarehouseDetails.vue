<template>
  <v-container fluid class="mb-10">
    <v-row class="ml-7" style="width: 96%">
      <v-col cols="12">
        <v-card>
          <v-col cols="12">
            <v-card class="ml-10 mr-10 mt-10 mb-10">
              <v-data-table
                :headers="headers"
                :items="productinfo"
                style="background: #f5f5f5"
                :search="search"
                item-key="product_id"
                flat
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                show-expand
                class="elevation-1"
                
              >
                <template v-slot:top>
                  <v-toolbar elevation="2" style="background: #f5f5f5">
                    <v-toolbar-title
                      style="margin-left: -14px"
                      class="mt-2 mb-2"
                      >WareHouse Details
                    </v-toolbar-title>

                    <v-row>
                      <v-col
                        cols="12"
                        class="pa-10 mx-10 mt-7 d-flex flex-row justify-space-around"
                      >
                        <!-- <p class="mb-0">Warehouse ID: {{ orderInfo.id }}</p> -->
                        <p class="mb-0">
                          Warehouse Name : {{ warehouseinfo.warehouse_name }}
                        </p>
                        <p class="mb-0">
                          Warehouse Location :
                          {{ warehouseinfo.warehouse_location }}
                        </p>
                        <!-- <p class="mb-0">
                          Total Quantity: {{ orderInfo.user_id }}
                        </p> -->

                        <v-switch
                          v-model="singleExpand"
                          label="Single expand"
                        ></v-switch>
                      </v-col>

                      <v-spacer></v-spacer>
                   
                    </v-row>

                  </v-toolbar>
                </template>


                <template v-slot:expanded-item="{ headers, item}">
                  <td
                    :colspan="headers.length"
                    v-for="(product, index) in item.specifications"
                    :key="index"
                     class="d-flex flex-row"
                  >
                   <v-col
                        cols="12"
                        class=" d-flex flex-row justify-space-around"
                      >
                  <b> {{index+1 }} .</b>
                      <b>Color : </b> {{ product.color }} <br />
                      <b> Size : </b> {{ product.size }}<br />
                      <b>Quantity : </b> {{ product.quantity }}<br />
                      <b> Weight : </b> {{ product.weight }}<br />
                   </v-col>
                  </td>
                </template>


              </v-data-table>
            </v-card>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    menu: false,
    menu2: false,
    dialog: false,
   

    singleExpand: false,
    search: "",
    headers: [
      { text: "Product Id", value: "product_id", sortable: false },
      { text: "Product Name", value: "product_title", sortable: false },
      { text: "Total Quantity", value: "total_quantity", sortable: false },
      { text: "Perchace Price", value: "unit_price", sortable: false },
      { text: "Selling Price", value: "product_price", sortable: false },
      { text: "", value: "data-table-expand" },
    ],
  
    warehouseinfo: {},
    productinfo: [],
    specificationinfo: [],
  }),

  methods: {
    initialize() {
      axios
        .get(`productdetails/warehouse_products/${this.$route.query.id}/`)
        .then((response) => {
          this.warehouseinfo = response.data.data;
          this.productinfo = response.data.data.products;
          this.specificationinfo =
            response.data.data.products[0].specifications;
        });
    },
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


