import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { globalRegister } from './global'
import '@/assets/css/index.less'
import 'normalize.css'
import { setupStore } from '@/store'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
//todo注册全局指令
// app.directive('j-change', {
//   beforeMount(el) {
//     console.log(111)
//   }
// })
app.use(ElementPlus, {
  locale: zhCn
})
app.use(store)
app.use(ElementPlus)
app.use(globalRegister)
//todo手动刷新重新从缓存读vuex数据
setupStore()
app.use(router)

app.mount('#app')
//createApp(App).mount('#app')
//console.log(process.env)
