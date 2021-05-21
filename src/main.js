import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"

import  "./lib/bootstrap-3.3.1/css/bootstrap.min.css";

Vue.use(Element)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
