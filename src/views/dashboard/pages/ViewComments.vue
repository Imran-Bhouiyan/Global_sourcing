<template>
  <v-container class="pa-10">
    <v-card v-if="tickets.length">
      <v-row class="ml-7" style="width: 96%">
        <v-col cols="3">
          <v-card
            style="background: #f5f5f5; height: 94%; overflow: auto"
            class="pb-1"
          >
            <v-card-actions class="ml-2 mb-2">
              <v-list three-line color="#f5f5f5" width="100%" round>
                <template v-for="(item, index) in tickets">
                  <v-divider
                    v-if="item.divider"
                    :key="index"
                    :inset="item.inset"
                  ></v-divider>

                  <v-list-item
                    v-else
                    :key="item.comment_name"
                    @click="openchat(item)"
                  >
                    <v-avatar v-if="item.comment_name" color="primary">
                      <span class="white--text">{{
                        item.comment_name.slice(0, 2)
                      }}</span>
                    </v-avatar>

                    <v-avatar v-else-if="checkexist == false" color="primary">
                      <span class="white--text">Un</span>
                    </v-avatar>

                    <v-list-item-content class="pl-4 mt-3">
                      <v-list-item-title
                        v-if="item.comment_name"
                        v-html="item.comment_name"
                      ></v-list-item-title>

                      <v-list-item-title v-else-if="checkexist == false"
                        >Unknown</v-list-item-title
                      >

                      <v-list-item-subtitle
                        v-html="item.comment"
                      ></v-list-item-subtitle>

                      <v-text v-if="checkexist"
                        >There is no Questions to show</v-text
                      >
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="9">
          <v-card style="background: #f5f5f5">
            <v-row>
              <v-col>
                <p class="ml-5">Product Title : {{ product_title }}</p>
              </v-col>
            </v-row>
            <v-row style="min-height: 100%; text-align: start" class="mx-2">
              <v-col>
                <v-avatar size="45"
                  ><v-img height="100%" :src="image"></v-img
                ></v-avatar>
              </v-col>
              <v-col class="mt-3">
                Product Id : {{ showItem.product_id }}
              </v-col>
              <v-col class="mt-3" v-if="showItem.comment_name">
                Sender Name: {{ showItem.comment_name }}
              </v-col>
              <v-col class="mt-3"> Date: {{ showItem.date_created }} </v-col>
              <v-col>
                <v-btn color="red" @click="deleteItem(showItem)" elevation="0">
                  Delete
                </v-btn>
              </v-col>
            </v-row>

            <br />
            <hr />
            <v-row class="pa-5 ml-0 pt-0 pl-2" justify="end">
              <v-col class="pt-10">
                <p class="font-weight-medium">Question :</p>
                <p>{{ showItem.comment }}</p>
              </v-col>
            </v-row>

            <v-row class="mx-2">
              <v-card color="#f5f5f5" width="100%" elevation="0" class="mt-0">
                <v-card-title> Replies:</v-card-title>

                <v-card-text
                  style="
                    max-height: 200px;
                    overflow: auto;
                    min-height: 200px;
                    display: flex;
                    flex-direction: column-reverse;
                  "
                  class="pl-0 pb-0"
                >
                  <v-list ref="chat" id="replies" color="#f5f5f5">
                    <v-list-item
                      two-line
                      v-for="(item, index) in showItem.replies"
                      :key="index"
                    >
                      <v-list-item-content
                        :class="
                          item.is_staff ? 'blue lighten-4' : 'teal lighten-4'
                        "
                        style="padding: 10px; border-radius: 25px"
                      >
                        <p
                          :class="
                            item.is_staff
                              ? 'black--text text-start font-weight-medium'
                              : 'black--text text-end font-weight-medium'
                          "
                          style="font-size: 18px"
                          >{{ item.reply }}
                          <v-icon @click="edit(item)">mdi-pencil</v-icon>
                        
                        </p>
                        <v-list-item-subtitle
                          :class="
                            item.is_staff
                              ? 'blue--text text--darken-4 text-start'
                              : 'blue--text text--darken-4 text-end'
                          "
                          >by: {{ item.sender }}</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-text>

                <v-card-actions>
                  <v-form style="min-width: 100%">
                    <v-textarea
                      rows="1"
                      auto-grow
                      v-model="reply"
                      label="Reply"
                      outlined
                      dense
                    ></v-textarea>

                    <v-btn
                      dark
                      fab
                      small
                      color="primary"
                      class="float-right mb-2"
                      style="margin-top: -15px"
                      @click.prevent="submit"
                    >
                      <v-icon dark>mdi-send</v-icon>
                    </v-btn>
                  </v-form>
                </v-card-actions>
              </v-card>
            </v-row>

            <!-- <v-row class="mx-3">
              <div style="width: 100%">
                <v-card color="#f5f5f5" width="100%" elevation="0">
                  <v-list-item>
                    <b class="mr-6 primary--text"> Question </b>
                    <v-list-item-content>
                      {{ showItem.comment }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-card-text
                    style="max-height: 245px; overflow: auto; min-height: 245px"
                  >
                    <v-list ref="chat" id="replies" color="#f5f5f5">
                      <v-list-item
                        two-line
                        v-for="(item, index) in showItem.replies"
                        :key="index"
                      >
                        <v-list-item-content class="ml-12">
                          <v-list-item>
                            <v-avatar size="30" color="primary">
                              <span class="white--text">{{
                                item.name.slice(0, 2)
                              }}</span>
                            </v-avatar>

                            <v-list-item-content class="pl-4">
                              <v-list-item-title class="black--text">{{
                                item.reply
                              }}</v-list-item-title>
                              <v-list-item-subtitle class="blue--text caption"
                                >Replied By @{{ item.name }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </div>
            </v-row> -->
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-else min-height="70vh" class="d-flex align-center justify-center">
      <p class="text-h4">There is no Questions of this product to show</p>
    </v-card>
    <v-dialog v-model="editdialog" max-width="500px" min-height="300px">
      <v-card max-width="500px" min-height="150px">
        <v-card-title> </v-card-title>

        <v-form style="max-width: 90%" class="ml-5">
          <v-textarea
            rows="1"
            auto-grow
            v-model="editedItem.reply"
            label="Edit Reply"
            outlined
            dense
          ></v-textarea>

          <v-btn
            dark
            fab
            small
            color="primary"
            class="float-right mb-2"
            style="margin-top: -15px"
            @click.prevent="editsubmit"
          >
            <v-icon dark>mdi-send</v-icon>
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    dialog: false,
    dialog2: false,
    editdialog: false,
    reply: "",
    product_title: "",
    product_id: "",
    replies: [],
    reply: null,
    replyArray: [],
    showItem: {},
    showIcon: false,
    checkexist: false,
    image: "",
    user: {},

    tickets: [],
    newarry: [],
    spticket: [],

    editedIndex: -1,
    editedItem: {
      reply: "",
    },
    defaultItem: {
      reply: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Ticket" : "Edit Ticket";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    replies() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    },
  },

  methods: {
    initialize() {
      axios
        .get(`product/comments_product/${this.$route.query.id}/`)
        .then((response) => {
          if (response.data.data.length > 0) {
            this.tickets = response.data.data;
            console.log("this is ticket info", this.tickets);
            this.product_title = response.data.product_title;
            this.image = response.data.images[0];
            this.showItem = response.data.data[0];
            console.log("this is for showitem", this.showItem);
            (this.replyArray = response.data.data[0].replies),
              console.log("replyes", this.replyArray);

            this.showIcon = true;
          } else {
            this.checkexist = true;
          }
          this.product_id = this.$route.query.id;
        });
    },
 
    submit() {
      axios
        .post("product/create_reply/", {
          comment_id: this.showItem.id,
          user_id: this.user.user_id,
          reply: this.reply,
          is_staff: "true",
        })
        .then((response) => {
          this.showItem.replies.push({
            reply: this.reply,
            is_staff: true,
            sender: this.user.user_email,
          });
          this.reply = "";
        });
    },

    openchat(item) {
      this.showItem = item;
    },

    deleteItem(item) {
      if (confirm("Do you really want to delete?")) {
        axios.post(`product/delete_comment/${item.id}/`).then((response) => {
          this.tickets = this.tickets.filter(
            (showItem) => showItem.id !== item.id
          );
          this.showItem = {};
        });
      }
    },

    close() {
      this.dialog = false;
      this.dialog2 = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    edit(item) {
      console.log({item})
      Object.assign(this.editedItem , item)
      this.editdialog = true;
    },


    editsubmit() {


      console.log("Edited Item " , this.editedItem)
      

      axios
        .post(`product/edit_reply/${this.editedItem.id}/`, {
          comment_id: this.showItem.id,
          user_id: this.user.user_id,
          reply: this.editedItem.reply,
          is_staff: "true",
        })
        .then((response) => {
          this.showItem.replies.push({
            reply: this.editedItem.reply,
            is_staff: true,
            sender: this.user.user_email,
          });
          this.editedItem.reply = "";
          this.editdialog = false;
        });
    },

    viewLink(item) {
      let routeData = this.$router.resolve({
        name: `https://mymarket.com.bd/products/${item.title.replaceAll(
          " ",
          "-"
        )}/details/?spm=${this.$route.query.id}`,
      });
      routeData.href = `https://mymarket.com.bd/products/${item.title.replaceAll(
        " ",
        "-"
      )}/details/?spm=${this.$route.query.id}`;
      window.open(routeData.href, "_blank");
    },


  },
  mounted() {
    this.initialize();
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log("User" , this.user)
  },
};
</script>