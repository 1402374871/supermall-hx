<template>
  <div id="profile">
    <profile-nav-bar></profile-nav-bar>
    <profile-avatar></profile-avatar>
   <div class="bar">
     <balance></balance>
     <discount></discount>
     <points></points>
   </div>
    <messages></messages>


  </div>

</template>

<script>
  import ProfileNavBar from './childComs/ProfileNavBar'
  import ProfileAvatar from './childComs/ProfileAvatar'
  import Balance from './childComs/Balance'
  import Discount from './childComs/Discount'
  import Points from './childComs/Points'
  import Messages from './childComs/Messages'
  export default {
    name: "Profile",
    components: {
      ProfileNavBar,
      ProfileAvatar,
      Balance,
      Discount,
      Points,
      Messages

    }
  }
</script>

<style scoped>
  #profile {
   padding-top: 0px;
  }
  .bar {
    display: flex;
    width: 100%;

  }
</style>
