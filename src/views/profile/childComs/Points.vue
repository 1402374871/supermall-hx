<template>
  <div class="jifen">
    <profile-money>
      <p slot="top" class="top">
        <span>0</span>分
      </p>
      <p slot="bottom">我的积分</p>
    </profile-money>
  </div>
</template>

<script>
import ProfileMoney from "./ProfileMoney";

export default {
  name: "jifen",
  components: {
    ProfileMoney,
  },
};
</script>

<style scoped>
.jifen {
  flex:1
}

.top span {
  color: #ff9950;
  font-size: 25px;

  font-weight: 700;
}
</style>
