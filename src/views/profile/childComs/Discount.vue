<template>
  <div class="youhui">
    <profile-money>
      <p slot="top" class="top"><span>0</span>个</p>
      <p slot="bottom">我的优惠</p>
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
  .youhui {
    flex:1
  }
  .top span{
    color: #ff9950;
    font-size: 25px;
    font-weight: 700;
  }
</style>
