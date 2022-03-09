// import { Module } from 'vuex'

// import {
//   accountLoginRequest,
//   requestUserInfoById,
//   requestUserMenusByRoleId
// } from '@/service/login/login'
// import localCache from '@/utils/cache'
// import router from '@/router'

// import { IAccount } from '@/service/login/type'
// import { ILoginState } from './types'
// import { IRootState } from '../types'

// const loginModule: Module<ILoginState, IRootState> = {
//   namespaced: true,
//   state() {
//     return {
//       token: '',
//       userInfo: {},
//       userMenus: []
//     }
//   },
//   getters: {},
//   mutations: {
//     changeToken(state, token: string) {
//       state.token = token
//     },
//     changeUserInfo(state, userInfo: any) {
//       state.userInfo = userInfo
//     },
//     changeUserMenus(state, userMenus: any) {
//       state.userMenus = userMenus
//     }
//   },
//   actions: {
//     async accountLoginAction({ commit }, payload: IAccount) {
//       // 1.实现登录逻辑
//       const loginResult = await accountLoginRequest(payload)
//       const { id, token } = loginResult.data
//       commit('changeToken', token)
//       localCache.setCache('token', token)

//       // 2.请求用户信息
//       const userInfoResult = await requestUserInfoById(id)
//       const userInfo = userInfoResult.data
//       commit('changeUserInfo', userInfo)
//       localCache.setCache('userInfo', userInfo)

//       // 3.请求用户菜单
//       const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
//       const userMenus = userMenusResult.data
//       commit('changeUserMenus', userMenus)
//       localCache.setCache('userMenus', userMenus)

//       // 4.跳到首页
//       router.push('/main')
//     },
//     loadLocalLogin({ commit }) {
//       const token = localCache.getCache('token')
//       if (token) {
//         commit('changeToken', token)
//       }
//       const userInfo = localCache.getCache('userInfo')
//       if (userInfo) {
//         commit('changeUserInfo', userInfo)
//       }
//       const userMenus = localCache.getCache('userMenus')
//       if (userMenus) {
//         commit('changeUserMenus', userMenus)
//       }
//     }
//   }
// }

// export default loginModule
//todo 这个导入是一个类型,必须传2个参数1个是这个模块的state的类型,1个是跟组件的state的类型
import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'
import { IAccount } from '@/server/login/type'
import LocalCache from '../../utils/cache'
import { addRouer, mapMenusToRoutes } from '../../utils/map-menus'

import router from '@/router'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/server/login/login'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      const activeRoute = addRouer(userMenus)
      console.log(activeRoute)
      activeRoute.forEach((i) => router.addRoute('main', i))
      console.log(router)
    }
  },
  actions: {
    //todo 其实这个payload类型可写,可不写
    async accountLogin({ commit }, payload: IAccount) {
      // 登录接口
      const accountData = await accountLoginRequest(payload)
      const { name, id, token } = accountData.data
      //保存东西到vuex和缓存
      LocalCache.setCache('token', token)
      commit('changeToken', token)
      //登录后个人信息
      const userInfoData = await requestUserInfoById(id)
      const userInfo = userInfoData.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)
      //登录后个人菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)
      //跳到首页
      router.push('/main')
    },
    //todo页面刷新的时候vuex数据会清空所以从本地缓存中拿
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
export default loginModule
