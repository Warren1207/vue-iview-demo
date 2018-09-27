import Main from '@/views/main'
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    component: Main,
    children: [
      { path: '/home', title: '首页', name: 'home', component: () => import('@/views/home/home') },
      { path: 'area', title: '地区列表', name: 'area', component: () => import('@/views/area/area.vue') },
      { path: 'log', title: '日志列表', name: 'log', component: () => import('@/views/log/log.vue') },
      { path: 'operator', title: '运营商列表', name: 'operator', component: () => import('@/views/operator/operator.vue') },
      { path: 'plan', title: '计划列表', name: 'plan', component: () => import('@/views/plan/plan.vue') },
      { path: 'subcontractor', title: '分包商列表', name: 'subcontractor', component: () => import('@/views/subcontractor/subcontractor.vue') },
      { path: 'test', title: '测试标准列表', name: 'test', component: () => import('@/views/test/test.vue') },
      { path: 'user', title: '用户列表', name: 'user', component: () => import('@/views/user/user.vue') },
      { path: 'ftp', title: '服务器列表', name: 'ftp', component: () => import('@/views/ftp/ftp.vue') }
    ]
  }
]
