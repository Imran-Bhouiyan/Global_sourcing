<template>
  <v-footer  absolute
    id="dashboard-core-footer"
  >
    <v-container fluid class="black white--text pa-0">
    <v-row justify="center" style="width: 100%" class="ma-0">
      <v-col offset-md="1" align-self="center">
       
        <!-- <p class="text-body-1">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p> -->
        <!-- <div>
          <v-btn
            v-for="(item, i) in items.slice(0, large ? items.length : 3)"
            :key="i"
            fab
            class="ma-2"
            color="info"
            small
          >
            <v-icon dark v-text="item.icon" />
          </v-btn>
        </div> -->
      </v-col>
      <v-col>
        <h4 class="my-5 text-h6">OUR SERVICES</h4>
        <p class="text-subtitle-1">Ground Shiping</p>
        <p>Sea Delivery</p>
        <p>Air Shiping</p>
        <p>Send Shiping</p>
      </v-col>
      <v-col>
        <h4 class="my-5 text-h6">CONTACT US</h4>
        <p>House #13 , Road #32/A , Mirpur 1</p>
        <p>Dhaka , Bangladesh</p>
        <p>Phone : 494597 847</p>
        <p>Email : rannermail@ranner.com</p>
      </v-col>
      <v-col align-self="end">
        <h4 class="mb-1 text-content">GET IN TOUCH</h4>
        <v-btn
          v-for="(item, i) in items.slice(0, large ? items.length : 3)"
          :key="i"
          fab
          class="ma-3 ml-0"
          color="green"
          small
        >
          <v-icon dark v-text="item.icon" />
        </v-btn>
      </v-col>
    </v-row>

    <v-row style="width: 100%">
      <v-container fluid class="pa-0" style="background-color: black">
        <v-row no-gutters>
          <v-col cols="12" md="6" class="triangle-bottomleft">
            <div
              style="height: 100%"
              class="d-flex align-center justify-center"
            >
              <p class="text-center white--text text-h6 ma-0">
                Copyright &copy; 2020 Intense.
              </p>
            </div>

            <!-- <v-img src="footer.png">
              <div style="height:100%;" class="d-flex align-center justify-center">
                <p class="text-center white--text text-h6 ma-0">Copyright &copy; 2020 Intense.</p>
              </div>
            </v-img> -->
          </v-col>
          <v-col align-self="center" md="6" class="d-none d-md-flex">
            <div
              class="d-flex flex-row justify-space-between text-center"
              style="width: 100%"
            >
              <nuxt-link class="text-decoration-none" to="/"
                ><p class="white--text ma-0">HOME</p></nuxt-link
              >
              <nuxt-link class="text-decoration-none" to="/about"
                ><p class="white--text ma-0">ABOUT US</p></nuxt-link
              >
              <nuxt-link class="text-decoration-none" to="/services"
                ><p class="white--text ma-0">SERVICES</p></nuxt-link
              >
              <nuxt-link class="text-decoration-none" to=""
                ><p class="white--text ma-0">TRACK & TRACE</p></nuxt-link
              >
              <nuxt-link class="text-decoration-none" to="/contact"
                ><p class="white--text mr-10 mb-0">CONTACT</p></nuxt-link
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'DashboardCoreFooter',

    data: () => ({
      links: [
        {
          href: '#',

        },
        {
          href: '#',

        },
        {
          href: '#',

        },
        {
          href: '#',

        },
      ],
    }),
  }
</script>

<style lang="sass">
  #dashboard-core-footer
    a
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase
</style>
