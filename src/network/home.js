import {request} from "./request"
//不是默认导出的要引用必须加大括号
export function getMultidata(){
  return request({
    url :'/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      // type:type
      type,
      page
    }
  })
}