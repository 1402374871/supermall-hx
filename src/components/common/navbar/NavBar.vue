<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style scoped>
/* 给nav-bar添加背景颜色，但该组件并不是在每个场景背景色都一样，
所以要在特定应用场景中设置，如Home中*/
  .nav-bar{
  height:44px;
  line-height: 44px;
  display: flex;
  text-align: center;
  text-shadow: 0,1px,1px rgba(100,100,100,.1);
  }
  .left,.right{
    width: 60px;
    
  }
  .center{
    flex: 1;
    
  }
</style>