<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- <li v-for="(item,index) in cartList" :key="index">{{item}}</li> -->
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem"

export default {
  components: {
    Scroll,
    CartListItem
  },

  props: {},
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
    // 查看scroll实例状态，看其中scrollheight是否比wrapperheight高度大  不然不能滚动
    // console.log(this.$refs.scroll.scroll);
  },
};
</script>
<style scoped>
/* 坑点：使用cal属性的时候符号两边要有空格不然属性不生效 */
.cart-list {
  height: calc(100vh - 44px - 49px);
  /* height: 100%;
  vh就是当前屏幕可见高度的1%，也就是说

height:100vh == height:100%;

但是当元素没有内容时候，设置height:100%，该元素不会被撑开，此时高度为0，

但是设置height:100vh，该元素会被撑开屏幕高度一致。 

两者没明显区别，只是初始值不同
*/
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>