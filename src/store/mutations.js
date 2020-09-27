import {ADD_COUNTER}from "./mutation-types"
import {ADD_CART} from "./mutation-types.js"
//引入常量必须添加大括号包起来

export default {
    [ADD_COUNTER](state,payload){
      payload.count++
    },
    [ADD_CART](state,payload){
      payload.checked = true
      state.cartList.push(payload)
    }
}