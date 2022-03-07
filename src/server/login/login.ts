import jRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './type'
//TODO枚举类型 TS中的
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return jRequest.post({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return jRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    isLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return jRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    isLoading: false
  })
}
