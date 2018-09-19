<template>
  <div class="detail_player" v-if="isPlay">
    <!--banner-->
    <div class="detail_player_banner"  :style="{backgroundImage:`url(${songData.img})`}"></div>
    <div class="detail_player_content">
      <!--title-->
      <div class="detail_player_content_title">
        <img src="../assets/images/goback_icon.png" alt="" @click="goBack">
        <span>{{songData.audio_name}}</span>
      </div>
      <!--img-->
      <div class="detail_player_content_img"><img :src="songData.img" alt=""></div>
      <!--歌词-->
      <div class="detail_player_content_text">
        <div class="lrc-content" :style="{marginTop: lrcOffset + 'px' }">
          <p v-for="(item,index) in songLrc" :key="index"
             :class="{isCurrentLrc:item.seconds >= startTime.actionTime}">
            {{item.lrcContent}}</p>
        </div>
      </div>

      <!--进度条-->
      <div class="detail_player_go">
        <!-- 开始 -->
        <span id="startTime">{{startTime.actionTime | time}}</span>
        <!-- 进度条 -->
        <input type="range" :min="0" :max="songData.timelength/1000" v-model="startTime.actionTime" @change="rangeChange($event)">
        <!--@click.native="rangeClick($event)"-->
        <!-- 结束 -->
        <span>{{(songData.timelength/1000)| time }}</span>
      </div>
      <!--按钮组-->
      <div class="detail_player_btn">
        <i class="btn_Random" @click="SongRandom"></i>
        <i class="btn_prev" @click="SongPrev"></i>
        <i class="btn_run" :class="{'btn_stop':video}" @click="song"></i>
        <i class="btn_next" @click="SongNext"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters} from 'vuex';
    export default {
      name: "detail-player",
      data(){
        return{
        }
      },
      //过滤器 变形时间
      filters: {
        time(value){
          var length = Math.floor(parseInt(value));
          var minute = Math.floor(value / 60);
          if (minute < 10) {
            minute = '0' + minute;
          }
          var second = length % 60;
          if (second < 10) {
            second = '0' + second;
          }
          return minute + ':' + second;
        }
      },
      computed:{
        // songData 歌曲
        // isPlay 底部播放面板
        // video 播放/暂停
        // currentFlag 进度条状态(使用/未使用)
        // actionTime 播放时间
        ...mapGetters(['songData','isPlay','video','currentFlag','startTime']),
        //获取歌词
        songLrc(){
          if (this.songData.lyrics) {
            var temp = this.songData.lyrics.split('\r\n');
            temp = temp.splice(0, temp.length - 1);
            temp = temp.map((value)=> {
              var time = value.substr(1, 5);
              var seconds = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
              var lrcContent = value.substr(10);
              return {
                seconds,
                lrcContent
              }
            })
            return temp;
          }
        },
        lrcOffset(){
          if (this.songLrc) {
            var offset = (this.songLrc.length - document.querySelectorAll('.isCurrentLrc').length - 2) * (-35)
            return this.startTime.actionTime + offset - this.startTime.actionTime
          }
        }
      },
      methods:{
        //返回
        goBack(){
          this.$store.commit('isPlay',false);
        },
        //播放歌曲
        song(){
          var stopAudio =document.getElementById('audio');
          if (this.video){
            stopAudio.pause();
          }else {
            stopAudio.currentTime = this.startTime.actionTime;
            stopAudio.play();
          }
          this.$store.commit('video', !this.video);
        },
        //上一曲
        SongPrev(){
          this.$store.dispatch('prevSong');
        },
        //下一曲
        SongNext(){
          this.$store.dispatch('nextSong');
        },
        //随机歌曲
        SongRandom(){
          this.$store.dispatch('randomSong');
        },
        //改变进度条
        rangeChange(event){
          /**
           *  改变位置:
           *   1.先暂停,并修改下面的按钮
           *   2.位置改变后 在自动播放并修改下面的按钮
           * **/
          this.$store.commit('video', false);
          if (this.video == false){
            var offset = event.offsetX;//偏移位置
            var randeWidth = (document.documentElement.clientWidth - 20) * 0.8 - 20;//获取改变滚动条的宽度
            var clickLength = Math.floor(offset * (this.songData.timelength/1000)/ randeWidth);//歌曲时间按照滚动条的宽度进行比例转换
            if (offset < randeWidth) {
              // 改变当前播放时间
              this.$store.commit('setAudioTime', clickLength);
              // 进度条状态(使用/未使用)
              this.$store.commit('setCurrent', true)
            }
            document.getElementById('audio').currentTime = this.startTime.actionTime;
            this.$store.commit('video', true);
            document.getElementById('audio').play();
          }
        }
      }
    }
