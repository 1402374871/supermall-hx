<template>
  <div id="detail">
    <detail-navBar @titleClick="titleClick" ref="nav"></detail-navBar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <toast :message="message" :isShow="isShow"></toast>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "components/common/toast/Toast";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { backTopMinxin } from "common/mixin";
import { debounce } from "common/utils";

export default {
  //这里要取名name为detail，不然keep-alive里的exclude属性找不到组件
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast,
  },
  props: {},
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      dat: [],
      currentIndex: 0,
      message: "",
      isShow: false,
    };
  },
  created() {
    //1.保存goodsitem点击后跳转到详情页的iid
    this.iid = this.$route.params.iid;

    //2.根据iid请求详情数据
    //返回带参数的axios实例，会自动请求返回一个promise对象然后返回数据到res
    getDetail(this.iid).then((res) => {
      console.log(res);
      //1.获取数据
      const data = res.result;

      //2.取出轮播图数据
      this.topImages = data.itemInfo.topImages;

      //3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //4.获取店铺信息
      this.shopInfo = new Shop(data.shopInfo);

      //5.获取商品细节数据
      this.detailInfo = data.detailInfo;

      //6.获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //7.获取评价
      this.commentInfo = data.rate.list[0] || {};
    });

    //3.请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    this.getThemeTopY = debounce(() => {
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 100);
  },

  mounted() {},
  mixins: [backTopMinxin],
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.currentIndex = index;
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      //1.滑动切换导航
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      //2.判断是否显示back-top,方法里面的不能抽，要不然合并时会覆盖这个contentScroll方法，这样里面其余的操作就没了
      this.isShowBackTop = -position.y > 5000;
      // console.log(position)
    },
    addToCart() {
      const product = {};
      product.img = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //第一种：普通封装插件方式
      this.$store.dispatch("addToCart", product).then((res) => {
        // this.message = res;
        // this.isShow = true;
        // setTimeout(() => {
        //   this.message = "";
        //   this.isShow = false;
        // }, 2000);
        this.$toast.show(res,2000)
      });
    },
  },
};
</script>
<style scoped>
#detail {
  height: 100vh;
  position: relative;
  background-color: #fff;
}
.content {
  height: calc(100vh - 44px);
}
</style>