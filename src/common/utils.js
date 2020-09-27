//防抖函数：这是使scrollHeight刷新频率不那么高，原来一个图片刷新一次  只执行一次，返回一个函数该函数会执行多次
export function debounce(func,delay){
    let timer = null;
    //...args  剩余参数 用法：将多个参数表示为一个数组
    //function相当于是个闭包  闭包：能放问外部函数变量的函数   内部函数能访问外部函数所以能访问timer，并且返回给一个全局变量，
    //这样function就不会被处理，而function的存在依赖于debounce，所以debounce也不会被垃圾回收机制回收
    return function(...args){
      if(timer) clearTimeout(timer)
      timer = setTimeout(()=>{
        //apply和call都是函数对象用来改变函数this指向的(使this不指向本函数) 比如函数A.apply(函数B,数组参数) 指的是B替换A对象调用A的方法
        //这里指的就是返回的function 代替scrol组件里的refresh方法
        func.apply(this,args)
      },delay)
    }
}


// 时间格式化
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}


export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}
