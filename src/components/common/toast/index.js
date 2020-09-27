import Toast from "./Toast"
const obj={};

//Vue.use("插件")  即会调用对象的install方法
obj.install = function(Vue){
  //1.创建组件构造器
  const toastConstruct = Vue.extend(Toast)

  //2.根据构造器创建组件对象
  const toast = new toastConstruct;

  //3.将组件对象手动挂载到一个元素上
  toast.$mount(document.createElement("div"))

  //4.toast.$el就是指的挂载的html元素或返回html元素的函数  即div
  document.body.appendChild(toast.$el)

  //5.设置其余组件使用该插件  给组件原型增加$toast属性
  Vue.prototype.$toast = toast

}
export default obj