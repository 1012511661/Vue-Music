<template>
  <!--底部控制面板-->
  <div class="player">
    <!--
    timeupdate:ontimeupdate 事件在视频/音频（audio/video）当前的播放位置发送改变时触发。
    ended:true/false 音频/视频(audio/video)如果播放位置位于音频的结尾时，则音频已结束。
    error:在音频/视频(audio/video)加载发生错误时触发。
    -->
    <!--
    autoplay:加载完后立即播放
    preload  hidden
    -->
    <audio :src="songData.play_url" autoplay id="audio" ref="audio" @timeupdate="change" @ended="SongNext" @error="SongNext"></audio>
    <div class="player_upDown" :class="upOrDown ? 'player_up' : 'player_down'" @click="upDown()" ></div>
    <div class="player_div" :class="upOrDown ? 'player_div_up' : 'player_div_down'">
      <img :src="songData.img" alt="" class="player_div_banner"  @click="getSong()">
      <div class="player_div_context"  @click="getSong()">
        <span class="player_div_context_title">{{songData.song_name}}</span>
        <span class="player_div_context_name">{{songData.author_name}}</span>
      </div>
      <div class="player_btn_group">
        <!--暂停 / 播放-->
        <span  @click="song" class="player_btn_group_stop" :class="{'player_btn_group_Nstop':video}"></span>
        <!--下一首-->
        <span @click="SongNext" class="player_btn_group_next"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters} from 'vuex'
    export default {
      name: "player",
      data(){
          return{
            upOrDown:false
          }
      },
      computed:{
        // songData 歌曲
        // video 暂停/播放
        // currentFlag 进度条
        // actionTime 播放长度
        ...mapGetters(['songData','video','currentFlag','startTime'])
      },
      methods:{
        //播放歌曲
        song(){
          var stopAudio =document.getElementById('audio');
          if (this.video){
            stopAudio.pause();
          }else {
            stopAudio.play();
          }
          this.$store.commit('video', !this.video);
        },
        //下一曲
        SongNext(){
          this.$store.dispatch('nextSong');
        },
        //播放面板按钮
        upDown(){
          if (this.upOrDown){
            this.upOrDown = !this.upOrDown
          }else{
            this.upOrDown = !this.upOrDown
          }
        },
        //获取歌词页面
        getSong(){
          // 底部播放面板消失
          this.$store.commit('isPlay',true);
        },
        //改变当前播放时间
        change(){
          // 获取播放时间
            //currentTime 属性设置或返回音频/视频播放的当前位置（以秒计）
          var times = document.getElementById('audio').currentTime;
           // 进度条 == true
          if (this.currentFlag) {
            document.getElementById('audio').currentTime = this.startTime.actionTime;
            // 进度条状态(使用/未使用)
            this.$store.commit('setCurrent', false);
          } else {
            // 改变当前播放时间
            this.$store.commit('setAudioTime', times);
         }
        }
      }
    }
</script>

<style lang="less" scoped  type="text/less">
.player{
  clear: both;
  position: fixed;
  bottom:0;
  width: 100%;
  left: 0;
  z-index: 99;
   .player_upDown{
     width: 30px;
     height: 30px;
     border-radius: 50%;
     background:#333333 url(../assets/images/close_icon.png) no-repeat center;
     background-size: 26px;
   }
  .player_up{
    transform:rotate(0)
  }
  .player_down{
   // background:#333333 url(../assets/images/close_icon.png) no-repeat center;
    transform:scaleY(-1) !important;
  }
   .player_div{
     padding: 10px;
     background-color: #252723;
     //图片
     .player_div_banner{
       width: 70px;
       height: auto;
     }
     //文字
     .player_div_context{
       display: inline-block;
       vertical-align: 50%;
       font-size: 16px;
       margin-left: 20px;
       width: 50%;
       span{
        display: block;
       }
       .player_div_context_name{
         padding-top: 10px;
       }
     }
     //按钮
     .player_btn_group{
      //  display: inline-block;
       margin-top: -60px;
       float: right;
       span{
         width: 36px;
         height: 45px;
         display: inline-block;
         margin-right: 10px;
       }
       .player_btn_group_stop{
         background: url("../assets/images/play_icon.png") no-repeat;
       }
       .player_btn_group_Nstop{
         background: url("../assets/images/pause_icon.png") no-repeat;
       }
       .player_btn_group_next{
         background: url("../assets/images/next_icon.png") no-repeat;
       }
     }
   }
  //播放面板显示
   .player_div_up{
     display: block;
   }
  //播放面板隐藏
   .player_div_down{
     display: none !important;
   }
}
</style>
