// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import VTooltip from 'v-tooltip'

import App from './App'
import store from '@/store'
import router from '@/router'

// Vue.use(Vuex)
Vue.use(ElementUI)

// vue2-animate
// https://github.com/asika32764/vue2-animate
require('vue2-animate/dist/vue2-animate.min.css')


// Vue.directive('my-tooltip', VTooltip.VTooltip)
Vue.use(VTooltip)
// must define CSS in index.html

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  template: '<App/>',
  components: {
    App
  }
})
