import Vue from 'vue'
import router from './router.js'
import store from './store'

import './filters.js'
import Mixins from './mixins.js'
Vue.mixin(Mixins)

import App from './App.vue'
import i18n from "./lang/lang.js";

export const app = new Vue({
  el: '#vue-app',
  router,
  store,
  i18n,
  template: '<App/>',
  mixins: [Mixins],
  components: { App }
})
