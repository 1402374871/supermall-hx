import {ADD_COUNTER ,ADD_CART}from "./mutation-types"
export default {
  //context={state,commit}  对象的结构
  addToCart(context,payload){
    return new Promise((resolve,reject)=>{
      let oldProduct = context.state.cartList.find(item=>{
        return item.iid === payload.iid
      })
      if(oldProduct){
        context.commit(ADD_COUNTER,oldProduct)
        resolve("当前商品数量+1")
      }else{
        payload.count=1
        context.commit(ADD_CART,payload)
        resolve("已加入购物车")
      }
    })
  }
}
