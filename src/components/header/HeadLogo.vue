<template>
 <div class="head-container">
   <div class="head-logo">
     <a href="#">
       <img src="http://m.kugou.com/v3/static/images/index/logo.png" alt="">
     </a>
   </div>
   <div class="head-search" @click="headSearch">
     <img src="http://m.kugou.com/v3/static/images/index/search.png" alt="">
   </div>
 </div>
</template>

<script>
    export default {
      name: "head-logo",
      methods:{
        headSearch(){
          this.$router.push({path:'/search'});
        }
      }
    }
</script>

<style lang="less">
  .head-container{
    position: fixed;
    width: 100%;
    height: 31px;
    background-color: #2CA2F9;
    top: 0;
    left: 0;
    padding: 10px;
    overflow: hidden;
    z-index: 99;
    .head-logo{
      height: 100%;
      float: left;
      img{
        height: 100%;
      }
    }
    .head-search{
      float: right;
      height: 28px;
      padding:2px 20px;
      img{
        height: 100%;
      }
    }
  }
</style>
