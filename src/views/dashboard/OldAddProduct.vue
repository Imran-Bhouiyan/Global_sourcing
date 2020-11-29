<template>
  <v-container fluid class="mb-10">
    <v-row class="ml-7" style="width: 96%">
      <v-col cols="12">
        <v-card>
          <v-tabs color="deep-purple accent-4">
            <v-tab>All Products</v-tab>
            <v-tab>Add Product</v-tab>

            <v-tab-item>
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-card class="mt-10 mb-10" elevation="0">
                      <v-data-table
                        :headers="headers"
                        :items="products"
                        sort-by="id"
                        :search="search"
                        class="elevation-1"
                        style="background: #f5f5f5"
                        :single-expand="singleExpand"
                        :expanded.sync="expanded"
                        show-expand
                        :loading="loading"
                        loading-text="Please wait..."
                      >
                        <template v-slot:expanded-item="{ headers, item }">
                          <td :colspan="headers.length">
                            <b>Product Id: </b> {{ item.id }} <br />
                            <b>Category : </b> {{ item.category }}<br />
                            <b>Sub category: </b> {{ item.sub_category }}<br />
                            <b>Sub Sub category : </b> {{ item.sub_sub_category
                            }}<br />
                            <b>Product Title: </b> {{ item.title }}<br />
                            <b>Product Brand: </b> {{ item.brand }}<br />
                            <b>Old Price : </b> {{ item.old_price }}<br />
                            <b>New Price: </b> {{ item.new_price }} <br />
                            <b>Seller: </b> {{ item.seller_name }}<br />
                            <b>Description : </b> {{ item.description }}<br />
                            <b>Warranty : </b> {{ item.warranty }}<br />
                            <b>Quantity : </b> {{ item.quantity }}<br />
                            <b>Unit : </b> {{ item.unit }}<br />
                            <b>Publicly Shareable: </b> {{ item.properties
                            }}<br />
                            <b>Discount Type : </b> {{ item.discount_type
                            }}<br />
                            <b>Discount Amount: </b> {{ item.discount_amount
                            }}<br />
                            <b>Discount Start Date : </b>
                            {{ item.discount_start_date }}<br />
                            <b>Discount End Date : </b>
                            {{ item.discount_end_date }}<br />
                            <b>Point: </b> {{ item.point }}<br />
                            <b>Point Start Date: </b>
                            {{ item.point_start_date }} <br />
                            <b>Point End Date: </b> {{ item.point_end_date }}
                            <br />
                            <b>Origin: </b> {{ item.origin }}<br />
                            <b>Shipping Country: </b> {{ item.shipping_country
                            }}<br />
                          </td>
                        </template>
                        <template v-slot:top>
                          <v-toolbar elevation="2" style="background: #f5f5f5">
                            <v-toolbar-title
                              style="margin-left: -14px"
                              class="mt-2 mb-2"
                              >All Products</v-toolbar-title
                            >

                            <v-spacer></v-spacer>
                            <div>
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
                            <!-- <v-btn
                              color="primary"
                              dark
                              class="mb-2 mt-2 mr-2 ml-5"
                              @click="adddialog = true"
                            >
                              <v-icon>mdi-plus</v-icon>
                              Add Product
                            </v-btn> -->
                            <v-divider class="mx-4" inset vertical></v-divider>

                            <!-- ADD NEW PRODUCT -->
                            <v-dialog
                              :close-on-content-click="false"
                              v-model="adddialog"
                              scrollable
                              transition="scale-transition"
                              origin="top right"
                              :nudge-left="500"
                              max-width="800px"
                              max-height="650"
                              persistent
                            >
                              <v-card>
                                <v-card-title
                                  justify="center"
                                  class="d-flex flex-row justify-space-between align-center"
                                >
                                  <p class="font-weight-bold" Roboto>
                                    Add New Product
                                  </p>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="red"
                                    class="mb-2"
                                    @click="adddialog = false"
                                  >
                                    Close
                                  </v-btn>
                                </v-card-title>

                                <v-card-text>
                                  <v-form
                                    ref="productForm"
                                    v-model="validForm"
                                    style="background: #f5f5f5"
                                  >
                                    <v-row class="pt-7 px-10">
                                      <v-col cols="12">
                                        <v-radio-group
                                          v-model="addItem.radioGroup"
                                          row
                                        >
                                          <v-radio
                                            v-for="(option, index) in shares"
                                            :key="index"
                                            :label="option"
                                            :value="index == 0 ? true : false"
                                          ></v-radio>
                                        </v-radio-group>
                                      </v-col>

                                      <v-row>
                                        <v-col>
                                          <v-select
                                            v-model="addItem.selectedCatyegory"
                                            :items="category"
                                            :rules="[
                                              (v) =>
                                                !!v || 'category is required',
                                            ]"
                                            required
                                            label="category"
                                            outlined
                                            @change="onSelectCategory"
                                            dense
                                          ></v-select>
                                          <!-- <v-btn
                                  fab
                                  small
                                  dark
                                  class="ml-2"
                                  color="primary"
                                  elevation="2"
                                  @click="dialog1 = true"
                                >
                                  <v-icon>mdi-plus</v-icon>
                                </v-btn> -->
                                        </v-col>
                                        <v-col>
                                          <v-select
                                            v-model="
                                              addItem.selectedSubCatyegory
                                            "
                                            :items="sub_category"
                                            :rules="[
                                              (v) =>
                                                !!v || 'category is required',
                                            ]"
                                            required
                                            label="Sub category"
                                            outlined
                                            @change="onSelectSubCategory"
                                            dense
                                          ></v-select>

                                          <!-- <v-btn
                                  fab
                                  small
                                  dark
                                  class="ml-2"
                                  color="primary"
                                  elevation="2"
                                  @click="dialog2 = true"
                                >
                                  <v-icon>mdi-plus</v-icon>
                                </v-btn> -->
                                        </v-col>
                                        <v-col>
                                          <v-select
                                            v-model="
                                              addItem.selectedSubSubCategory
                                            "
                                            :items="sub_sub_category"
                                            item-text="title"
                                            label="Sub Sub category"
                                            outlined
                                            dense
                                          ></v-select>
                                        </v-col>
                                      </v-row>

                                      <v-row>
                                        <v-col
                                          ><v-text-field
                                            v-model="addItem.title"
                                            label="Product Name"
                                            outlined
                                            dense
                                            required
                                            :rules="[
                                              (v) =>
                                                !!v ||
                                                'Product Title is required',
                                            ]"
                                          ></v-text-field
                                        ></v-col>
                                        <v-col>
                                          <v-select
                                            v-model="addItem.brand"
                                            :items="allBrands"
                                            item-text="Brand_name"
                                            label="Product Brand"
                                            outlined
                                            dense
                                          ></v-select>
                                        </v-col>
                                        <v-col> </v-col>
                                      </v-row>

                                      <!-- <v-col sm="6" md="5" class="d-flex flex-row">
                                <v-select
                                  v-model="selectedCatyegory"
                                  :items="category"
                                  :rules="[
                                    (v) => !!v || 'category is required',
                                  ]"
                                  required
                                  label="category"
                                  outlined
                                  @change="onSelectCategory"
                                  dense
                                ></v-select>

                                <v-btn
                                  fab
                                  small
                                  dark
                                  class="ml-2"
                                  color="primary"
                                  elevation="2"
                                  @click="dialog1 = true"
                                >
                                  <v-icon>mdi-plus</v-icon>
                                </v-btn>
                              </v-col> 

                              <v-spacer> </v-spacer>



                         <v-col sm="6" md="5" class="d-flex flex-row">
                                <v-select
                                  v-model="selectedSubCatyegory"
                                  :items="sub_category"
                                  :rules="[
                                    (v) => !!v || 'category is required',
                                  ]"
                                  required
                                  label="Sub category"
                                  outlined
                                  @change="onSelectSubCategory"
                                  dense
                                ></v-select>

                                <v-btn
                                  fab
                                  small
                                  dark
                                  class="ml-2"
                                  color="primary"
                                  elevation="2"
                                  @click="dialog2 = true"
                                >
                                  <v-icon>mdi-plus</v-icon>
                                </v-btn>
                              </v-col> 

                              <v-col sm="6" md="5" class="pl-3">

                                <v-select
                                  v-model="selectedSubSubCategory"
                                  :items="sub_sub_category"
                                  item-text="title"
                                  label="Sub Sub category"
                                  outlined
                                  dense
                                ></v-select>
                                <v-btn
                                  fab
                                  small
                                  dark
                                  class="ml-2"
                                  color="primary"
                                  elevation="2"
                                  @click="dialog3 = true"
                                >
                                  <v-icon>mdi-plus</v-icon>
                                </v-btn>
                              </v-col> -->

                                      <!-- <v-spacer> </v-spacer>

                              <v-col sm="6" md="5">
                                <v-text-field
                                  v-model="title"
                                  label="Product Name"
                                  outlined
                                  dense
                                  required
                                  :rules="[
                                    (v) => !!v || 'Product Title is required',
                                  ]"
                                ></v-text-field>
                              </v-col> -->

                                      <!-- <v-col sm="6" md="5" class="d-flex flex-row">
                                <v-text-field
                                  v-model="brand"
                                  label="Product Brand"
                                  outlined
                                  dense
                                ></v-text-field>
                                <v-text-field
                                  v-model="purchase_price"
                                  label="Product Purchase Price"
                                  required
                                  type="number"
                                  :rules="[
                                    (v) => !!v || 'Purchase Price is required',
                                  ]"
                                  outlined
                                  dense
                                ></v-text-field>
                              </v-col> -->

                                      <!-- <v-spacer> </v-spacer>

                              <v-col sm="6" md="5">
                                <v-text-field
                                  v-model="price"
                                  label="Product Selling Price"
                                  required
                                  type="number"
                                  :rules="[
                                    (v) => !!v || 'Selling Price is required',
                                  ]"
                                  outlined
                                  dense
                                ></v-text-field>
                              </v-col> -->

                                      <!-- <v-col sm="6" md="5" class="d-flex flex-row">
                                <v-text-field
                                  v-model="brand"
                                  label="Product Brand"
                                  outlined
                                  dense
                                ></v-text-field>
                              </v-col>

                              <v-spacer> </v-spacer>

                              <v-col sm="6" md="5">
                                <v-text-field
                                  v-model="point"
                                  label="Product Point"
                                  outlined
                                  type="number"
                                  dense
                                ></v-text-field>
                              </v-col>

                               <v-col sm="6" md="5">
                                <v-text-field
                                  v-model="origin"
                                  label="Origin Country"
                                  outlined
                                  dense
                                  :rules="[
                                    (v) => !!v || 'Origin Country is required',
                                  ]"
                                ></v-text-field>
                              </v-col>

                              <v-spacer> </v-spacer>
                              <v-col sm="6" md="5">
                                <v-text-field
                                  v-model="shipping"
                                  label="Shipping Country"
                                  outlined
                                  dense
                                  :rules="[
                                    (v) =>
                                      !!v || 'Shipping Country is required',
                                  ]"
                                ></v-text-field>
                              </v-col>

                              <v-col sm="6" md="5">
                                <v-text-field
                                  v-model="discount_type"
                                  label="Discount Type"
                                  outlined
                                  dense
                                ></v-text-field>
                              </v-col>

                              <v-spacer> </v-spacer>
                              <v-col sm="6" md="5">
                                <v-select
                                  dense
                                  v-model="product_unit"
                                  :items="select_val"
                                  label="Product unit type"
                                  :rules="[(v) => !!v || 'Unit is required']"
                                  outlined
                                ></v-select>
                              </v-col>

                              <v-col sm="6" md="5">
                                <v-text-field
                                  v-model="amount"
                                  label="Discount Amount"
                                  outlined
                                  dense
                                  type="number"
                                ></v-text-field>
                              </v-col>

                              <v-spacer> </v-spacer>
                              <v-col sm="6" md="5">
                                <v-text-field
                                  v-model="warranty"
                                  label="Product warranty"
                                  placeholder="Ex: 6 months or 1 year"
                                  outlined
                                  dense
                                ></v-text-field>
                              </v-col>


                              <v-row class="px-10">
                              <v-col sm="6" md="5">
                                <v-menu
                                  v-model="menu"
                                  :close-on-content-click="false"
                                  :nudge-right="0"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="discount_end_date"
                                      label="Discount End Date"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="date"
                                    @input="DiscountEndInput"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>

                              <v-spacer></v-spacer>
                              <v-col sm="6" md="5">
                                <v-menu
                                  v-model="menu2"
                                  :close-on-content-click="false"
                                  :nudge-right="0"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="point_end_date"
                                      label="Point End Date"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="dates"
                                    @input="PointEndInput"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                            </v-row>

                                <v-dialog v-model="dialog1" max-width="500px">
                            <v-card>
                              <v-card-title>
                                <span class="font-weight-bold"
                                  >Add Category</span
                                >
                              </v-card-title>

                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="6" md="12">
                                      <p class="mt-5 ml-3 font-weight-bold">
                                        Category
                                      </p>
                                      <v-text-field
                                        class="mt-5 ml-2"
                                        label="Category"
                                        outlined
                                        v-model="new_category"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>

                              <div class="pb-10">
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="#854FFF" @click="saveCategory"
                                    >Save</v-btn
                                  >
                                  <v-btn color="pink" @click="dialog1 = false"
                                    >Cancel</v-btn
                                  >
                                </v-card-actions>
                              </div>
                            </v-card>
                          </v-dialog>
                          <v-dialog v-model="dialog2" max-width="500px">
                            <v-card>
                              <v-card-title>
                                <span class="font-weight-bold"
                                  >Add Sub category</span
                                >
                              </v-card-title>

                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12">
                                      <p class="mt-5 ml-3 font-weight-bold">
                                        Sub Category
                                      </p>
                                      <v-text-field
                                        class="mt-5 ml-2"
                                        label="Sub Category"
                                        outlined
                                        v-model="new_sub_category"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>

                              <div class="pb-10">
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="#854FFF" @click="AddSubCategory"
                                    >Save</v-btn
                                  >
                                  <v-btn color="pink" @click="dialog2 = false"
                                    >Cancel</v-btn
                                  >
                                </v-card-actions>
                              </div>
                            </v-card>
                          </v-dialog>
                          <v-dialog v-model="dialog3" max-width="500px">
                            <v-card>
                              <v-card-title>
                                <span class="font-weight-bold"
                                  >Sub Sub Category</span
                                >
                              </v-card-title>

                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12">
                                      <p class="mt-5 ml-3 font-weight-bold">
                                        Sub Sub Category
                                      </p>
                                      <v-text-field
                                        class="mt-5 ml-2"
                                        label="Sub Sub Category"
                                        outlined
                                        v-model="new_sub_sub_category"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>

                              <div class="pb-10">
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="#854FFF"
                                    @click="addSubSubCategory"
                                    >Save</v-btn
                                  >
                                  <v-btn color="pink" @click="dialog3 = false"
                                    >Cancel</v-btn
                                  >
                                </v-card-actions>
                              </div>
                            </v-card>
                          </v-dialog>
                        -->

                                      <v-row>
                                        <v-col>
                                          <v-select
                                            v-model="addItem.origin"
                                            label="Manufactured In"
                                            outlined
                                            dense
                                            :items="manufactureCountries"
                                            :rules="[
                                              (v) =>
                                                !!v ||
                                                'Manufactured Country is required',
                                            ]"
                                          ></v-select>
                                        </v-col>
                                        <v-col>
                                          <v-select
                                            v-model="addItem.shipping"
                                            label="Shipping From"
                                            :items="manufactureCountries"
                                            outlined
                                            dense
                                            :rules="[
                                              (v) =>
                                                !!v ||
                                                'Shipping Country is required',
                                            ]"
                                          ></v-select>
                                        </v-col>
                                        <v-col></v-col>
                                      </v-row>
                                    </v-row>

                                    <v-row class="px-7">
                                      <v-col cols="12">
                                        <v-textarea
                                          outlined
                                          name="input-7-4"
                                          dense
                                          label="Product Description"
                                          v-model="addItem.description"
                                          :rules="[
                                            (v) =>
                                              !!v || 'Description is required',
                                          ]"
                                        ></v-textarea>
                                      </v-col>
                                    </v-row>

                                    <v-row class="px-7">
                                      <v-col cols="12">
                                        <v-file-input
                                          color="deep-purple accent-4"
                                          counter
                                          dense
                                          label="Upload image"
                                          multiple
                                          placeholder="Select your images"
                                          prepend-icon="mdi-paperclip"
                                          outlined
                                          :show-size="1000"
                                          v-model="images"
                                          :rules="[
                                            (value) =>
                                              value.length != 0 ||
                                              'Image is required',
                                          ]"
                                          accept="image/png, image/jpeg, image/bmp"
                                        >
                                          <template
                                            v-slot:selection="{ index, text }"
                                          >
                                            <v-chip
                                              v-if="index < 2"
                                              color="deep-purple accent-4"
                                              dark
                                              label
                                              small
                                              >{{ text }}</v-chip
                                            >

                                            <span
                                              v-else-if="index === 2"
                                              class="overline grey--text text--darken-3 mx-2"
                                              >+{{
                                                images.length - 2
                                              }}
                                              File(s)</span
                                            >
                                          </template>
                                        </v-file-input>
                                      </v-col>
                                    </v-row>
                                    <v-row class="px-7">
                                      <v-col cols="12" sm="6" md="6">
                                        <div
                                          class="d-flex flex-row"
                                          v-for="(feature,
                                          index) in addItem.key_features"
                                          :key="index"
                                        >
                                          <v-text-field
                                            v-model="
                                              addItem.key_features[index]
                                            "
                                            label="Product key features"
                                            outlined
                                            dense
                                          ></v-text-field>

                                          <v-btn
                                            icon
                                            color="red"
                                            @click="deleteFeatures(index)"
                                            ><v-icon>mdi-close</v-icon></v-btn
                                          >
                                        </div>
                                        <v-btn
                                          @click="addFeatures"
                                          color="#854FFF"
                                          elevation="0"
                                          >Add Feature</v-btn
                                        >
                                      </v-col>
                                    </v-row>

                                    <div>
                                      <v-card-actions class="">
                                        <v-spacer></v-spacer>
                                        <v-btn
                                          color="red darken-1"
                                          elevation="0"
                                          @click="adddialog = false"
                                        >
                                          Cancel
                                        </v-btn>
                                        <v-btn
                                          color="blue darken-1"
                                          elevation="0"
                                          @click="save"
                                          :disabled="!validForm"
                                        >
                                          Upload
                                        </v-btn>
                                      </v-card-actions>
                                    </div>
                                  </v-form>
                                </v-card-text>
                              </v-card>
                            </v-dialog>

                            <!-- EDIT A PRODUCT -->
                            <v-dialog
                              :close-on-content-click="false"
                              scrollable
                              transition="scale-transition"
                              origin="top right"
                              :nudge-left="500"
                              max-width="800px"
                              max-height="650"
                              persistent
                              v-model="editdialog"
                            >
                              <v-card>
                                <v-card-title
                                  justify="center"
                                  class="d-flex flex-row justify-space-between align-center"
                                >
                                  <p class="font-weight-bold" Roboto>
                                    Edit Product
                                  </p>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="red"
                                    class="mb-2"
                                    @click="editdialog = false"
                                  >
                                    Close
                                  </v-btn>
                                </v-card-title>

                                <v-card-text>
                                  <v-form
                                    ref="productEditForm"
                                    v-model="editProductForm"
                                    style="background: #f5f5f5"
                                  >
                                    <v-row class="pt-7 px-10">
                                      <v-row>
                                        <v-col class="d-flex flex-row">
                                          <p class="font-weight-medium">
                                            Category :
                                            <span class="font-weight-regular">{{
                                              editedItem.category
                                            }}</span>
                                          </p>
                                        </v-col>
                                        <v-col class="d-flex flex-row">
                                          <p class="font-weight-medium">
                                            Sub Category :
                                            <span class="font-weight-regular">{{
                                              editedItem.sub_category
                                            }}</span>
                                          </p>
                                        </v-col>
                                        <v-col class="d-flex flex-row">
                                          <p class="font-weight-medium">
                                            Sub Sub Category :
                                            <span class="font-weight-regular">{{
                                              editedItem.sub_sub_category
                                            }}</span>
                                          </p>
                                        </v-col>
                                      </v-row>

                                      <v-row>
                                        <v-col>
                                          <v-text-field
                                            v-model="editedItem.title"
                                            label="product Name"
                                            outlined
                                            dense
                                            required
                                            :rules="[
                                              (v) =>
                                                !!v ||
                                                'Product Name is required',
                                            ]"
                                          ></v-text-field>
                                        </v-col>
                                        <v-col>
                                          <v-select
                                            v-model="editedItem.brand"
                                            :items="allBrands"
                                            item-text="Brand_name"
                                            label="Product Brand"
                                            outlined
                                            dense
                                          ></v-select>
                                        </v-col>
                                        <v-col> </v-col>
                                      </v-row>

                                      <v-row>
                                        <v-col>
                                          <v-select
                                            v-model="editedItem.origin"
                                            label="Origin Country"
                                            outlined
                                            dense
                                            :items="manufactureCountries"
                                            :rules="[
                                              (v) =>
                                                !!v ||
                                                'Origin country is required',
                                            ]"
                                          ></v-select>
                                        </v-col>
                                        <v-col>
                                          <v-select
                                            v-model="
                                              editedItem.shipping_country
                                            "
                                            label="Shipping From"
                                            :items="manufactureCountries"
                                            outlined
                                            dense
                                            :rules="[
                                              (v) =>
                                                !!v ||
                                                'Shipping country is required',
                                            ]"
                                          ></v-select>
                                        </v-col>
                                        <v-col> </v-col>
                                      </v-row>
                                    </v-row>
                                    <v-row class="px-8">
                                      <v-col cols="12">
                                        <v-textarea
                                          outlined
                                          name="input-7-4"
                                          dense
                                          label="Product Description"
                                          v-model="editedItem.description"
                                          :rules="[
                                            (v) =>
                                              !!v || 'Description is required',
                                          ]"
                                        ></v-textarea>
                                      </v-col>
                                    </v-row>
                                    <v-row class="px-10">
                                      <v-col cols="12" sm="6" md="6">
                                        <div
                                          class="d-flex flex-row"
                                          v-for="(feature,
                                          index) in editedItem.key_features"
                                          :key="index"
                                        >
                                          <v-text-field
                                            v-model="
                                              editedItem.key_features[index]
                                            "
                                            label="Product key features"
                                            outlined
                                            dense
                                          ></v-text-field>

                                          <v-btn
                                            icon
                                            color="red"
                                            @click="
                                              deleteFeaturesForEditProduct(
                                                index
                                              )
                                            "
                                            ><v-icon>mdi-close</v-icon></v-btn
                                          >
                                        </div>
                                        <v-btn
                                          @click="addFeaturesForEditProduct"
                                          color="#854FFF"
                                          >Add Feature</v-btn
                                        >
                                      </v-col>
                                    </v-row>
                                    <div>
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                          color="red darken-1"
                                          @click="editdialog = false"
                                          elevation="0"
                                        >
                                          Cancel
                                        </v-btn>
                                        <v-btn
                                          color="blue darken-1"
                                          @click="saveEditProduct"
                                          elevation="0"
                                          :disabled="!editProductForm"
                                        >
                                          Save Edit
                                        </v-btn>
                                      </v-card-actions>
                                    </div>
                                  </v-form>
                                </v-card-text>
                              </v-card>
                            </v-dialog>
                          </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                          <v-icon small class="mr-2" @click="editItem(item)">
                            mdi-pencil
                          </v-icon>
                          <v-icon small @click="deleteItem(item)">
                            mdi-delete
                          </v-icon>
                        </template>
                        <v-spacer> </v-spacer>
                        <template v-slot:item.specification="{ item }">
                          <v-btn
                            shaped
                            text
                            @click="viewSpecification(item)"
                            color="green"
                          >
                            <v-icon dark> mdi-plus</v-icon>
                            Specification
                          </v-btn>
                        </template>
                        <template v-slot:item.review="{ item }">
                          <v-btn
                            shaped
                            text
                            @click="viewReview(item)"
                            color="blue lighten-2"
                          >
                            <v-icon dark class="pr-2"> mdi-eye-outline</v-icon>
                            Review
                          </v-btn>
                        </template>
                        <template v-slot:item.comments="{ item }">
                          <v-btn
                            shaped
                            text
                            @click="viewComments(item)"
                            color="blue lighten-2"
                          >
                            <v-icon dark class="pr-2"> mdi-eye-outline</v-icon>
                            Comments
                          </v-btn>
                        </template>

                        <template v-slot:item.link="{ item }">
                          <v-btn
                            shaped
                            text
                            @click="viewLink(item)"
                            color="#FF7743"
                          >
                            <v-icon class="mr-2" dark> mdi-link</v-icon>
                            Link
                          </v-btn>
                        </template>
                      </v-data-table>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>

            <v-tab-item>
              <v-container fluid>
                <v-row>
                  <v-card elevation="0" class="mt-1">
                    <v-card-title
                      justify="center"
                      class="d-flex flex-row justify-space-between align-center"
                    >
                      <p class="font-weight-bold" Roboto>Add New Product</p>
                    </v-card-title>

                    <v-card-text>
                      <v-form
                        ref="productForm"
                        v-model="validForm"
                        style="background: #f5f5f5"
                      >
                        <v-row class="pt-7 px-10">
                          <v-col cols="12">
                            <v-radio-group v-model="addItem.radioGroup" row>
                              <v-radio
                                v-for="(option, index) in shares"
                                :key="index"
                                :label="option"
                                :value="index == 0 ? true : false"
                              ></v-radio>
                            </v-radio-group>
                          </v-col>

                          <v-row>
                            <v-col>
                              <v-select
                                v-model="addItem.selectedCatyegory"
                                :items="category"
                                :rules="[(v) => !!v || 'category is required']"
                                required
                                label="category"
                                outlined
                                @change="onSelectCategory"
                                dense
                              ></v-select>
                            </v-col>
                            <v-col>
                              <v-select
                                v-model="addItem.selectedSubCatyegory"
                                :items="sub_category"
                                :rules="[(v) => !!v || 'category is required']"
                                required
                                label="Sub category"
                                outlined
                                @change="onSelectSubCategory"
                                dense
                              ></v-select>
                            </v-col>
                            <v-col>
                              <v-select
                                v-model="addItem.selectedSubSubCategory"
                                :items="sub_sub_category"
                                item-text="title"
                                label="Sub Sub category"
                                outlined
                                dense
                              ></v-select>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4"
                              ><v-text-field
                                v-model="addItem.title"
                                label="Product Name"
                                outlined
                                dense
                                required
                                :rules="[
                                  (v) => !!v || 'Product Title is required',
                                ]"
                              ></v-text-field
                            ></v-col>
                            <v-col>
                              <v-select
                                v-model="addItem.brand"
                                :items="allBrands"
                                item-text="Brand_name"
                                label="Product Brand"
                                outlined
                                dense
                              ></v-select>
                            </v-col>
                            <v-col>
                              <v-select
                                v-model="addItem.origin"
                                label="Manufactured In"
                                outlined
                                dense
                                :items="manufactureCountries"
                                :rules="[
                                  (v) =>
                                    !!v || 'Manufactured Country is required',
                                ]"
                              ></v-select>
                            </v-col>
                            <v-col>
                              <v-select
                                v-model="addItem.shipping"
                                label="Shipping From"
                                :items="manufactureCountries"
                                outlined
                                dense
                                :rules="[
                                  (v) => !!v || 'Shipping Country is required',
                                ]"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-row>

                        <v-row class="px-7">
                          <v-col cols="12">
                            <v-textarea
                              outlined
                              name="input-7-4"
                              dense
                              label="Product Description"
                              v-model="addItem.description"
                              :rules="[(v) => !!v || 'Description is required']"
                            ></v-textarea>
                          </v-col>
                        </v-row>

                        <v-row class="px-7">
                          <v-col cols="12">
                            <v-file-input
                              color="deep-purple accent-4"
                              counter
                              dense
                              label="Upload image"
                              multiple
                              placeholder="Select your images"
                              prepend-icon="mdi-paperclip"
                              outlined
                              show-size
                              v-model="images"
                              @change="Preview_image"
                              :rules="[
                                (value) =>
                                  value.length != 0 || 'Image is required',
                              ]"
                              accept="image/png, image/jpeg, image/bmp"
                            >
                              <template v-slot:selection="{ index, text }">
                                <v-chip
                                  v-if="index < 6"
                                  color="deep-purple accent-4"
                                  dark
                                  label
                                  small
                                  >{{ text }}</v-chip
                                >

                                <span
                                  v-else-if="index === 2"
                                  class="overline grey--text text--darken-3 mx-2"
                                  >+{{ images.length - 2 }} File(s)</span
                                >
                              </template>
                            </v-file-input>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-container>
                            <v-col class="d-flex flex-row flex-wrap">
                              <v-img
                                v-for="(image, index) in previewURLS"
                                :key="index"
                                :src="image.image"
                                max-height="200"
                                max-width="200"
                                class="mr-2 mb-4"
                                @click="cropModal(image, index)"
                                :style="[
                                  image.excede
                                    ? { border: '2px solid red' }
                                    : {},
                                ]"
                              ></v-img>
                            </v-col>
                          </v-container>
                        </v-row>
                        <v-row class="px-7">
                          <v-col cols="12" sm="6" md="6">
                            <div
                              class="d-flex flex-row"
                              v-for="(feature, index) in addItem.key_features"
                              :key="index"
                            >
                              <v-text-field
                                v-model="addItem.key_features[index]"
                                label="Product key features"
                                outlined
                                dense
                              ></v-text-field>

                              <v-btn
                                icon
                                color="red"
                                @click="deleteFeatures(index)"
                                ><v-icon>mdi-close</v-icon></v-btn
                              >
                            </div>
                            <v-btn
                              @click="addFeatures"
                              color="#854FFF"
                              elevation="0"
                              >Add Feature</v-btn
                            >
                          </v-col>
                        </v-row>

                        <div>
                          <v-card-actions class="">
                            <v-spacer></v-spacer>
                            <v-btn
                              color="red darken-1"
                              elevation="0"
                              @click="adddialog = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              elevation="0"
                              @click="save"
                              :disabled="!validForm"
                            >
                              Upload
                            </v-btn>
                          </v-card-actions>
                        </div>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showCrop">
      <v-card>
        <v-row>
          <v-col class="ml-2" cols="4">
            <!-- <clipper-fixed
              id="my-custom-css"
              class="my-clipper"
              ref="clipper"
              :src="cropBlob.image"
              preview="my-preview"
              border-color="red"
            >
              <div class="placeholder" slot="placeholder">No image</div>
            </clipper-fixed> -->
            <!-- <cropper
              class="cropper"
              :src="cropBlob.image"

              @change="change"
              :size-restrictions-algorithm="pixelsRestriction"
            /> -->
            <!-- <cropper
              :src="cropBlob.image"
              :max-height="475"
              :max-width="475"
              :min-height="475"
              :min-width="475"
              @change="change"
              :size-restrictions-algorithm="pixelsRestriction"
            /> -->
            <cropper
              :src="cropBlob.image"
              :min-height="475"
              :min-width="475"
              @change="change"
              :size-restrictions-algorithm="pixelsRestriction"
            />
          </v-col>
          <v-col cols="4">
            <v-img :src="resultURL" height="475" width="475"></v-img>
            <!-- <clipper-preview name="my-preview" class="my-clipper">
              <div class="placeholder" slot="placeholder">preview area</div>
            </clipper-preview> -->
            <v-btn @click="getResult">clip image</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" centered :color="color">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>


