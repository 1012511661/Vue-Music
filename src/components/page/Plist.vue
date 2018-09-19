<template>
    <div class="plist">
      <div class="plist_content" v-for="(item,index) in list" :key="index">
        <router-link :to="`/plist/info/${item.specialid}`">
          <div>
            <img :src="item.imgurl.replace('{size}', '400')" alt="">
            <div class="plist_content_title">
              <span class="plist_content_o">{{item.specialname}}</span>
              <span class="plist_content_t"><i>{{item.playcount}}</i></span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
      name: "plist",
      data(){
        return{
          list:[]
        }
      },
      methods:{
        getPlist(){
          axios.get('/proxy/plist/index&json=true',{
            headers:{'content-type':'text/html;charset=utf-8'}
          })
            .then(res=>{
              this.list = res.data.plist.list.info;
              this.$store.commit('setLoading', false)
            })
            .catch(err=>console.log(err))
        }
      },
      created(){
        this.getPlist();
      }
    }
</script>

<style scoped lang="less" type="text/less">

.plist{
  .plist_content{
    width: 90%;
    background: url("../../assets/images/arrow_icon.png")no-repeat right ;
    background-size: 10px;
    padding: 10px 15px !important;
    border-bottom: 1px solid #e8e8e8;
    a{
      text-decoration: none;
      color: #000;
      img{
        width: 65px;
        height: auto;
        vertical-align: middle;//把该元素放在父元素中间
      }
      .plist_content_title {
        display: inline-block;
        vertical-align: middle;
        margin-left: 9px;
        width: 75%;
        .plist_content_o{
          font-size: 14px;
          display: block;
        }
        .plist_content_t{
          background: url("../../assets/images/icon_music.png") no-repeat left;
          background-size: 12px;
          i{
            margin-left: 16px;
            font-size: 12px;
          }
        }
      }
    }
  }
}

</style>
