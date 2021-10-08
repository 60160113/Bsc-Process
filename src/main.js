import 'core-js/stable'
import Vue from 'vue'
import Vuex from 'vuex'
//import CoreuiVuePro from '@coreui/vue-pro'
// import ggicon from 'https://css.gg/css'
import CoreuiVuePro from '../node_modules/@coreui/vue-pro/src/index.js'
import App from './App'
import router from './router/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import i18n from './i18n.js'
import babelPolyfill from "babel-polyfill"
import VueKonva from 'vue-konva'

Vue.use(VueKonva)
Vue.use(CoreuiVuePro)
Vue.use(Vuex)
Vue.prototype.$log = console.log.bind(console)

new Vue({
  el: '#app',
  router,
  store,
  babelPolyfill,
  // ggicon,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  i18n,
  template: '<App/>',
  components: {
    App
  }
})