</script>

<style scoped lang="less" type="text/less">
  @px:10px;
 .detail_player {
   .detail_player_banner {
     opacity: 1;
    // filter:blur(15px);// 背景图片模糊
     filter:invert(26%);
     position: fixed;
     width: 100%;
     height: 100%;
     top: 5.1*@px;
     left: 0;
     z-index: 999;
     background-position: center;
     background-size: cover;
     background-repeat: no-repeat;
   }
   .detail_player_content {
     position: fixed;
     z-index: 999;
     width: 100%;
     top: 5.1*@px;
     //title
     .detail_player_content_title {
     //  background-color: #2CA2F9;
       img {
         vertical-align: middle;
        //  display: block;
         float: left;
         width: 15px;
         padding-left: 1.5*@px;
         padding-top: @px;
       }
       span {
         width: 90%;
         vertical-align: middle;
         padding-top: 10px;
         display: inline-block;
         font-size: 2*@px;
         text-align: center;
       }
     }
     //img
     .detail_player_content_img {
       width: 55%;
       margin-top: 2*@px;
       margin-left: 10*@px;
       img {
         width: 100%;
         border-radius: 50%;
         animation:start 20s infinite linear;/*匀速 循环*/
         @keyframes start{
           0%{ transform:rotate(0deg); }
           25%{ transform:rotate(180deg); }
           50%{ transform:rotate(360deg); }
           75%{ transform:rotate(-180deg); }
           100%{ transform:rotate(-360deg); }
         }
       }
     }
     //歌词
     .detail_player_content_text {
       width: 100%;
       height: 60px;
       overflow: hidden;
       margin-bottom: 20px;
       text-align: center;
       color: #fff;
       line-height:20px;
       font-size: 14px;
       background-color: grey;
       .lrc-content{
         transition: all 0.05s;
         transform: translateZ(0px);
         margin-top: -560px;
       }
     }
     //进度条
     .detail_player_go {
       span {
         width: 45px;
         height: 30px;
         display: inline-block;
         padding: 5px 10px;
       }
       span:nth-child(1) {
         margin-left: 15px;
       }
       //  横条样式
       input[type=range] {
         display: inline-block;
         -webkit-appearance: none; /*清除系统默认样式*/
         width: 60%;
         background: -webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd;/*设置左边颜色为#61bd12，右边颜色为#ddd*/
         /*background-size: 75% 100%;!*设置左右宽度比例*!*/
         height: 10px; /*横条的高度*/
       }
       /*拖动块的样式*/
       input[type=range]::-webkit-slider-thumb {
         -webkit-appearance: none; /*清除系统默认样式*/
         height: 26px; /*拖动块高度*/
         width: 26px; /*拖动块宽度*/
         background: #fff; /*拖动块背景*/
         border-radius: 50%; /*外观设置为圆形*/
         border: solid 1px #ddd; /*设置边框*/
       }
     }
     //按钮组
     .detail_player_btn {
       background-color: beige;
       i {
         display: block;
         width: 25%;
         float: left;
         height: 100px;
       }
       .btn_Random{
         background: url("../assets/images/random.png") no-repeat;
        // margin-left: 5%;
         background-size: 35% auto;
         background-position: center;
       }
       .btn_prev {
         background: url("../assets/images/play_prev.png") no-repeat;
        // margin-left: 13%;
         background-size: 40% auto;
         background-position: center;
       }
       .btn_run {
         background: url("../assets/images/play_play.png") no-repeat;
         background-size: 50% auto;
         background-position: center;
       }
       .btn_next {
         background: url("../assets/images/play_next.png") no-repeat;
         background-size: 40% auto;
         background-position: center;
       }
       .btn_stop {
         background: url("../assets/images/play_pause.png") no-repeat;
         background-size: 50% auto;
         background-position: center;
       }
     }
   }
 }
</style>