<script>
import { Cropper } from "vue-advanced-cropper";

export default {
  data: () => ({
    menu: false,
    menu2: false,
    search: "",
    adddialog: false,
    editdialog: false,
    valid: false,
    snackbar: false,
    text: "",
    color: "",
    check: true,
    validForm: false,
    editProductForm: false,
    loading: true,

    dialog1: false,
    new_category: "",

    dialog2: false,
    new_sub_category: "",

    dialog3: false,
    new_sub_sub_category: "",

    category: [],
    selectedCatyegory: "",

    sub_category: [],
    selectedSubCatyegory: "",

    sub_sub_category: [],
    selectedSubSubCategory: "",

    shares: ["Share with mother site", "Don't share with mother site"],
    select_val: ["kg", "pcs", "gm", "none"],
    headers: [
      { text: "SKU", value: "", sortable: false },
      { text: "Title", value: "title" },
      { text: "Brand", value: "brand" },
      // { text: "Purchase Price", value: "purchase_price" },
      // { text: "Selling Price", value: "old_price" },
      { text: "", value: "review", sortable: false },
      { text: "", value: "comments", sortable: false },
      { text: "", value: "specification", sortable: false },
      { text: "", value: "link", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
      { text: "", value: "data-table-expand" },
    ],
    products: [],
    contact: {},
    editedIndex: -1,
    allBrands: [],

    editedItem: {},

    addItem: {
      radioGroup: false,
      selectedCatyegory: "",
      selectedSubCatyegory: "",
      selectedSubSubCategory: "",
      title: "",
      brand: "",
      description: "",
      key_features: [],
      warranty: "",
      properties: "",
      origin: "Bangladesh",
      shipping: "Bangladesh",
      description: "",
      image: [],
    },

    images: [],
    previewURLS: [],

    user: {},

    title: "",
    brand: "",

    description: "",
    key_features: [],
    quantity: "",
    properties: true,
    point: "",
    price: "",
    purchase_price: "",
    discount_type: "",
    amount: "",
    discount_end_date: "",
    point_end_date: "",
    order: "",
    shipping: "Bangladesh",
    origin: "Bangladesh",
    manufactureCountries: [
      "Bangladesh",
      "India",
      "Pakistan",
      "China",
      "Sri Lanka",
      "Malaysia",
      "Indonesia",
      "Nepal",
      "Bhutan",
      "Maldives",
      "Japan",
      "Philippines",
      "Vietnam",
      "Turkey",
      "Iran",
      "Thailand",
      "Myanmar",
      "South Korea",
      "Saudi Arabia",
      "United Arab Emirates",
      "Singapore",
      "Kuwait",
      "Qatar",
      "Brunei",
      "Bahrain",
    ],
    warranty: "",
    product_unit: "",

    includeFiles: true,
    enabled: false,

    expanded: [],
    singleExpand: false,

    cropBlob: {},
    showCrop: false,
    resultURL: "",
  }),

  components: {
    Cropper,
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  methods: {
    pixelsRestriction({
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      imageWidth,
      imageHeight,
    }) {
      return {
        minWidth: 475,
        minHeight: 475,
        maxWidth: 475,
        maxHeight: 475,
      };
    },

    initialize() {
      axios.get("product/product_details/").then((response) => {
        this.products = response.data;
        this.loading = false;
      });
    },

    getAllBrands() {
      axios.get("productdetails/get_brands/").then((response) => {
        this.allBrands = response.data.data;
      });
    },

    addFeatures() {
      this.addItem.key_features.push("");
    },

    deleteFeatures(index) {
      this.addItem.key_features.splice(index, 1);
    },

    addFeaturesForEditProduct() {
      this.editedItem.key_features.push("");
    },

    deleteFeaturesForEditProduct(index) {
      this.editedItem.key_features.splice(index, 1);
    },

    DiscountEndInput() {
      this.discount_end_date = this.date;

      this.menu = false;
    },

    PointEndInput() {
      this.point_end_date = this.dates;

      this.menu2 = false;
    },

    Preview_image() {
      this.images.forEach((image) => {
        let file = URL.createObjectURL(image);

        let img = new Image();
        img.src = file;

        img.onload = () => {
          let w = img.width;
          let h = img.height;
          let excedeFlag = false;
          if (w > 475 || h > 475) {
            excedeFlag = true;
          } else {
            this.addItem.image.push(image);
          }
          this.previewURLS.push({
            image: file,
            excede: excedeFlag,
            name: image.name,
          });
        };
      });
    },

    change({ coordinates, canvas }) {
      this.resultURL = canvas.toDataURL("image/jpeg", 1);
    },

    cropModal(image, index) {
      this.cropBlob = image;
      this.cropBlob.index = index;
      this.showCrop = true;
    },

    getResult() {
      // const canvas = this.$refs.clipper.clip();
      // this.resultURL = canvas.toDataURL("image/jpeg", 1);

      this.previewURLS[this.cropBlob.index].image = this.resultURL;
      this.previewURLS[this.cropBlob.index].excede = false;
      this.showCrop = false;

      fetch(this.resultURL)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], this.cropBlob.name || "File Name", {
            type: "image/png",
          });
          this.addItem.image.push(file);

          let fileA = URL.createObjectURL(file);
          let img = new Image();
          img.src = fileA;
          img.onload = () => {
            let w = img.width;
            let h = img.height;
            console.log(w, h);
          };
        });
    },

    save() {
      //Upload a product

      var formData = new FormData();

      formData.append("properties", this.addItem.radioGroup);
      formData.append("category", this.addItem.selectedCatyegory);
      formData.append("sub_category", this.addItem.selectedSubCatyegory);
      formData.append("sub_sub_category", this.addItem.selectedSubSubCategory);
      formData.append("title", this.addItem.title);
      formData.append("brand", this.addItem.brand);
      formData.append("description", this.addItem.description);
      formData.append("key_features", this.addItem.key_features);
      formData.append("shipping_country", this.addItem.shipping);
      formData.append("origin", this.addItem.origin);
      formData.append("count", this.addItem.image.length);
      formData.append("user_role", this.user.role);
      formData.append("user_id", this.user.user_id);

      // Image append in form data array
      for (var i = 0; i < this.addItem.image.length; i++) {
        let file = this.addItem.image[i];

        formData.append("images[" + i + "]", file);
      }

      axios
        .post(`product/add_product/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.data.success) {
            this.products.unshift(response.data.product_data);
            this.text = "Product has been uploaded successfully";
            this.color = "success";
            this.$refs.productForm.reset();
            this.addItem.key_features.length = 0;
            this.addItem.radioGroup = false;
            this.adddialog = false;
          } else {
            this.text = "Something went wrong !!";
            this.color = "error";
          }
          this.snackbar = true;
        })
        .catch((err) => {
          this.text = "Something went wrong !!";
          this.color = "error";
          this.snackbar = true;
        });
    },

    saveEditProduct() {
      var formData = new FormData();

      formData.append("category", this.editedItem.category);
      formData.append("sub_category", this.editedItem.sub_category);
      formData.append("sub_sub_category", this.editedItem.sub_sub_category);
      formData.append("title", this.editedItem.title);
      formData.append("brand", this.editedItem.brand);
      formData.append("description", this.editedItem.description);
      formData.append("key_features", this.editedItem.key_features);
      formData.append("shipping_country", this.editedItem.shipping_country);
      formData.append("origin", this.editedItem.origin);
      formData.append("user_role", this.user.role);
      formData.append("user_id", this.user.user_id);

      // Object.assign(this.products[this.editedIndex], this.editedItem);

      axios
        .post(`product/modify_product/${this.editedItem.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.data.success) {
            Object.assign(this.products[this.editedIndex], this.editedItem);
            this.text = "Product has been edited successfully";
            this.color = "success";
            this.editedItem = {};
            this.snackbar = true;
            this.editdialog = false;
          } else {
            this.text = "Something went wrong !!";
            this.color = "error";
            this.snackbar = true;
          }
        })
        .catch((err) => {
          this.text = "Something went wrong !!";
          this.color = "error";
          this.snackbar = true;
        });
    },

    saveCategory() {
      this.category.push(this.new_category);
      this.dialog1 = false;
    },

    AddSubCategory() {
      this.sub_category.push(this.new_sub_category);
      this.dialog2 = false;
    },

    addSubSubCategory() {
      this.sub_sub_category.push(this.new_sub_sub_category);
      this.dialog3 = false;
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editdialog = true;
    },

    deleteItem(item) {
      if (confirm("Do you really want to delete?")) {
        axios.post(`product/delete_product/${item.id}/`).then((response) => {
          this.products = this.products.filter(
            (contact) => contact.id != item.id
          );
        });
      }
    },

    viewSpecification(item) {
      let routeData = this.$router.resolve({
        name: `/dashboard/pages/specification/${item.id}`,
      });
      routeData.href = `/dashboard/pages/specification/?id=${item.id}&unit=${item.unit}`;
      window.open(routeData.href, "_blank");
    },

    viewReview(item) {
      let routeData = this.$router.resolve({
        name: `/dashboard/pages/review/${item.id}`,
      });
      routeData.href = `/dashboard/pages/review/?id=${item.id}`;
      window.open(routeData.href, "_blank");
    },

    viewComments(item) {
      let routeData = this.$router.resolve({
        name: `/dashboard/pages/viewcomments/${item.id}`,
      });
      routeData.href = `/dashboard/pages/viewcomments/?id=${item.id}`;
      window.open(routeData.href, "_blank");
    },

    viewLink(item) {
      let routeData = this.$router.resolve({
        name: `https://mymarket.com.bd/products/${item.id}/details`,
      });
      routeData.href = `https://mymarket.com.bd/products/${item.id}/details`;
      window.open(routeData.href, "_blank");
    },

    getAllCastegory() {
      axios.get("category/categories/").then((response) => {
        this.category = response.data;
      });
    },

    onSelectCategory() {
      axios
        .post(`category/subcategories/`, {
          name: this.addItem.selectedCatyegory,
        })
        .then((response) => {
          this.sub_category = response.data;
        });
    },

    onSelectSubCategory() {
      axios
        .post(`category/subsubcategories/`, {
          name: this.addItem.selectedSubCatyegory,
        })
        .then((response) => {
          this.sub_sub_category = response.data;
        });
    },
  },
  mounted() {
    this.initialize();
    this.getAllCastegory();
    this.getAllBrands();
    this.user = JSON.parse(localStorage.getItem("user"));
  },
};
</script>


<style>
.cropper {
  height: 600px;
  background: #ddd;
}
/* .vue-bounding-box{
  max-width: 475px;
  max-height: 475px;
} */
#my-custom-css .vuejs-clipper-fixed__cover .vuejs-clipper-fixed__area {
  width: 475px !important;
}

.v-sheet--offset {
  top: -10px;
  position: relative;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 1.19rem;
  height: 48px;
}
</style>

