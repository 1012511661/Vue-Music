<template>
  <div id="app">
     <!--头部-->
     <HeadTop />
     <!-- 
         v-if ==> display
         v-show ==>visityle 
         当数据请求完利用vuex改变loading里面的值,从而改变v-show
     -->
     <div v-show="isLoading" class="loading_div">
       <img src="@/assets/images/loading.gif" class="loading" alt="">
     </div>
     <!--内容-->
     <keep-alive> <!-- keep-alive 路由缓存-->
      <transition name="anim" mode="out-in"> <!-- transition 动画-->
       <div class="content"  v-show="!isLoading"><router-view></router-view></div>
      </transition>
     </keep-alive>
     <!--底部缩小版播放面板-->
     <Player/>
     <!--全屏播放面板-->
     <DetailPlayer />
  </div>
  <!--
    header:头部文件夹
      Head:头部整体
      HeadLogo:logo和搜索
      HeadNav:导航
      RankHead:导航显示则它隐藏,在详细页面中表示的是上级的名字

    Player: 底部的播放栏(缩小版)

    DetailPlayer:播放栏(全屏放大版)

    NewSongs:新歌

    Rank:排行
      RankInfo:排行详细列表

    Plist:歌单
       PlistInfo:歌单详细列表

    Singer:歌手
       SingerList:歌手列表
       SingerInfo:歌手详情

    Search:搜索
  -->
</template>

<script>
//引入组件
import HeadTop from "@/components/header/HeadT";
import Player from "@/components/Player";
import DetailPlayer from "@/components/DetailPlayer";
//loading 是否出现
import {mapGetters} from "vuex"
export default {
  name: "App",
  components: {
    HeadTop,
    Player,
    DetailPlayer 
  },
   mounted(){
    // 获取 vuex state/getters 里面的值
     // 方法 1 直接获取
    //console.log(this.$store.getters.isLoading,"vuex state/getters 方法 1 ")
   // console.log(this.isLoading,"vuex state/getters方法 2-1 ")
    //console.log(this.new,"vuex state/getters方法 2-2 ")
    //console.log(this.isLoading,"vuex state/getters 方法 3 ")
   // console.log(this.isLoading)
  },
  computed:{
      // 方法 2 
      ...mapGetters({
      //  isLoading: state => state.isLoading, //报错获取不到
        // 映射 this.new 为 store.getters.isLoading
         new: 'isLoading'
      }),
      // 方法 3 最常用
     ...mapGetters(['isLoading'])
  }
 
};
</script>

<style lang="less">
#app {
  font-family: 微软雅黑;
  .content {
    width: 100%;
    margin-top: 91px;
  }
  .content-active {
    margin-top: 51px;
  }
}
//loading
.loading_div{
  width: 100%;
  height: 666px;
  background: gainsboro;
  .loading {
    display: inline-block;
    margin-top: 180px;
    width: 100%;
  }
}

//动画
.anim-enter {
  //进入
  transform: translateX(100%);
}
.anim-enter-to {
  //进入后
  transform: translateX(0);
}
.anim-enter-active {
  //进入动画的时间
  transition: 0.5s;
}
@keyframes bounce {
  0% {
    transform: translate3d(0, -25px, 0);
    opacity: 0;
  }
  25% {
    transform: translate3d(0, 10px, 0);
  }
  50% {
    transform: translate3d(0, -6px, 0);
  }
  75% {
    transform: translate3d(0, 2px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
.anim-leave {
  //离开前
  transform: translateX(0);
}
.anim-leave-to {
  //离开后
  transform: translateX(-100%);
}
.anim-leave-active {
  //离开动画的时间
  transition: 0.5s;
}
</style>
