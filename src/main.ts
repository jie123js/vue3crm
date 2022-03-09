import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import jRequest from '@/server'
import '@/assets/css/index.less'
import 'normalize.css'
import { setupStore } from '@/store'
// 导入所有的el-icon图标
import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App)
// for (let iconName in ElIconModules) {
//   app.component(iconName, ElIconModules as any[iconName])
// }

app.use(store)
app.use(ElementPlus)

//todo手动刷新重新从缓存读vuex数据
setupStore()
app.use(router)
app.mount('#app')
//createApp(App).mount('#app')
//console.log(process.env)
interface DataType {
  data: any
}
// jRequest
//   .request<DataType>({
//     method: 'get',
//     url: '/home/multidata',
//     interceptors: {
//       requestInterceptor(config) {
//         // console.log(config, '个人请求')
//         return config
//       },
//       responseInterceptor(res) {
//         // console.log(res, '个人响应')
//         return res
//       }
//     }
//   })
//   .then((r) => {
//     //console.log(r)
//   })

// class MyName {
//   loading = 1
//   constructor(a: any) {
//     console.log('初始化')
//     console.log(a)
//     if (a.name) {
//       console.log('大家好')
//       this.loading = 2
//     }
//   }
//   get(a: any) {
//     console.log(1)
//     console.log(a)
//     console.log(this.loading)
//   }
// }

// const mymy = new MyName({ name1: 11 })
// mymy.get({ name: 'lolo' })
