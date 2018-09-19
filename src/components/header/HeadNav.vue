<template>
  <div class="head-nav" ref="headNav">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="新歌" name="first"></el-tab-pane>
      <el-tab-pane label="排行" name="second"></el-tab-pane>
      <el-tab-pane label="歌单" name="third"></el-tab-pane>
      <el-tab-pane label="歌手" name="fourth"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
      name: "head-nav",
      data(){
        return{
          activeName:'first'//默认选中
        }
      },
      methods:{
        handleClick(tab,event){
          //console.log(tab,event);
           //在tab和event中可以查找该元素的任何属性
          let index = tab._data.index;
          // index 是字符串
         // console.log(index);
          this.goRouter(index);
        },
        goRouter(index){
          // console.log(index, 'fn');//0，1，2，3
          // index 是字符串,可以转换为数字或者直接用字符串判断
          // let num  = parseInt(index);
          switch (index){
            case '0':
              this.$router.push({path:'/'});
              break;
            case '1':
              this.$router.push({path:'/Rank'});
              break;
            case '2':
              this.$router.push({path:'/Plist'});
              break;
            case '3':
              this.$router.push({path:'/Singer'});
              break;
          }
        }
      }
    }
</script>

<style lang="less">
  .head-nav{
    background-color: white;
    position: fixed;
    top:51px;
    width: 100%;
    left: 0;
    z-index: 999;
    .el-tabs{
      width: 100%;
      margin: 0 auto;
      .el-tabs__header{
        margin: 0;
        .el-tabs__nav-wrap{
          margin-bottom: 0;
          .mint-tab-item-label{
            font-size: 18px !important;
          }
          .el-tabs__nav{
            width: 100% !important;
            float:none !important;
            .el-tabs__active-bar{
            }
            .el-tabs__item{
              width: 25% !important;
              padding: 0 !important;
              text-align: center !important;
              font-size: 16px !important;
            }
          }
        }
      }

    }
  }
</style>
