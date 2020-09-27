<template>
  <div id="app">
    <!-- 排除detail组件，不然再进无法执行create和destory，无法获取新的id -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: "app",
  components: {
    MainTabBar,
  },
};
</script>

<style>
/*css 引入方式*/
@import "assets/css/base.css";
</style>
