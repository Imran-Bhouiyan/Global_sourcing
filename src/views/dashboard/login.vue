<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="E-mail"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="email"
                    v-on:keyup.enter="logIn"
                    :rules="[
                      (v) => !!v || 'E-mail is required',
                      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                    ]"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    prepend-icon="mdi-lock"
                    v-model="password"
                    type="password"
                    v-on:keyup.enter="logIn"
                    :rules="[(v) => !!v || 'Password is required']"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.prevent="logIn">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-snackbar v-model="snackbar" centered :color="color">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data() {
    return {
      email: "",
      password: "",
      snackbar: false,
      text: "",
      color: "success",
    };
  },
  methods: {
    logIn() {
      if (this.email == "" || this.password == "") {
        this.text = "Provide required credentials";
        this.color = "red";
        this.snackbar = true;
      } else {
        axios
          .post("/user/dummy_login/", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.data.success) {
              this.text = "Succefully logged in !!";
              this.color = "green";
              this.snackbar = true;
              localStorage.setItem("user", JSON.stringify(response.data.user));
              if (response.data.user.role == "Seller") {
                this.$router.push("/sellerdashboard");
              } else {
                this.$router.push("/dashboard");
              }k
            } else {
              this.text = "Please , provide valid informations";
              this.color = "red";
              this.snackbar = true;
            }
          })
          .catch((error) => {
            this.text = "Something went wrong !";
            this.color = "red";
            this.snackbar = true;
          });
      }
    },
  },
};
</script>

