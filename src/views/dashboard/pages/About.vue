<template>
  <v-container >
    <v-container>
      <v-row>
        <v-col md="6" cols="12">
          <div>
            <p class="text-md-h4 text-body-1 text-center text-md-left mt-5">
              WHO ARE WE ?
            </p>
            <p class="text-md-body-1 text-body-2 text-center text-justify">
             Global sourcing is the practice of sourcing from the global market for goods and services across geopolitical boundaries. Global sourcing often aims to exploit global efficiencies in the delivery of a product or service. These efficiencies include low cost skilled labor, low cost raw material and other economic factors like tax breaks and low trade tariffs. A large number of Information Technology projects and Services, including IS Applications and Mobile Apps and database services are outsourced globally to countries like India and Pakistan for more economical pricing.

Common examples of globally sourced products or services include: labor-intensive manufactured products produced using low-cost Chinese labor, call centers staffed with low-cost English speaking workers in the Philippines and India, and Pakistan and IT work performed by low-cost programmers in India and Pakistan and Eastern Europe. While these examples are examples of Low-cost country sourcing, global sourcing is not limited to low-cost countries.

Majority of companies today strive to harness the potential of global sourcing in minimizing cost. Hence it is commonly found that global sourcing initiatives and programs form an integral part of the strategic sourcing plan and procurement strategy of many multinational companies.
            </p>
          </div>
        </v-col>
        <v-col md="6" cols="12">
          <v-img
           src="@/assets/about2.png">

          </v-img>
          <!-- <v-img src="/2672291.png"></v-img> -->
        </v-col>
      </v-row>
    </v-container>

    <v-container>
        <v-row justify="center">
          <v-col  cols="12">
            <p class="text-md-h4 text-body-1 ">Our Slogan</p>
            <p class="text-justify">

            </p>
          </v-col>
        </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      companyInfo: {},
    };
  },
  mounted() {
    // Fetch Company information
    // this.$axios
    //   .get("site/info")
    //   .then((response) => {
    //     if (response.data) {
    //       this.companyInfo = response.data.data[0];
    //     }
    //   });
  },
};
</script>

<style>
</style>
