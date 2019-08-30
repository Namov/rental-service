// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'

Vue.prototype.$axios = axios
Vue.prototype.$ajax = axios
axios.defaults.baseURL = '/'
axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'
axios.defaults.headers.post['Content-type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.get['Content-type'] = 'application/json;charset=UTF-8'
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(infiniteScroll)

Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
