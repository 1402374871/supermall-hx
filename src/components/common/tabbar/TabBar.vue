<template>
    <div id="tab-bar">
      <!-- 插槽存在的目的就是能让父子组件相互结合，不然在父组件里写的内容，在用子组件时会被完全替代，有了插槽后在下次使用父组件时，
      里面的内容只会替代插槽 -->
      <slot></slot>
    </div>
</template>

<script>
import TabBarItem from './TabBarItem'
export default {
  components: {
    TabBarItem
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  box-shadow: 0px, -3px, 2px, rgba(100, 100, 100, 0.1);
}

</style>