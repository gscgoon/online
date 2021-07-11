import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // 首页
  {
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
    redirect: '/home',
    name: 'home',
    children: [{
      path: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '谷粒学院后台首页', icon: 'home' }
    }]
  }]
/**
 * 动态路由
 */
export const asyncRoutes = [
  //从后台构建的菜单根据用户权限显示，所以写死的路由需要注释掉
  //权限管理
  // {
  //   path: '/acl',
  //   component: Layout,
  //   redirect: '/acl/user/list',
  //   name: '权限管理',
  //   meta: { title: '权限管理', icon: 'chart' },
  //   children: [
  //     {
  //       path: 'user/list',
  //       name: '用户管理',
  //       component: () => import('@/views/acl/user/list'),
  //       meta: { title: '用户管理' }
  //     },
  //     {
  //       path: 'role/list',
  //       name: '角色管理',
  //       component: () => import('@/views/acl/role/list'),
  //       meta: { title: '角色管理' }
  //     },
  //     {
  //       path: 'menu/list',
  //       name: '菜单管理',
  //       component: () => import('@/views/acl/menu/list'),
  //       meta: { title: '菜单管理' }
  //     },
  //     {
  //       path: 'role/form',
  //       name: '角色添加',
  //       component: () => import('@/views/acl/role/form'),
  //       meta: { title: '角色添加' },
  //       hidden: true
  //     },
  //     {
  //       path: 'role/update/:id',
  //       name: '角色修改',
  //       component: () => import('@/views/acl/role/form'),
  //       meta: { title: '角色修改' },
  //       hidden: true
  //     },
  //     {
  //       path: 'role/distribution/:id',
  //       name: '角色权限',
  //       component: () => import('@/views/acl/role/roleForm'),
  //       meta: { title: '角色权限' },
  //       hidden: true
  //     },
  //     {
  //       path: 'user/add',
  //       name: '用户添加',
  //       component: () => import('@/views/acl/user/form'),
  //       meta: { title: '用户添加' },
  //       hidden: true
  //     },
  //     {
  //       path: 'user/update/:id',
  //       name: '用户修改',
  //       component: () => import('@/views/acl/user/form'),
  //       meta: { title: '用户修改' },
  //       hidden: true
  //     },
  //     {
  //       path: 'user/role/:id',
  //       name: '用户角色',
  //       component: () => import('@/views/acl/user/roleForm'),
  //       meta: { title: '用户角色' },
  //       hidden: true
  //     }

  //   ]
  // },
  // // 讲师管理
  // {
  //   path: '/edu/teacher',
  //   component: Layout,
  //   redirect: '/edu/teacher/list',
  //   name: '讲师管理',
  //   meta: { title: '讲师管理', icon: 'teacher-edit' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '讲师列表',
  //       component: () => import('@/views/edu/teacher/list'),
  //       meta: { title: '讲师列表', icon: 'teacher-list' },
  //     },
  //     {
  //       path: 'add',
  //       name: '添加讲师',
  //       component: () => import('@/views/edu/teacher/add'),
  //       meta: { title: '添加讲师', icon: 'teacher-registe' }
  //     },
  //     {
  //       path: 'edit/:id',
  //       name: '编辑讲师',
  //       component: () => import('@/views/edu/teacher/add'),
  //       meta: { title: '编辑讲师', noCache: true },
  //       hidden: true
  //     }
  //   ]
  // },
  // //课程分类管理
  // {
  //   path: '/subject',
  //   component: Layout,
  //   redirect: '/subject/list',
  //   name: '课程分类管理',
  //   meta: { title: '课程分类管理', icon: 'member-edit' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '课程分类列表',
  //       component: () => import('@/views/edu/subject/index'),
  //       meta: { title: '课程分类列表', icon: 'member-list' }
  //     },
  //     {
  //       path: 'import',
  //       name: '添加课程分类',
  //       component: () => import('@/views/edu/subject/import'),
  //       meta: { title: '添加课程分类', icon: 'member-registe' }
  //     }
  //   ]
  // },
  // //课程管理
  // {
  //   path: '/edu/course',
  //   component: Layout,
  //   redirect: '/edu/course/list',
  //   name: '课程管理',
  //   meta: { title: '课程管理', icon: 'form' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '课程列表',
  //       component: () => import('@/views/edu/course/list'),
  //       meta: { title: '课程列表', icon: 'table' }
  //     },
  //     {
  //       path: 'info',
  //       name: '添加课程',
  //       component: () => import('@/views/edu/course/info'),
  //       meta: { title: '添加课程', icon: 'tree' }
  //     },
  //     {
  //       path: 'info/:id',
  //       // name: 'EduCourseInfoEdit',
  //       name: '编辑课程基本信息',
  //       component: () => import('@/views/edu/course/info'),
  //       meta: { title: '编辑课程基本信息', noCache: true },
  //       hidden: true
  //     },
  //     {
  //       path: 'chapter/:id',
  //       // name: 'EduCourseChapterEdit',
  //       name: '编辑课程大纲',
  //       component: () => import('@/views/edu/course/chapter'),
  //       meta: { title: '编辑课程大纲', noCache: true },
  //       hidden: true
  //     },
  //     {
  //       path: 'publish/:id',
  //       // name: 'EduCoursePublishEdit',
  //       name: '发布课程',
  //       component: () => import('@/views/edu/course/publish'),
  //       meta: { title: '发布课程', noCache: true },
  //       hidden: true
  //     }
  //   ]
  // },
  // //统计分析
  // {
  //   path: '/statistics',
  //   component: Layout,
  //   redirect: '/statistics/createData',
  //   name: '统计分析',
  //   meta: { title: '统计分析', icon: 'statistic-analysis' },
  //   children: [
  //     {
  //       path: 'createData',
  //       name: '生成数据',
  //       component: () => import('@/views/statistics/day/createData'),
  //       meta: { title: '生成数据', icon: 'table' }
  //     },
  //     {
  //       path: 'chart',
  //       name: '图表显示',
  //       component: () => import('@/views/statistics/day/chart'),
  //       meta: { title: '图表显示', icon: 'statistic-analysis' },
  //     }
  //   ]
  // },
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
export default router
