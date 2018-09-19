<template>
  <div class="search">
    <!--搜索栏-->
    <div class="search_input">
      <span class="search_icon"></span>
      <input type="text" v-model="msg" placeholder="歌手/歌名/拼音" @input="searchInput" v-name="dirName"/>
    </div>
    <a href="javascript:;" @click="search" class="search_btn">搜索</a>
    <!--展示栏 /默认展示热门-->
    <div class="search_text" v-if="hotSong">
      <!--统计栏-->
      <div class="search_num">
        热门推荐
      </div>
      <!--数据栏-->
        <div  class="search_list" v-for="(item,index) in hotList" :key="index" >
          <a href="javascript:;">
            <span>{{item.keyword}}</span>
          </a>
        </div>
    </div>
    <!--展示栏 /搜索的结果-->
    <div class="search_text" v-else>
      <!--统计栏-->
      <div class="search_num">
        共有{{ListLength}}条搜索结果/展示前{{showNum}}条
      </div>
      <!--数据栏-->
        <div class="search_list-search"  v-for="(item,index) in List" :key="index" @click="playMusic(index)">
         <div class="search_list_div">
           <span class="search_list_title">{{item.filename}}</span>
         </div>
          <!--<img src="../../assets/images/download_icon.png" alt="">-->
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { PLAY_AUDIO } from "../../mixins";
export default {
  name: "search",
  mixins: [PLAY_AUDIO],
  data() {
    return {
      msg: "",
      num: 0,
      hotList: [],
      List: [],
      ListLength: 0,
      hotSong: true,
      showNum:50
    };
  },
  created() {
    this.getHotList();
  },
  methods: {
    //热门推荐
    getHotList() {
      axios
        .get("/aproxy/api/v3/search/hot?format=json&plat=0&count=30", {
          headers: {
            "content-type": "text/html;charset=utf-8"
          }
        })
        .then(res => {
          this.hotList = res.data.data.info;
          //console.log(this.hotList)
        })
        .catch(err => {
          console.log(err);
        });
    },
    //搜索结果
    search() {
      //搜索框的数据
      if (this.msg == "") {
        alert("请输入内容后在搜索");
      } else {
        this.hotSong = false;
        // 搜索
        //pagesize=showNum 选择搜索结果的前 n 条
        axios
          .get(`/aproxy/api/v3/search/song?format=json&keyword=${this.msg}&page=1&pagesize=${this.showNum}&showtype=1`,
            {
              headers: {
                "content-type": "text/html;charset=utf-8"
              }
            }
          )
          .then(res => {
            this.List = res.data.data.info;
            //总共搜索出来的条数
            this.ListLength = res.data.data.total;
          })
          .catch(err => {
            console.log(err);
          });
        //input 恢复
        this.msg = "";
      }
    },
    searchInput(){
     console.log("这里是 单纯的 oninput 事件,未使用防抖 ")
    },
    dirName(){
     //console.log("防抖写法,并请求数据")
      this.search();
    }
  },
  //监听input里面输入的值有两种方法
   // 1. 利用 watch 但必须用v-model 
   // 2. oninput事件  不需要跟v-model 绑定
  watch:{
    msg(){  
      //console.log("这里使用 watch 监听 input 里面的内容变化")
    }
  },
  // vue的自定义指令
  directives:{//自定义指令
    name:{ //自定义指令的名字 v-name中的name可以自由更换，但必须和这里的保持一致
    /**
     *  inserted: 自定义指令的其中一个钩子
     *  即:被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）
     *    只搜索特定间隔时间内左右一次的结果进行具体操作
     * **/
    inserted:(el, binding)=> {
        let timer;
        el.addEventListener('input', () => {
          //为什么 change 没有效果
          // onchange事件要失去焦点后才能触发,就是在input里面输入内容后，需要点击其他地方让其失去焦点才可以执行
          // 这里需要监听的是input的变化,利用节流,让其做在一定的时间内边输入边变化
          // 所以可以用 onkeyup oninput
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            binding.value()
          }, 3000)
        })
      }
    }
  },
};
</script>

<style scoped lang="less">
.search {
  width: 95%;
  padding: 2.5%;
  background-color: #fbfbfb;
  height: 55px;
  //搜索
  .search_input {
    width: 80%;
    height: 65%;
    display: block;
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    float: left;
    background-color: #fff;
    .search_icon {
      display: block;
      float: left;
      width: 10%;
      height: 100%;
      background: url("../../assets/images/search_icon.png") no-repeat center;
      background-size: auto 100%;
    }
    input {
      width: 90%;
      height: 100%;
      display: inline-block;
      border: none;
      outline: none;
      background-color: transparent;
    }
  }
  .search_btn {
    text-decoration: none;
    display: block;
    height: 65%;
    width: 18%;
    background-color: #2ba2fa;
    float: right;
    border-radius: 7px;
    color: #fff;
    font-size: 15px;
    text-align: center;
    line-height: 35px;
    border: none;
    outline: none;
  }
  .search_text {
    margin-top: 50px;
    width: 100%;
    position: absolute;
    right: 0;
    left: 0;
    //数量
    .search_num {
      width: 97%;
      padding-left: 3%;
      height: 29px;
      font-size: 14px;
      line-height: 29px;
      background-color: #e1e1e1;
      color: #484848;
    }
    .search_list {
      width: 100%;
      border-bottom: 1px solid #e8e8e8;
      a {
        text-decoration: none !important;
        color: #484848;
        display: inline-block;
        min-height: inherit;
        padding: 15px 0;
        margin-left: 5%;
        font-size: 15px;
      }
    }
    .search_list-search {
      color: #484848;
      display: inline-block;
      min-height: inherit;
      overflow: hidden;
      padding: 15px 2.5%;
      width: 95%;
      border-bottom: 1px solid #e8e8e8;
      font-size: 15px;
      .search_list_div {
        background: url("../../assets/images/download_icon.png") no-repeat;
        background-position: 96% 50%;
        background-size: 20px auto;
        span {
          width: 91%;
          display: inline-block;
        }
      }
    }
  }
}
</style>
