<template>
    <div class="plistinfo">
      <!--banner-->
      <div class="plistinfo_banner">
        <img :src='banner' alt="" class="plistinfo_banner_banner">
        <div class="plistinfo_banner_content">
          <span class="plistinfo_banner_content_but" @click='topDown()'>
            <img src="../../assets/images/close_icon.png" alt="" :class="imgTopDown? 'img_top' : 'img_down'">
          </span>
          <span  class="plistinfo_banner_content_text" :class="{plistinfo_banner_content_text_height:!imgTopDown}" ref="text-height">{{context}}</span>
        </div>
      </div>
      <!--list-->
      <div  class="plistinfo_list" v-for="(item,index) in List" :key="index" @click="playMusic(index)">
        <span>{{item.filename}}</span>
        <img src="../../assets/images/download_icon.png" alt="">
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import { PLAY_AUDIO } from '../../mixins' //播放
    export default {
      name: "plistinfo",
      mixins: [PLAY_AUDIO],
      data(){
        return{
          //背景
          banner:'',
          //背景下文字
          context:'',
          //列表
          List:[],
          // 当前歌曲的specialid
          specialid:0,
          // 背景下文字的按钮
          imgTopDown:true,
          header:false
        }
      },
      methods:{
        //数据
        getRangInfoList(){
          // /proxy/plist/list/125032?json=true&specialid=${this.specialid}
          // /proxy/plist/list/${this.specialid}?json=true
          axios.get(`/proxy/plist/list/125032?json=true&specialid=${this.specialid}`,{
            headers:{ 'content-type':'text/html;charset=utf-8'}
          })
            .then(res=>{
             // console.log(res)
              this.banner = (res.data.info.list.imgurl.replace(/{size}/,'400'));
              this.context = res.data.info.list.intro;
              this.List = res.data.list.list.info;
              // title
              this.$store.commit('setHeadTitle', res.data.info.list.specialname);
              this.$store.commit('setLoading', false)
            })
            .catch(err=>console.log(err))
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
        //console.log(this.$route.params.specialid)
        this.specialid = this.$route.params.specialid;
        this.getRangInfoList();
      },
      //  vue组件级路由钩子函数(beforeRouteEnter/beforeRouteUpdate/beforeRouteLeave)
      // beforeRouteEnter 函数内部 this 是undefined，这是因为在执行路由钩子函数beforRouteEnter时候，组件还没有被创建出来；先执行beforRouteEnter，再执行组件周期钩子函数beforeCreate。
      //  在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      //  因为当钩子执行前，组件实例还没被创建
      //一个组件有二级导航的时候，点击二级导航的时候导航路径更新了，会触发路由钩子函数beforeRouteUpdate。
      // beforeRouteLeave 离开组件的时候触发

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
    }
</script>

<style scoped lang="less">
  .plistinfo{
    margin-top: -40px;
    //banner
    .plistinfo_banner{
      .plistinfo_banner_banner{
         width: 100%;
         height: 250px;
         object-fit: cover;
       }
      .plistinfo_banner_content{
        width: 96%;
        padding: 10px 2%;
        font-size: 16px;
        text-align: justify;
        .plistinfo_banner_content_but{
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
        .plistinfo_banner_content_text{
          width: 91%;
          display: inline-block;
          line-height: 140%;
          height: 55px;
          overflow: hidden;
        }
        .plistinfo_banner_content_text_height{
          height: auto;
        }
      }
    }
    //context
    .plistinfo_list{
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
