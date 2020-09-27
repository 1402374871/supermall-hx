import BackTop from "components/content/backTop/BackTop";
export const backTopMinxin={
  components:{
    BackTop
  },
  data(){
    return {
      isShowBackTop: false
    }
  },
  methods:{
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
      //refs可以取元素，也可以取组件，这里直接取得组件，然后调用其封装的属性方法，如果不封装方法要先获得对象再取方法，因为scrollTo方法
      //scroll对象才有
    }
  }
}