<template>
  <div class="cart-bottom-bar">
    <div class="total-check">
      <!-- <img src="~assets/img/cart/tick.svg" alt /> -->
      <check-button @click.native="selectAllClick" :is-check="isSelectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计:￥{{totalPrice}}</span>
    </div>
    <div class="calc" @click="calcClick">去结算({{calcCount}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked === true;
        })
        .reduce((prev, item) => {
          return prev + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    calcCount() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked === true;
      }).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) {
        return false;
      }
      return !this.$store.state.cartList.filter((item) => !item.checked).length;
    },
  },
  methods: {
    selectAllClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick(){
      if(!this.$store.state.cartList.filter((item) => item.checked).length){
        this.$toast.show("请选择购买的商品")
      }
    }
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 49px;
  background: #eeeeee;
  display: flex;
  line-height: 40px;
  text-align: center;
}
.total-check {
  width: 25%;
  display: flex;
  justify-content: center;
}
.total-price {
  width: 50%;
}
.calc {
  width: 25%;
  background-color: #ff5028;
  color: #fff;
}
</style>
