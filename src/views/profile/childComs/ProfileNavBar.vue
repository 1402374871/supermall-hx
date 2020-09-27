<template>
  <div class="nav-bar">
    <nav-bar>
      <div slot="center">我的信息</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "ProfileNavBar",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
}

</style>
