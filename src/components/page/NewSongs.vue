<template>
  <!--首页-->
      <div class="newSongs" ref="newSongs">
       <el-carousel height="150px">
          <el-carousel-item v-for="(banner,index) in bannerList" :key="index">
            <a :href="banner.extra.tourl">
              <img :src="banner.imgurl" :alt="banner.title">
            </a>
          </el-carousel-item>
        </el-carousel>
        <div v-for="(song,index) in List" :key="index" class="newSongs_song" @click="playMusic(index)">
        <div>
          <span>{{song.filename}}</span>
          <img src="../../assets/images/download_icon.png" alt="">
        </div>
        </div>
      </div>
</template>

<script>
var aaa;
import axios from "axios";
import { PLAY_AUDIO } from "../../mixins";
// 播放  =》在JS文件夹公共写
export default {
  name: "new-songs",
  mixins: [PLAY_AUDIO],
  data() {
    return {
      bannerList: [],
      List: [],
      hash: "",
      setIntTime: null //利用beforeDestroy 钩子函数 清除定时器或者是监听事件
    };
  },
  methods: {
    //获取数据
    getContent() {
      let msgUrl = encodeURIComponent("http://m.kugou.com/?json=true");
      // axios.get('/proxy/?json=true',{
      axios
        .get(
          `http://59.152.38.197:8188/SmartHotelInterface/api/commonJump/allInterface?requestUser=sxbctv&requestPassword=123456&requestUrl=${msgUrl}`,
          {
            //参数
            params: { page: "json" },
            //请求头
            headers: {
              "content-type": "text/html;charset=utf-8"
              // 'Access-Control-Allow-Origin':'*'
            }
          }
        )
        .then(res => {
          //console.log(res);
          this.bannerList = res.data.banner;
          this.List = res.data.data;
          this.$store.commit("setLoading", false);
        })
        .catch(err => {
          console.log("错误");
        });
    },
    //第一种
    abc() {
      console.log("beforeDestroy 111111");
    },
    //第二种
    setIntTimeTwo() {
      const timer = setInterval(() => {
          console.log("beforeDestroy 222222222");
      }, 1000);
      // 事件侦听器
      //https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8
      //https://juejin.im/post/5b174de8f265da6e410e0b4e
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    }
  },
  created() {
    this.getContent();
    //第一种清除定时器  需要爱data里面声明下一个变量用来指定定时器函数 不推荐
    //this.setIntTime = setInterval(this.abc, 1000);
    //第二种 优化后的清除定时器  推荐
    //https://juejin.im/post/5b174de8f265da6e410e0b4e
    //this.setIntTimeTwo();
  },
  beforeDestroy() {
    //console.log(this.setIntTime);
    //setInterval执行后会返回一个数字非0的id
    window.clearInterval(this.setIntTime);
    this.setIntTime = null;
  }
};
</script>

<style lang="less" type="text/less">
.newSongs {
  //banner
  .el-carousel {
    .el-carousel__container {
      img {
        border: 0 none !important;
        height: auto !important;
        max-width: 100% !important;
        vertical-align: top !important;
        object-fit: cover !important;
      }
    }
  }
  //content
  .newSongs_song {
    width: 100%;
    //height: 50px;
    border-bottom: 1px solid #e8e8e8;
    div {
      padding: 15px 0;
      span {
        font-size: 14px;
        padding-left: 15px;
        vertical-align: middle;
        display: inline-block;
        width: 85%;
      }
      img {
        float: right;
        padding-right: 20px;
        width: 20px;
      }
    }
  }
}
</style>
