<template>

<v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#43a047"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="500"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>



      <v-toolbar-title>Global Sourcing</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text>
       Home
      </v-btn>
       <v-btn text>
      About Us
      </v-btn>
       <v-btn text>
      Products
      </v-btn>
      <v-btn text>
      Blog
      </v-btn>

      <v-btn text>
       Contact Us
      </v-btn>

      <v-btn icon class="mr-15">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>


    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-5"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;"></v-container>
    </v-sheet>
  </v-card>


<!--

  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-toolbar-title>Global Sourcing</v-toolbar-title>
      <v-btn class="mt-5">
         <v-img
            src="@/assets/global_sourcing.jpg"
            max-height="100px"
            max-width="100px"
          ></v-img>

      </v-btn>

      <v-spacer></v-spacer>



      <v-btn icon class="pa-10 mr-15">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn >
        <v-icon>Home</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>


    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1000px;"></v-container>
    </v-sheet>
  </v-card> -->
  <!-- <div>


    <v-app-bar app clipped-left>
      <v-toolbar-title class="mr-12 align-center">
        <div>
          <v-img
            src="@/assets/new_logo.png"
            max-height="30px"
            max-width="150px"
          ></v-img>
        </div>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div>
        <v-menu offset-y :close-on-content-click="false" v-model="menu">
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" dark v-bind="attrs" v-on="on">
              Hey, {{ Logged_user.user_email }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-card elevation="0">
                  <v-form ref="form">
                    <v-text-field
                      color="black"
                      outlined
                      dense
                      label="Old Password"
                      v-model="old_password"
                      type="password"
                    ></v-text-field>
                    <v-text-field
                      color="black"
                      outlined
                      dense
                      label="New Password"
                      v-model="new_password"
                      type="password"
                    ></v-text-field>
                    <v-text-field
                      color="black"
                      outlined
                      dense
                      label="Confirm Password"
                      v-model="confirm_password"
                      type="password"
                    ></v-text-field>
                  </v-form>
                  <v-btn
                    color="#FF7743"
                    block
                    elevation="0"
                    @click.stop="changePassword"
                    ><p class="mb-0 text-capitalize">Change password</p></v-btn
                  >
                </v-card>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="pa-2 pr-3">

        <v-btn text @click="logout">logout</v-btn>
      </div>
    </v-app-bar>

    <v-snackbar v-model="snackbar" centered :color="color">
      {{ text }}
    </v-snackbar>
  </div> -->
</template>
<script>
// Utilities
import { mapState } from "vuex";

export default {
  name: "DashboardCoreDrawer",
  check: false,
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({


    links: [
      {
        to: "/",
        icon: "mdi-view-dashboard",
        text: "Dashboard",
      },

    ],
  }),

  methods: {

  },

  mounted() {
  },
};
</script>

<style scoped>
.v-application--is-ltr
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding-left: 20px !important;
}
.color {
  background-color: #854fff;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
