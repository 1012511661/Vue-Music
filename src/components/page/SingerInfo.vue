<template>
  <div class="singerinfo">
    <!--banner-->
    <div class="singerinfo_banner">
      <!--<div  class="singerinfo_banner_head">-->
      <!--<img src="../../assets/images/goback_icon.png" alt="" class="singerinfo_banner_goback"  @click="goBack">-->
        <!--<span class="singerinfo_banner_title">{{title}}</span>-->
      <!--</div>-->
      <img :src='banner' alt="" class="singerinfo_banner_banner">
      <div class="singerinfo_banner_content">
          <span class="singerinfo_banner_content_but" @click='topDown()'>
            <img src="../../assets/images/close_icon.png" alt="" :class="imgTopDown? 'img_top' : 'img_down'">
          </span>
        <span  class="singerinfo_banner_content_text" :class="{singerinfo_banner_content_text_height:!imgTopDown}">{{context}}</span>
      </div>
    </div>
    <!--list-->
    <div  class="singerinfo_list" v-for="(item,index) in List" :key="index" @click="playMusic(index)">
      <span>{{item.filename}}</span>
      <img src="../../assets/images/download_icon.png" alt="">
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { PLAY_AUDIO } from '../../mixins' //播放 playMusic(index)
    export default {
      name: "singer-info",
      mixins: [PLAY_AUDIO],
      data(){
        return{
          banner:'',
          title:'',
          context:'',
          List:[],
          specialid:0,
          imgTopDown:true,
          header:false
        }
      },
      //通过路由的before钩子解除router-view缓存限制
      beforeRouteEnter (to, from, next) {
        next(vm => {
          // nav隐藏 title 显示
          vm.$store.commit('showHead', true)
          //根据沿Y轴滚动的距离来给title加颜色
          window.onscroll = ()=> {
            vm.opacity = window.pageYOffset / 250
            vm.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${vm.opacity})`})
          }
        })
      },
      beforeRouteLeave(to, from, next){
        // nav 显示 title隐藏
        this.$store.commit('showHead', false)
        // Y轴滚动的距离
        window.onscroll = null
        next()
      },
      methods:{
        //数据
        getSingerInfo(){
          axios.get(`/proxy/singer/info/${this.singerid}&json=true`,{
            headers:{
              'content-type':'text/html;charset=utf-8'
            }
          })
            .then(res=>{
              //console.log(res)
              this.banner = (res.data.info.imgurl.replace(/{size}/,'400'));
              this.context = res.data.info.intro;
              this.List = res.data.songs.list;
              // title
              this.$store.commit('setHeadTitle', res.data.info.singername);
              this.$store.commit('setLoading', false)
            })
            .catch(err => console.log(err))
        },
        //展示text
        topDown(){
          if (this.imgTopDown == true){
            this.imgTopDown = !this.imgTopDown
          }else{
            this.imgTopDown = !this.imgTopDown
          }
        },
        //返回
        goBack:function () {
          this.$router.go(-1)
        }
      },
      created(){
        this.singerid = this.$route.params.singerid;
        this.getSingerInfo();
      }
    }
</script>

<style scoped lang="less">
  .singerinfo{
    margin-top: -40px;
    //banner
    .singerinfo_banner{
      .singerinfo_banner_banner{
        width: 100%;
        height: 250px;
        object-fit: cover;
      }
      .singerinfo_banner_content{
        width: 96%;
        padding: 10px 2%;
        font-size: 16px;
        //position: relative;
        text-align: justify;
        .singerinfo_banner_content_but{
          float: right;
          img{
            width: 30px;
            height: auto;
          }
          .img_top{
            transform:rotate(0);
          }
          .img_down{
            transform:rotate(180deg)
          }
        }
        .singerinfo_banner_content_text{
          width: 91%;
          display: inline-block;
          line-height: 140%;
          height: 55px;
          overflow: hidden;
        }
        .singerinfo_banner_content_text_height{
          height: auto;
        }
      }
    }
    //context
    .singerinfo_list{
      vertical-align: middle;
      padding: 10px;
      margin-left: 10px;
      border-bottom: 1px solid #e8e8e8;
      span{
        width: 86% !important;
        display: inline-block !important;
        margin: 0 10px;
        font-size: 14px !important;
      }
      img{
        width: 20px;
        vertical-align: middle;
      }
    }
  }

</style>
