const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
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
