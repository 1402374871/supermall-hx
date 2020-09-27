<template>
  <div class="tabcontrol">
    <div v-for="(item,index,key) in titles" :key="key" 
    class="tabcontrol-item" 
    :class="{active:index===currentIndex}" 
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index;
      this.$emit('tabClick',index)
    }
   
  }
}
</script>
<style scoped>
.tabcontrol{
  display: flex;
  text-align: center;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}
.tabcontrol-item{
  flex:1;
} 
.tabcontrol-item span{
  padding: 5px;
}
.active{
  color: var(--color-high-text);
  
}
.active span{
  border-bottom:3px solid var(--color-tint);
}
</style>