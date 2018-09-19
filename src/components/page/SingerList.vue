<template>
  <div class="singerList">
    <div class="singerList_content" v-for="(item,index) in list" :key="index" @click="getSingerInfo(item.singerid)">
      <img :src="item.imgurl.replace('{size}', '400')" alt="">
      <span>{{item.singername}}</span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "singer-list",
      data(){
        return{
          list:[],
          num:0,
          singerid:0
        }
      },
      //进入之前调用钩子函数
      beforeRouteEnter (to, from, next) {
        next((vm) => {
          // nav隐藏 title 显示
          vm.$store.commit('showHead', true);
          // 给title加颜色
          vm.$store.commit('setHeadStyle', {'background':'#2CA2F9'})
        });
      },
      //离开时候调用钩子函数
      beforeRouteLeave(to, from, next){
        // nav 显示  title 隐藏
        this.$store.commit('showHead', false);
        next() // next(true) 离开，next(false)不离开       
      },
      methods:{
        //数据
        getSingerList(){
           axios.get(`/proxy/singer/list/${this.num}?json=true`,{
             headers:{
               'content-type':'text/html;charset=utf-8'
             }
           })
             .then(res =>{
               this.list = res.data.singers.list.info;
               // title
               this.$store.commit('setHeadTitle', res.data.classname);
               this.$store.commit('setLoading', false)
             })
             .catch(err =>{console.log(err)})
        },
        //跳转到详细
        getSingerInfo(singerid){
          this.$router.push({path:`/Singer/info/${singerid}`})
        }
      },
      created(){
        this.num = this.$route.params.num;
        this.getSingerList();
      }
    }
</script>

<style scoped lang="less">
  .singerList{
    width: 100%;
    .singerList_content{
      width: 90%;
      padding: 10px 15px !important;
      border-bottom: 1px solid #e8e8e8;
      background: url("../../assets/images/arrow_icon.png")no-repeat right ;
      background-size: 10px;
      img{
        width: 65px;
        height: auto;
        vertical-align: middle;//把该元素放在父元素中间
      }
      span{
        vertical-align: middle;//把该元素放在父元素中间
        margin-left: 10px;
        color: black;
      }
    }
  }

</style>
