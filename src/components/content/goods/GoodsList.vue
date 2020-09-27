<template>
  <div class="goods">
    <goods-list-item v-for="(item,key) in goods" :key="key" :goods-item="item"/>
    <!-- {{goods}} -->
  </div>
</template>

<script>
import GoodsListItem from "components/content/goods/GoodsListItem"
export default {
  components:{
    GoodsListItem
  },
  props:{
    goods:{
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
.goods{
  display: flex;
  /* 包裹，是数据可以在不同行显示，如果不包裹，则所有数据会挤在同一行均等分排列看不清 */
  flex-wrap: wrap;
  /* 将区域均等分（让边缘留白相等），两边留白合起来等于中间留白 */
  justify-content: space-around;
  padding: 2px;
}

</style>