<template>
  <v-container fluid class="mb-10">
    <v-row class="ml-7" style="width: 96%">
      <v-col cols="12">
        <v-card>
          <v-col cols="12">
            <v-card class="ml-10 mr-10 mt-10 mb-10">
              <v-data-table
                :headers="headers"
                :items="users"
                class="elevation-1"
                style="background: #f5f5f5"
              >
                <template v-slot:top>
                  <v-toolbar elevation="2" style="background: #f5f5f5">
                    <v-toolbar-title
                      style="margin-left: -14px"
                      class="mt-2 mb-2 ml-2"
                      >All Site Users</v-toolbar-title
                    >

                    <v-spacer></v-spacer>
                    <v-menu
                      :close-on-content-click="false"
                      v-model="dialog"
                      scrollable
                      transition="scale-transition"
                      origin="top right"
                      :nudge-left="220"
                      max-width="420px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2 mt-2 mr-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>mdi-plus</v-icon>
                          Create User
                        </v-btn>
                      </template>
                      <v-list style="height: 657px">
                        <v-card-text class="pt-12">
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                dense
                                v-model="editedItem.email"
                                outlined
                                :rules="[
                                  () =>
                                    editedItem.email.length > 0 ||
                                    'Required field',
                                ]"
                                label="Email"
                                type="email"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                type="password"
                                required
                                v-validate="'required'"
                                dense
                                v-model="editedItem.password"
                                :rules="[
                                  () =>
                                    editedItem.password.length >= 6 ||
                                    'Minimum 6 character is required',
                                ]"
                                outlined
                                label="Password"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                type="password"
                                required
                                :rules="[
                                  () =>
                                    editedItem.confirm_password ==
                                      editedItem.password ||
                                    'Both password must be matched',
                                ]"
                                dense
                                v-model="editedItem.confirm_password"
                                outlined
                                label="Confirm Password"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <v-text-field
                                dense
                                v-model="editedItem.username"
                                outlined
                                label="User Name"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <v-text-field
                                dense
                                v-model="editedItem.phone_number"
                                outlined
                                label="Contact Number"
                                type="number"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <v-select
                                dense
                                v-model="editedItem.role"
                                :rules="[
                                  () =>
                                    editedItem.role.length > 0 ||
                                    'Select a role',
                                ]"
                                :items="select_val"
                                label="Select Role"
                                outlined
                              ></v-select>
                            </v-col>
                          </v-row>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="close">
                              Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card-text>
                      </v-list>
                    </v-menu>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <!-- <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon> -->
                  <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                </template>

                <template v-slot:item.role="{ item }">
                  {{ item.role }}
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                </template>

                <template v-slot:item.status="{ item }">
                  <v-btn
                    v-if="item.is_active"
                    shaped
                    text
                    @click="makeInactive(item)"
                    color="primary"
                  >
                    Make inactive
                  </v-btn>

                  <v-btn
                    v-else
                    shaped
                    text
                    @click="makeActive(item)"
                    color="red"
                  >
                    Make Active
                  </v-btn>
                </template>

                <!-- <template v-slot:no-data>
                  <v-btn color="primary" @click="initialize"> Reset </v-btn>
                </template> -->
              </v-data-table>
            </v-card>
          </v-col>
        </v-card>
      </v-col>
    </v-row>

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
export default {
  data: () => ({
    // date: new Date().toISOString().substr(0, 10),

    menu: false,
    menu2: false,
    dialog: false,
    snackbar: false,
    color: "",
    text: "",
    select_val: ["Staff", "Admin", "Seller"],
    headers: [
     // { text: "User Id", value: "", sortable: false },
      { text: "User Name", value: "username" },
      { text: "Email", value: "email" },
      { text: "Contact Number", value: "phone_number" },
      { text: "Role", value: "role" },
      { text: "", value: "status" },
      { text: "Actions", value: "actions" },
    ],
    users: [],
    contact: {},
    editedIndex: -1,
    editedItem: {
      email: "",
      password: "",
      confirm_password: "",
      role: "",
      username: "",
      phone_number: ""
    },
    defaultItem: {
      email: "",
      password: "",
      confirm_password: "",
      role: "",
      username: "",
      phone_number: "",
      is_staff:true
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get("user/show_users/").then((response) => {
        console.log("user data",response.data);
        this.users = response.data.data;
      });
    },

    makeInactive(item) {
      if (confirm("Do you really want to deactive this ?")) {
        axios
          .post(`user/update_user/${item.id}/`, {
            email: item.email,
            password: item.pwd,
            is_active: false,
          })

          .then((response) => {
            if (response.data.success) {
              this.text = "User is inactivated successfully";
              this.color = "success";
              location.reload();
              return false;
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
      }
    },

    makeActive(item) {
      if (confirm("Do you really want to deactive this ?")) {
        axios
          .post(`user/update_user/${item.id}/`, {
            email: item.email,
            password: item.pwd,
            is_active: true,
          })

          .then((response) => {
            if (response.data.success) {
              this.text = "User is activated successfully";
              this.color = "success";
              location.reload();
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
      }
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      if (confirm("Do you really want to delete?")) {
        axios
          .post(`user/user_delete/${item.id}/`)
          .then((response) => {
            if (response.data.success) {
              this.users = this.users.filter(
                (contact) => contact.id !== item.id
              );
              this.text = "User has been deleted successfully";
              this.color = "success";
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
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        let values = this.editedItem;
        let index = this.editedIndex;
        console.log("before values",values.pwd)
        axios
          .post(`user/update_user/${this.editedItem.id}/`, {
            email: values.email,
            password: values.pwd,
            role: values.role,
          })
          .then((response) => {
            console.log("response", response.data)
            Object.assign(this.users[index], values);
          });
      } else {
        let all_data = this.editedItem;

        if (
          this.editedItem.email &&
          this.editedItem.password &&
          this.editedItem.role
        ) {
          console.log(" new editted item", this.editedItem);
          axios
            .post("user/create_user/", this.editedItem)
            .then((response) => {
              console.log("response data", response.data);
              if (response.data.success) {
                this.users.push(response.data.data);
                this.text = "user has been created successfully";
                this.color = "success";
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
        } else {
          this.text = "Fill up all the field first !!";
          this.color = "error";
          this.snackbar = true;
        }
      }
      this.close();
    },
  },
  mounted() {
    this.initialize();
  },
};
</script>


<style>
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

