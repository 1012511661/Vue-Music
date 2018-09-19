const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // https://www.cnblogs.com/hanguidong/p/9416194.html 针对2.0 需要手动加的
  configureWebpack: config => {
    config.resolve = {
      extensions: [".js", ".vue", ".json", ".css"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": resolve("src")
      }
    };
  },
  devServer: {
    port: 1111, // 端口号
    host: "localhost",
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    proxy: {
      "/proxy": {
        target: "http://m.kugou.com", //访问的地址
        changeOrigin: true, //允许跨域
        ws: true,
        pathRewrite: {
          "^/proxy": ""
        }
      },
      "/aproxy": {
        target: "http://mobilecdn.kugou.com",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/aproxy": ""
        }
      },
      "/bproxy": {
        target: "http://www.kugou.com",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/bproxy": ""
        }
      }
    }
  }
};
