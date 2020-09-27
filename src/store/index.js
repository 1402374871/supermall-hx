import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations.js"
import actions from "./actions.js"
import getters from "./getters"

//1.安装使用插件
Vue.use(Vuex)

//2.创建实例
const state={
  cartList:[]
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store