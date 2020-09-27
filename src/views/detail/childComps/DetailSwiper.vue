<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item,key) in topImages" :key="key">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper/index"

export default {
  components:{
    Swiper, SwiperItem
  },
  props:{
    topImages:{
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
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style scoped>
.detail-swiper{
  height:300px;
  overflow: hidden;

}

</style>