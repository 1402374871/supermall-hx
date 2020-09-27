<template>
  <div class="detailNavBar">
     <nav-bar  class="nav-bar">
      <div slot="center" class="title">
        <div v-for="(item,index,key) in titles" 
        :key="key" 
        class="title-item"
        :class="{active : index ===currentIndex}"
        @click="titleClick(index)">{{item}}</div>
      </div>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

export default {
  components:{
    NavBar,
  },
  props:{},
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex = index;
      this.$emit("titleClick",index)
    },
    backClick(){
      //back()和go(-1)都能返回
      this.$router.go(-1)
    }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
  .nav-bar {
    background-color: #fff;
    color: #666666;
    z-index: 999;
    position:relative;
  }
.title{
  display: flex;
}
.title-item{
  flex: 1;
  font-size: 15px;
}
.active{
  color: var(--color-high-text);
}
.back img{
  margin-top: 11px;
}
</style>