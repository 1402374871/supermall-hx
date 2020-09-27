<template>
  <div class="cart-nav">
    <nav-bar class="nav-bar"><div slot="center">购物车({{length}})</div></nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import {mapGetters} from "vuex"

export default {
  components:{
    NavBar
  },
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{
    // ...mapGetters(['cartLength'])
    //第二种取别名写法
    ...mapGetters({
      length:'cartLength',
    })

  },
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color:white;
  font-weight: 500
  
}
</style>