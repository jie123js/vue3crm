//todo vuex的TS如果不理解可以先放放,但是ts之后肯定很重要的
import { createStore } from 'vuex'

import login from './login/login'
import system from './main/system/system'
import { IRootState } from './types'
//这个IRootState可写可不写吧 我个人觉得,就是写state的时候做限制
const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {
    accountLogin({ commit }, payload) {
      //  console.log('跟')
    }
  },
  modules: {
    login,
    system
  }
})
//todo这个函数是因为页面手动刷新的话,会把vuex里面保存的数据清空,这个函数是为了防止清空
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
