import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
let firstMenu: any = null
//todo J版本
export function addRouer(routeMenu: any[]) {
  const routes: any[] = []
  const allRoutes: any[] = []
  //todo webpack自带的函数方法获取文件的 第一个参数是要获取的文件路径,第二个是要不要深度遍历,第三个是匹配文件后缀名
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    //todo webpack的语法  不会的话自己一个个导入也是一样的,但是这样写简便
    const route = require('../router/main' + key.split('.')[1])
    //todo 这里就是把所有main文件夹下面的文件里面的配置的路由信息全导入了
    allRoutes.push(route.default)
  })
  // 2.根据菜单获取需要添加的routes
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  //todo 这个每个项目接口不一样 到时候再根据后端返回的值从新写判断
  const _recurseGetRoute = function (menu: any[]) {
    for (const i of menu) {
      if (i.type === 1) {
        _recurseGetRoute(i.children)
      } else {
        const sameRoute = allRoutes.find((item) => item.path === i.url)
        if (sameRoute) routes.push(sameRoute)
        if (!firstMenu) {
          firstMenu = i
        }
      }
    }
  }
  _recurseGetRoute(routeMenu)
  return routes
}
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: any[] = []
  searchRouteid(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
export function searchRouteid(
  allRoutes: any[],
  curpath: string,
  breadcrumbs?: any[]
): any {
  for (const i of allRoutes) {
    if (i.type === 2 && i.url === curpath) {
      return i
    } else if (i.type === 1) {
      const findMenu = searchRouteid(i.children ?? [], curpath)
      if (findMenu) {
        breadcrumbs?.push({ name: i.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    }
  }
}
export { firstMenu }
