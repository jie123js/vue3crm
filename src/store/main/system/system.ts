// import { Module } from 'vuex'
// import { IRootState } from '@/store/types'
// import { ISystemState } from './types'

// import { getPageListData } from '@/server/main/system/system'
// const systemModule: Module<ISystemState, IRootState> = {
//   namespaced: true,
//   state() {
//     return {
//       userList: [],
//       userCount: 0
//     }
//   },
//   mutations: {
//     changeUserList(state, userList: any[]) {
//       state.userList = userList
//     },
//     changeUserCount(state, userCount: number) {
//       state.userCount = userCount
//     }
//   },
//   actions: {
//     async getPageListAction({ commit }, payload: any) {
//       console.log(payload.pageUrl)
//       console.log(payload.queryInfo)

//       // 1.对页面发送请求
//       const pageResult: any = await getPageListData(
//         payload.pageUrl,
//         payload.queryInfo
//       )
//       const { list, totalCount } = pageResult.data
//       commit('changeUserList', list)
//       commit('changeUserCount', totalCount)
//     }
//   }
// }

// export default systemModule
// import { Module } from 'vuex'
// import { getPageListData } from '@/server/main/system/system'
// const systemModule = {
//   namespaced: true,
//   state() {
//     return {
//       userList: [],
//       userCount: ''
//     }
//   },
//   mutations: {
//     changeUserList(state: { userList: any }, userList: any) {
//       state.userList = userList
//     },
//     changeUserCount(state: { userCount: number }, userCount: number) {
//       state.userCount = userCount
//     }
//   },
//   actions: {
//     async getPageListAction(
//       { commit }: any,
//       payload: { pageUrl: any; queryInfo: any }
//     ) {
//       const pageResult: any = await getPageListData(
//         payload.pageUrl,
//         payload.queryInfo
//       )
//       const { list, totalCount } = pageResult.data
//       commit('changeUserList', list)
//       commit('changeUserCount', totalCount)
//     }
//   }
// }
// export default systemModule
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'

import { getPageListData } from '@/server/main/system/system'

const systemModule = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUsersList(state: { usersList: any[] }, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state: { usersCount: number }, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state: { roleList: any[] }, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state: { roleCount: number }, count: number) {
      state.roleCount = count
    }
  },
  getters: {
    pageListData(state: any) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }: any, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }

      // 2.对页面发送请求
      const pageResult: any = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)

      // switch (pageName) {
      //   case 'users':
      //     commit(`changeUserList`, list)
      //     commit(`changeUserCount`, totalCount)
      //     break
      //   case 'role':
      //     commit(`changeRoleList`, list)
      //     commit(`changeRoleCount`, totalCount)
      //     break
      // }
    }
  }
}

export default systemModule
