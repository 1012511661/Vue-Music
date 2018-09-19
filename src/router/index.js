import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
//利用webpack实现懒加
/**
 *  组件懒加载可以单独写出来也可以写在路由里面
 *  1.
 * import("路径");
 *   import 后面不能命名,所以不能把多个打包成一个
 * 2.
 * require.ensure( [],() => {resolve(require("路径"))},"自定义名字")
 * https://blog.csdn.net/qq_27626333/article/details/76228578  require.ensure()详情
 *  自定义名字 webpack会自动把名字相同的打包成一个
 * 3.
 * 写在路由里面
 * **/
//首页
// import NewSongs from "@/components/page/NewSongs";
let NewSongs = resolve => {
  return import("@/components/page/NewSongs");
};
//排行
// import Rank from "@/components/page/Rank";
let Rank = resolve => {
  return require.ensure(
    [],
    () => {
      resolve(require("@/components/page/Rank"));
    },
    "name"
  );
};
// import Rankinfo from "@/components/page/Rankinfo";
let Rankinfo = resolve => {
  return require.ensure(
    [],
    () => {
      resolve(require("@/components/page/Rankinfo"));
    },
    "nameinfo"
  );
};
//歌单
// import Plist from "@/components/page/Plist";
let Plist = resolve => {
  return require.ensure(
    [],
    () => {
      resolve(require("@/components/page/Plist"));
    },
    "name"
  );
};
// import Plistinfo from "@/components/page/Plistinfo";
let Plistinfo = resolve => {
  return require.ensure(
    [],
    () => {
      resolve(require("@/components/page/Plistinfo"));
    },
    "nameinfo"
  );
};
//歌手
// import Singer from "@/components/page/Singer";
let Singer = resolve => {
  return require.ensure(
    [],
    () => {
      resolve(require("@/components/page/Singer"));
    },
    "name"
  );
};
// import SingerList from "@/components/page/SingerList";
// import SingerInfo from "@/components/page/SingerInfo";
let SingerInfo = resolve => {
  return require.ensure(
    [],
    () => {
      resolve(require("@/components/page/SingerInfo"));
    },
    "nameinfo"
  );
};

//搜索
import Search from "@/components/page/Search";
export default new Router({
  mode: "history",
  routes: [
    {
      //首页
      path: "/NewSongs",
      component: NewSongs,
      name: "new-songs",
      alias: "/"
    },
    {
      //排行
      path: "/Rank",
      component: Rank,
      name: "rank"
    },
    {
      //排行详情
      path: "/Rank/info/:id",
      component: Rankinfo,
      name: "rankinfo"
    },
    {
      //歌单
      path: "/Plist",
      component: Plist,
      name: "plist"
    },
    {
      //歌单详情
      path: "/Plist/info/:specialid",
      component: Plistinfo,
      name: "plistinfo"
    },
    {
      //歌手
      path: "/Singer",
      component: Singer,
      name: "singer"
    },
    {
      //歌手列表
      path: "/Singer/list/:num",
      //component: SingerList,
      component: () => import("@/components/page/SingerList"),
      name: "singer-list"
    },
    {
      //歌手详情
      path: "/Singer/info/:singerid",
      component: SingerInfo,
      name: "singer-info"
    },
    {
      //搜索
      path: "/search",
      // component: Search,
      component: () => import("@/components/page/Search"),
      name: "search"
    }
  ]
});
