// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  devServer: {
    proxy: {
      //如果地址以/api开头，它就会请求到 http://122.51.238.153
      '/api': {
        target: 'http://152.136.185.210:5000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '' //重写请求路径
        }
      }
    }
  },
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'http://152.136.185.210:5000',
  //       pathRewrite: {
  //         '^/api': ''
  //       },
  //       changeOrigin: true
  //     }
  //   }
  // },
  // vue.config.js 方式一 写法
  configureWebpack: {
    plugins: [
      // AutoImport({
      //   resolvers: [ElementPlusResolver()]
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()]
      // })
    ]
  }

  // vue.config.js 方式二 写法
  //  chainWebpack: (config) => {
  //    config
  //      .plugin('AutoImport')
  //      .use(AutoImport({ resolvers: [ElementPlusResolver()] }))
  //    config
  //      .plugin('Components')
  //      .use(Components({ resolvers: [ElementPlusResolver()] }))
  //  }
}
