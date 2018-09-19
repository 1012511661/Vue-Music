<template>
 <div class="header" ref="header">
   <HeadLogo />
   <RankHead v-if="head.nav" :title="head.title" :cStyle="head.style"/>
   <HeadNav v-else/>
 </div>
</template>

<script>
  //引入组件
  import HeadLogo from './HeadLogo'
  import HeadNav from './HeadNav'
  import RankHead from './RankHead'
  import { mapGetters } from 'vuex'
  //可以通过父子传参把vuex的数据写在父组件上在传给子组件
  //也可以直接在子组件里面通过映入vuex的数据直接写在子组件上
    export default {
      name: "headt",
      data(){
        return{
        }
      },
      computed: {
        ...mapGetters(['head'])
        //获取vuex(store)里面的值,然后放在组件标签上通过父子传参,传值
      },
      components:{
        HeadLogo, HeadNav,RankHead
      }
    }
</script>

<style scoped lang="less">
</style>
