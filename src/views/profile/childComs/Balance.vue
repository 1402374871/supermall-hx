<template>
  <div class="money">
    <profile-money>
      <p slot="top" class="top"><span>0.00</span>元</p>
      <p slot="bottom">我的余额</p>
    </profile-money>
  </div>
</template>

<script>
  import ProfileMoney from './ProfileMoney'

  export default {
    name: "money",
    components: {
      ProfileMoney
    }
  }
</script>

<style scoped>
  .money {
    flex:1
   
  }
  .top span{
     font-size: 25px;
    color:#ff9950;
    
    font-weight: 700;
  }
</style>
