<template>
  <v-container fluid class="mb-16">
    <v-card height="100%" elevation="0">
      <v-card-title> Product Portfolio </v-card-title>
      <v-row>
        <v-col class="4">
          <v-col cols="6">
            <v-img
              src="@/assets/img1.jpg"
              max-height="125"
              contain
              class="grey darken-4"
            ></v-img>
          </v-col >

          <v-col cols="6"> Frozen Fruit </v-col >
        </v-col>
        <v-col class="4">
           <v-col cols="6">
            <v-img
              src="@/assets/img1.jpg"
              max-height="125"
              contain
              class="grey darken-4"
            ></v-img>
          </v-col >

          <v-col cols="6"> Frozen Fruit </v-col >
           </v-col>
        <v-col class="4">
           <v-col cols="6">
            <v-img
              src="@/assets/img1.jpg"
              max-height="125"
              contain
              class="grey darken-4"
            ></v-img>
          </v-col >
                                                                                            
          <v-col cols="6"> Frozen Fruit </v-col >
          </v-col> </v-row></v-card
  ></v-container>
</template>


<script>
export default {
  data: () => ({}),

  methods: {},
  mounted() {},
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
