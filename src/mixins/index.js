module.exports = {
  //播放
  PLAY_AUDIO: {
    methods: {
      playMusic(index) {
        //  dispatch 异步
        //  commit  同步
        var info = {
          list: this.List,
          index: index
        };
        // 单值
        this.$store.dispatch("getPash", this.List[index].hash);
        this.$store.commit("setListInfo", info);
        //点击播放 底部的按钮
        this.$store.commit("video", true);
        // 多值
        // this.$store.dispatch('getPash',{hash,length,Index});
      }
    }
  }
};
