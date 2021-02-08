import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',  // 资源视图首页
    component: Home
  },
  {
    path: '/node',  // 节点详情页面
    name: 'Node',
    component: () => import(/* webpackChunkName: "about" */ '../views/NodeInfo.vue')
  },
  {
    path: '/chip',  // 芯片详情页面
    name: 'Chip',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChipInfo.vue')
  },
  {
    path: '/model',  // 模型详情页面
    name: 'Model',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModelInfo.vue')
  },
  {
    path: '/uploadModel',  // 上传模型文件页面
    name: 'UploadModel',
    component: () => import(/* webpackChunkName: "about" */ '../views/UploadModel.vue')
  },
  {
    path: '/task',  // 模型详情页面
    name: 'Task',
    component: () => import(/* webpackChunkName: "about" */ '../views/TaskInfo.vue')
  },
  {
    path: '/taskDetail',  // 模型详情页面
    name: 'TaskDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/TaskDetail.vue')
  },
  {
    path: '/boardsData',  // 模型详情页面
    name: 'BoardsData',
    component: () => import(/* webpackChunkName: "about" */ '../views/BoardsData.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  // vue-router默认hash模式——使用URL的hash来模拟一个完整的URL，于是当URL改变时，页面不会重新加载
  // history 模式会导致打包后<route-view>不显示
  // mode: "history",
})

export default router
