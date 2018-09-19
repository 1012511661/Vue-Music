/**
 * Created by Administrator on 2016/11/5.
 */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const store = new Vuex.Store({
  // state => 基本数据
  // getters => store的计算属性,简单来说就是存放一些公共函数供组件调用,从基本数据派生的数据
  // mutations(同步 commit) => 提交更改数据的方法，同步！
  // actions(异步 dispatch) => 提交更改数据的方法，异步！ 像一个装饰器，包裹mutations，使之可以异步。
  // modules => 模块化Vuex

  //mutations 与事件类似，更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
  //mutation 像事件注册，需要相应的触发条件。而 Action 就那个管理触发条件的。
  //Action 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。

  state: {
    //播放地址
    hash: "",
    //歌曲
    songData: {},
    //歌曲 数组,下标
    songInfo: {
      songList: [],
      songIndex: 0
    },
    //直接写 actionTime 不用 startTime 包装下的话引用时用v-model 改变值的时候会报错
    startTime: {
      //当前播放时间
      actionTime: 0
    },
    //头部
    head: {
      style: { background: "rgba(43,162,251,0)" },
      nav: false,
      title: ""
    },
    //是否显示底部播放面板
    isPlay: false,
    // 点击底部控制面板,头部的文字变成歌名字
    istitleName: "",
    // 播放/暂停
    video: true,
    // 播放进度条
    currentFlag: false,
    //loading
    isLoading: true
  },
  getters: {
    //歌曲
    songData: state => state.songData,
    //头部
    head: state => state.head,
    // 点击底部控制面板,头部的文字变成歌名字
    istitleName: state => state.istitleName,
    // 是否显示底部播放面板
    isPlay: state => state.isPlay,
    // 播放/暂停
    video: state => state.video,
    // 进度条状态(使用/未使用)
    currentFlag: state => state.currentFlag,
    // 播放时间
    startTime: state => state.startTime,
    //Loading
    isLoading: state => state.isLoading
  },
  mutations: {
    //歌曲列表以及当前下标
    setListInfo: (state, info) => {
      state.songInfo.songList = info.list;
      state.songInfo.songIndex = info.index;
    },
    //头部样式
    setHeadStyle: (state, style) => {
      state.head.style = style;
    },
    //是否显示导航
    showHead(state, flag) {
      state.head.nav = flag;
    },
    // 不显示导航的时候,显示的title
    setHeadTitle(state, title) {
      state.head.title = title;
      state.istitleName = "";
    },
    //底部控制面板是否显示
    isPlay(state, flag) {
      state.isPlay = flag;
    },
    // 点击底部控制面板,头部的文字变成歌名字
    titleName(state) {
      state.istitleName = state.songData.audio_name;
      state.head.title = "";
    },
    //播放 / 暂停
    video(state, flag) {
      state.video = flag;
    },
    // 改变当前播放时间
    setAudioTime(state, times) {
      state.startTime.actionTime = times;
      // console.log( state.startTime.actionTime,'')
    },
    // 改变进度条的状态
    setCurrent(state, flag) {
      state.currentFlag = flag;
    },
    //loading
    setLoading(state, flag) {
      state.isLoading = flag;
    }
  },
  actions: {
    //播放歌曲
    //单值
    getPash(state, hash) {
      // 多值
      // getPash(state,{hash,length,Index}) {
      state.hash = hash;
      // state.info = {
      //   songList: length,
      //   songIndex: Index
      // }
      axios
        .get(`/bproxy/yy/index.php?r=play/getdata&hash=${state.hash}`, {
          headers: {
            "content-type": "text/html;charset=utf-8"
          }
        })
        .then(res => {
          this.state.songData = res.data.data;
        })
        .catch(err => console.log(err));
    },
    //下一曲
    nextSong({ dispatch, state }) {
      var list = state.songInfo.songList;
      if (state.songInfo.songIndex == list.length - 1) {
        state.songInfo.songIndex = 0;
      } else {
        ++state.songInfo.songIndex;
      }
      var hash = list[state.songInfo.songIndex].hash;
      //播放歌曲
      dispatch("getPash", hash);
    },
    //上一曲
    prevSong({ dispatch, state }) {
      var list = state.songInfo.songList;
      if (state.songInfo.songIndex == 0) {
        state.songInfo.songIndex = list.length - 1;
      } else {
        --state.songInfo.songIndex;
      }
      var hash = list[state.songInfo.songIndex].hash;
      //播放歌曲
      dispatch("getPash", hash);
    },
    //随机播放
    randomSong({ dispatch, state }) {
      var list = state.songInfo.songList; // 假如有10个
      var random = Math.random() * list.length; // 0-9
      var num = Math.floor(random); // 0-9
      var hash = list[num].hash;
      //播放歌曲
      dispatch("getPash", hash);
    }
  }
});

export default store;
