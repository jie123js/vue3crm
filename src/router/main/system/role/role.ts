const role = () => import('@/views/main/system/role/role.vue')
export default {
  path: '/main/system/role',
  name: 'role',
  component: role,
  children: [],
  meta: {
    keepAlive: true //设置页面是否需要使用缓存
  }
}
