<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
     <tab-control :titles="['流行','新款','精选']" 
                    class="tab-control " 
                    @tabClick="tabClick" 
                    ref="tabControl01"
                    v-show="isTabFixed"
                    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" 
                    @tabClick="tabClick" 
                    ref="tabControl02"
                    ></tab-control>
      <!-- 不用插槽的话只写单标签即可 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
//项目自身使用的组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 公用(复用)组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

// 方法
import { getMultidata, getHomeGoods } from "network/home";
import {debounce} from "common/utils";

export default {
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabSetoffTop:0,
      isTabFixed:false,
      saveY:0

    };
  },
  computed: {
    //计算属性
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated(){
    //保证进入页面时是原来滚动的位置  
    //activated和deactivated钩子函数都是在keep-alive包裹下的组件有的
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    //有bug可以加这代码
    this.$refs.scroll.refresh()
  },
  deactivated(){
    //推出该页面时调用
    //scroll组件里的scroll对象的y值
    this.saveY = this.$refs.scroll.scroll.y
  },
  created() {
    //1.请求多个数据
    this.getMultidata();

    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

  },
  mounted() {
    //3.监听图片加载完成发射事件
    //必须在挂载里面做监听，在create里面可能（这里是回调所以可能拿到，回调时可能已经挂载上去了）拿不到refs里面的组件或元素
    const refresh = debounce(this.$refs.scroll.refresh,2);
    this.$bus.$on('itemImageLoad',()=>{
      refresh();
    })

  },
  methods: {
    //事件监听相关方法

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl01.currentIndex=index;
      this.$refs.tabControl02.currentIndex=index;
    },

    // 网络请求相关方法
    //请求多个数据
    getMultidata() {
      getMultidata().then((res) => {
        //函数内部的数据在函数执行完会消失
        //这里用this.result存储，箭头函数的this指的是父级，这里指的就是vue实例
        //实例里的result就是data里的result
        //垃圾回收机制，如果对象数据没被引用，就会回收，这里防止回收就用this.result
        //指向该数据地址，用来保存数据
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
      // cosole.log(this.result)这里打印空，因为请求是异步的，还没请求到就执行到这里了
    },
    getHomeGoods(type) {
      //请求商品数据
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //将请求数据存放到已经建好的数组   array.push(...ary)会将一个数组的内容拆分依次push给该数组  也可for循坏遍历push（麻烦）
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp()
      });
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
      //refs可以取元素，也可以取组件，这里直接取得组件，然后调用其封装的属性方法，如果不封装方法要先获得对象再取方法，因为scrollTo方法
      //scroll对象才有
    },
    contentScroll(position) {
      //1.判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;
      // console.log(position)

      //2.判断tab-control是否吸顶
      this.isTabFixed = -position.y > this.tabSetoffTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    //轮播图图片加载完
    swiperImageLoad(){
      this.tabSetoffTop= this.$refs.tabControl02.$el.offsetTop
    }
  }
};
</script>
<style scoped>
#home {
  /* vh：视图高度,即窗口高度  百分百 */
  height: 100vh;
}
.home-nav {
  background-color: pink;
  color: white;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  /* 到达距离顶部设置的px后，会自动把position设置为fixed（相当于两个属性），不同的浏览器可能有的支持有的不支持该属性 移动端一般所有属性都支持 */
  /* position: sticky; */
  /* top: 44px;
  background-color: white;
  z-index: 9; */
    position: relative;
    z-index: 9;
    background-color: white
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

</style>