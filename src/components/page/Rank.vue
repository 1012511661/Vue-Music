<template>
   <div class="rank">
     <div v-for="(item,index) in rankList" :key="index" >
       <!-- :to="`/rank/info/${item.rankid}`"  符号 ` es6 拼接字符串-->
       <router-link :to="`/rank/info/${item.rankid}`" class="router-link">
         <div  class="rank_content" >
           <!-- 返回的图片路径
         http://imge.kugou.com/mcommon/{size}/20150331/20150331161100773965.png
         -->
           <img :src="item.imgurl.replace('{size}', '400')" alt="">
           <span>{{item.rankname}}</span>
         </div>
       </router-link>
     </div>
   </div>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "rank",
      data(){
        return{
          rankList:[],
        }
      },
      methods:{
        //数据
        getRank(){
          axios.get('/proxy/rank/list&json=true',{
           headers:{}
          })
            .then((res)=>{
              this.rankList = res.data.rank.list;
              //console.log(this.rankList)
              this.$store.commit('setLoading', false)
            })
            .catch(err => console.log('请求错误'))
        }
      },
      created(){
        this.getRank();
      }
    }
</script>

<style  lang="less">
  .rank{
    width: 100%;
    .router-link{
      text-decoration: none;
    }
    .rank_content{
      width: 90%;
      padding: 10px 15px !important;
      border-bottom: 1px solid #e8e8e8;
      background: url("../../assets/images/arrow_icon.png")no-repeat right ;
      background-size: 10px;
      img{
        width: 65px;
        height: auto;
        vertical-align: middle;//把该元素放在父元素中间
      }
      span{
        vertical-align: middle;//把该元素放在父元素中间
        margin-left: 10px;
        color: black;
      }
    }
  }
</style>
