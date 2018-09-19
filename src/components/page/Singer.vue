<template>
    <div class="singer">
      <div class="singer_group">
        <div @click="goSingerList(88)" >热门歌手</div>
      </div>
      <div class="singer_group">
        <div @click="goSingerList(1)">华语男歌手</div>
        <div @click="goSingerList(2)">华语女歌手</div>
        <div @click="goSingerList(3)">华语组合</div>
      </div>
      <div class="singer_group">
        <div @click="goSingerList(4)">日韩男歌手</div>
        <div @click="goSingerList(5)">日韩女歌手</div>
        <div @click="goSingerList(6)">日韩组合</div>
      </div>
      <div class="singer_group">
        <div @click="goSingerList(7)">欧美男歌手</div>
        <div @click="goSingerList(8)">欧美女歌手</div>
        <div @click="goSingerList(9)">欧美组合</div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "singer",
      methods:{
        goSingerList(num){
          this.$router.push({path:`/Singer/list/${num}`})
        }
      }
    }
</script>

<style scoped lang="less">
  .singer{
    padding: 5px 10px;
    .singer_group{
      margin: 15px 0;
      width: 100%;
      border: 1px solid #e4e4e4;
      border-radius: 5px;
      background-color: #fbfbfb;
      div{
        padding: 12px 15px;
        font-size: 15px;
        border-bottom: 1px solid #e4e4e4;
        position: relative;
      }
    }
  }

</style>
