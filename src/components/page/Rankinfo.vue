<template>
  <div class="rankinfo">
      <div class="rankinfo_banner">
        <img :src='banner' alt="" class="rankinfo_banner_banner">
        <!--直接调用函数，return的值-->
        <span class="rankinfo_banner_time">最新更新日期:{{getDateTime()}}</span>
        <!--data里面的值-->
        <!--<span class="rankinfo_banner_time">最新更新日期:{{dateTime}}</span>-->
      </div>
      <div class="rankinfo_content" v-for="(item,index) in List" :key="index" @click="playMusic(index)">
            <span class="rankinfo_content-o" :class="{'one':index==0,'two':index==1,'three':index==2}">{{index+1}}</span>
            <span class="rankinfo_content-t">{{item.filename}}</span>
            <img src="../../assets/images/download_icon.png" alt="">
      </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { PLAY_AUDIO } from '../../mixins'
  export default {
      name: "rankinfo",
      mixins: [PLAY_AUDIO],
      data(){
        return{
          banner:'',
          List:[],
          id:'',
          dateTime:'',
          title:'',
          header:false,
          opacity: 0
        }
      },
      created(){
        this.id = this.$route.params.id;
        //console.log(this.id);
        this.getRankInfo();
        //获取时间
        this.getDateTime();
      },
      //进入之前调用钩子函数
      beforeRouteEnter (to, from, next) {
        next((vm) => {
          // nav隐藏 title 显示
           vm.$store.commit('showHead', true);
          //根据沿Y轴滚动的距离来给title加颜色
           window.onscroll = () => {
              vm.opacity = window.pageYOffset / 250;
              vm.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${vm.opacity})`})
           }
        });
      },
      //离开时候调用钩子函数
      beforeRouteLeave(to, from, next){
        // nav 显示  title 隐藏
        this.$store.commit('showHead', false);
        // Y轴滚动的距离
          window.onscroll = null;
           next()
          // next(true) 离开，next(false)不离开
      },
      methods:{
        //获取数据
        getRankInfo(){
          axios.get(`/proxy/rank/info/?rankid=${this.id}&page=1&json=true`,{
            headers:{
              'content-type':'text/html;charset=utf-8'
            }
          })
            .then((res)=>{
             // console.log(res)
              let img = res.data.info.banner7url.replace(/{size}/,"400");
              this.banner = img;
              this.List = res.data.songs.list;
              // title
              this.$store.commit('setHeadTitle', res.data.info.rankname);
              this.$store.commit('setLoading', false)
            })
            .catch(err => console.log('请求错误'))
        },
        //获取时间
        getDateTime(){
          const time = new Date();
          let year = time.getFullYear()
          let month = time.getMonth() + 1
             if(month<10){month = '0'+month}
          let date = time.getDate()
             if(date<10){date = '0'+date}
          return `${year}-${month}-${date}`
          //this.dateTime = year+`-`+month+`-`+date;
        }
      }
    }
</script>

<style lang="less" type="text/less">
 
  .rankinfo{
    // banner
    .rankinfo_banner{
      // banner pic
      .rankinfo_banner_banner{
        width: 100%;
        height: 250px;
        object-fit: cover;
        margin-top: -70px;
      }
      // time
      .rankinfo_banner_time{
        position: absolute;
        margin-top: 150px;
        font-size: 16px;
        left: 15px;
        color: white;
      }
    }
    //列表
    .rankinfo_content{
     // width: 90%;
      vertical-align: middle;
      padding: 10px;
      margin-left: 10px;
      border-bottom: 1px solid #e8e8e8;
      .rankinfo_content-o{
        width: 12px;
        height: 9px;
        display: inline-block;
        padding: 0 6px 8px 9px;
        left: 12px !important;
        border-radius: 8px;
        font-size: 10px;
        position: absolute;
        margin-top: 4px;
        color: gray;
        z-index: -1;
      }
      .rankinfo_content-t{
        width: 80% !important;
        display: inline-block !important;
        margin-left: 40px !important;
        font-size: 14px !important;
      }
      img{
        width: 20px;
        vertical-align: middle;
      }
    }
    //前三名 排行加样式
    @color:white !important;
    .one{
      color:@color;
      background-color: #E80000;;
    }
    .two{
      color:@color;
      background-color: #FF7200;
    }
    .three{
      color:@color;
      background-color: #F8B300;
    }
  }
</style>
