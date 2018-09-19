<template>
  <div class="rank_head container" :style="cStyle">
    <img src="../../assets/images/goback_icon.png" alt="" class="rank_head_back"  @click="goBack">
    <span>{{title}}{{istitleName}}</span>
  </div>
    <!--<p>{{head.title}}</p>-->
</template>

<script>
  import { mapGetters } from 'vuex'
  // 自己引入vuex里面的数据,不通过父子传参
    export default {
      name: "rank-head",
      // 父子传参
      props: ['title', 'to', 'cStyle'],
      data(){
        return{
        }
      },
      methods:{
        //返回
        goBack:function () {
          this.$router.go(-1)
        }
      }
      ,
      computed: {
        ...mapGetters(['istitleName'])
      },
    }
</script>

<style scoped lang="less">
  .rank_head{
    width: 100%;
    height: 43px;
    line-height: 43px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    position: fixed;
    top: 51px;
    left: 0;
    z-index: 999;
    .rank_head_back{
      vertical-align: middle;
      display: block;
      float: left;
      width: 15px;
      position: absolute;
      left: 5px;
      top: 10px;
    }
  }

</style>
