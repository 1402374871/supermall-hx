<template>
  <div class="recommend">
    <div v-for="(item,key) in recommends" :key="key" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
    }
  },
}
</script>
<style scoped>
.recommend{
  display: flex;
  width:100%;
  text-align: center;
  font-size: 12px;
  padding:10px 0 10px;
  border-bottom: 8px solid #eee ;
}
.recommend-item{
  flex:1;
}
.recommend-item img{
  width:80px;
  height: 80px;
  margin-bottom: 10px;
}
</style>