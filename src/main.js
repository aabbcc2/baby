import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// element-ui 引入文件 
import ElementUI from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/index.css'
import '@/style/base.css'
//注册 VueAxios, axios 
Vue.use(VueAxios, axios)
Vue.use(ElementUI)

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
