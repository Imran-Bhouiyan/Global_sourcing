<template >
  <v-container fluid>
    <v-row>
      <v-col cols="1" md="6">
        <v-container fluid>
          <p class="text-button font-weight-bold">Personal Information</p>
          <v-divider></v-divider>
          <v-container class="pa-0">
            <v-card flat tile class="d-flex flex-column">
              <div class="d-flex flex-row">
                <p class="text-button mt-5 ml-5">Full Name</p>
                <v-divider></v-divider>
                <p class="text-button mt-5 mr-5">Imran Bhouiyan</p>
              </div>
            </v-card>
            <v-card flat tile class="d-flex flex-column">
              <div class="d-flex flex-row">
                <p class="text-button mt-5 ml-5">Phone Number</p>
                <v-divider></v-divider>
                <p class="text-button mt-5 mr-5">0124568879</p>
              </div>
            </v-card>
            <v-card flat tile class="d-flex flex-column">
              <div class="d-flex flex-row">
                <p class="text-button mt-5 ml-5">Email</p>
                <v-divider></v-divider>
                <p class="mt-5 mr-5">a@b.com</p>
              </div>
            </v-card>
            <br />
            <div>
              <v-btn rounded color="pink" dark @click="update">
                Update Information</v-btn
              >
            </div>
          </v-container>

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="font-weight-bold">Update Profile</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <p class="mt-5 ml-3 font-weight-bold">Name</p>
                      <v-text-field
                        class="mt-5 ml-2"
                        label="Name"
                        outlined
                        v-model="editedItem.name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <p class="mt-5 ml-3 font-weight-bold">Phone Number</p>
                      <v-text-field
                        class="mt-5 ml-2"
                        label="Phone Number"
                        outlined
                        v-model="editedItem.phone_number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <div class="pb-10">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#854FFF" @click="updateUser">Save</v-btn>
                  <v-btn color="pink" @click="close">Cancel</v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-dialog>
        </v-container>
      </v-col>

      <v-col cols="2" md="3">
        <v-img src="@/assets/pic.jpg" class="mt-10">
          <v-btn icon color="pink" @click="stop">
            <v-icon large>mdi-camera</v-icon>
          </v-btn>
        </v-img>
      </v-col>
 <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="font-weight-bold">Update Profile picture</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <template>
                  <v-file-input
                    v-model="editedItem.icon"
                    label="Icon"
                    filled
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </template>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <div class="pb-10">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#854FFF" @click="updateUser">Save</v-btn>
            <v-btn color="pink" @click="close">Cancel</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    </v-row>

   
  </v-container>
</template>

<script>
export default {
  // middleware: "auth",
  // components: {
  // updateProfileDialog: () => import("@/components/base/updateProfileDialog"),
  // },
  data() {
    return {
      dialog: false,
      dialog2: false,
      name: "",
      phone_number: "",
      profile_picture: "",
      email: "",

      user: {},
      profile: [],
      editedItem: {
        name: "",
        phone_number: "",
        profile_picture: "",
      },
    };
  },
  methods: {
    stop(){
      this.dialog2=true;
    },
    update() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    initialize() {
      axios.get(`user/get_profile/${item.id}/`).then((response) => {
        this.profile = response.data;
      });
    },
    editItem(item) {
      this.editedItem = item;
      this.dialog = true;
      this.dialog2 = true;
    },
    updateUser() {
      axios
        .post(`user/update_profile/${this.editedItem.id}/`, this.editedItem)
        .then((response) => {
          this.dialog = false;
        });
    },
  },
  mounted() {
    this.initialize();
  },
};
</script>

<style>
</style>