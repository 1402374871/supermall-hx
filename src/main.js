import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

import toast from "./components/common/toast/index"
import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false

//vue实例可以作为事件总线 $bus
Vue.prototype.$bus = new Vue()

//使用组件封装的插件toast  作用：能使用js方式来调用  this.$toast
Vue.use(toast)

//解决移动端300ms延迟问题
FastClick.attach(document.body)

//图片懒加载
Vue.use(VueLazyLoad,{
  //js里引入图片
  loading:require("./assets/img/common/placeholder.png")
})


new Vue({
  //router:router的简写
  router,
  store,
  render: h => h(App)
}).$mount('#app')
