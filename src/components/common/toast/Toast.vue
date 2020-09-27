<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
export default {
  components:{},
  // props:{
  //   message:{
  //     type:String,
  //     default:""
  //   },
  //   isShow:{
  //     type:Boolean,
  //     default:false
  //   }
  // },
  data(){
    return {
      message:"",
      isShow:false
    }
  },
  watch:{},
  computed:{},
  methods:{
    show(message,duration=2000){
      this.message = message;
      this.isShow = true;
      setTimeout(()=>{
        this.message = "";
        this.isShow = false;
      },duration)
    }
  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.toast{
  position: fixed;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  color: #ffffff;
  background-color: rgba(0,0,0, .6);
  
}
</style>