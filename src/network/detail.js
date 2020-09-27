import {request} from "./request"
//不是默认导出的要引用必须加大括号
export function getDetail(iid){
  return request({
    //返回一个instance实例，然后把参数传进去，即返回带参数的instance实例，即网络请求
    //axions实例里的params是添加到url请求字符串的，可以在浏览器输入字符串请求检验
    url :'/detail',
    params:{
      iid
    }
  })
}


export function getRecommend(){
  return request({
    url:'/recommend'
  })
}

export class Goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods

  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
