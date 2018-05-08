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

// Google Analytics
var google_analytics = require('./google_analytics.js')

router.onReady(function(){
	google_analytics.init()
})

router.beforeEach((to, from, next) => {
	ga('send', {
	  hitType: 'pageview',
	  page: to.path,
	  location: window.location.origin + to.path,
	  title: to.name
	});
	next();
})