import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
// vue项目实现路由按需加载(路由懒加载)的3种方式
// https://blog.csdn.net/mzrxLXR/article/details/8148467
// 组件懒加载可以单独写出来也可以写在路由里面
// 1. import("路径");(推荐)
//    () => import(/* webpackChunkName: 'webpackName' */ '@/components/home')
//    指定了相同的webpackName，会合并打包成一个js文件
// 2. require.ensure( [],() => {resolve(require("路径"))},'resolveName')
//    https://blog.csdn.net/qq_27626333/article/details/76228578  require.ensure()详情
//    指定了相同的resolveName，会合并打包成一个js文件
// 3. resolve => require(['@/components/home'],resolve)
//    这种情况下一个组件生成一个js文件

//  0.一般引入
//import NewSongs from '@/components/page/NewSongs'

// 1.import()
// let Rankinfo = () =>
//   import(/* webpackChunkName: 'Rank' */ "@/components/page/Rankinfo");

// 2.require.ensure()
// let Rank = resolve => {
//   return require.ensure(
//     [],
//     () => {
//       resolve(require("@/components/page/Rank"));
//     },
//     "name"
//   );
// };

// 3.resolve
//let Plist = resolve => require(['@/components/page/Plist'],resolve)

export default new Router({
  mode: "history",
  routes: [
    {
      //首页
      path: "/NewSongs",
      component: resolve => {
        return require.ensure(
          [],
          () => {
            resolve(require("@/components/page/NewSongs"));
          },
          "songs"
        );
      },
      name: "new-songs",
      alias: "/"
    },
    {
      //排行
      path: "/Rank",
      component: resolve => require(["@/components/page/Rank"], resolve),
      name: "rank"
    },
    {
      //排行详情
      path: "/Rank/info/:id",
      component: () =>
        import(/* webpackChunkName: 'Rank' */ "@/components/page/Rankinfo"),
      name: "rankinfo"
    },
    {
      //歌单
      path: "/Plist",
      component: () =>
        import(/* webpackChunkName: 'Plist' */ "@/components/page/Plist"),
      name: "plist"
    },
    {
      //歌单详情
      path: "/Plist/info/:specialid",
      component: () =>
        import(/* webpackChunkName: 'Plist' */ "@/components/page/Plistinfo"),
      name: "plistinfo"
    },
    {
      //歌手
      path: "/Singer",
      component: () =>
        import(/* webpackChunkName: 'Singer' */ "@/components/page/Singer"),
      name: "singer"
    },
    {
      //歌手列表
      path: "/Singer/list/:num",
      component: () =>
        import(/* webpackChunkName: 'Singer' */ "@/components/page/SingerList"),
      name: "singer-list"
    },
    {
      //歌手详情
      path: "/Singer/info/:singerid",
      component: () =>
        import(/* webpackChunkName: 'Singer' */ "@/components/page/SingerInfo"),
      name: "singer-info"
    },
    {
      //搜索
      path: "/search",
      component: () =>
        import(/*webpackChunkName:"search"*/ "@/components/page/Search"),
      name: "search"
    }
  ]
});
