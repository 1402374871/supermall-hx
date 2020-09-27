<template>
  <!-- ref可以明确拿到该元素，不然可能拿的是app里面的或者home里面的 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";

export default {
  components: {},
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //1创建滚动对象
    this.scroll = new Bscroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    //2实时监听滚动位置
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    //监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
      // console.log("上拉加载更多")
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      //home组件创建完就发送网络请求，请求到图片，然后这是scroll组件里的scroll实例还没被new出来，没有方法
      //为解决这个bug，先判断scroll实例是否存在
      this.scroll && this.scroll.scrollTo(x, y, time);
     
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log("---")
    },
  },
};
</script>
<style scoped>
</style>