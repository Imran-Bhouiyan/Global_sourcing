import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/base'
// import './plugins/chartist'
// import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
// import i18n from './i18n'
import axios from 'axios'
window.axios=axios

// axios.defaults.baseURL='https://tango99.herokuapp.com/'
//axios.defaults.baseURL='https://tes.com.bd/'

//axios.defaults.baseURL='https://tango99.herokuapp.com/'
//axios.defaults.baseURL='http://127.0.0.1:8000/'

// axios.defaults.baseURL='http://127.0.0.1:8000/'
// axios.defaults.baseURL = 'http://128.199.114.154:8080/'

import DatetimePicker from 'vuetify-datetime-picker'
// import vSelect from 'vue-select'

import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)

// Vue.component('v-select', vSelect)

Vue.use(DatetimePicker)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  // i18n,
  render: h => h(App),
}).$mount('#app')
