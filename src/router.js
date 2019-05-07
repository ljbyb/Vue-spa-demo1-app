import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

// export default new Router({
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sport',
      name: 'sport',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // 启用KeepAlive选项是为了避免重复渲染Vue组件，从而引发多个组件的监听事件函数重复执行
      meta: {keepAlive: true, title: 'title'},
      component: () => import('./views/Sport.vue')
    },
    {
      path: '/note/:filter',
      name: 'note',
      component: () => import('./views/Note.vue'),
      // 定义路由守卫
      beforeEach: (to, from, next) => {
        if (['all', 'active', 'completed'].some(record => record === to.params.filter)) {
          next()
        } else {
          next('/note/all')
        }
      }
    },
    {
      path: '/record',
      name: 'record',
      component: () => import('./views/Record.vue')
    },
    {
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/User.vue')
    }
  ]
});

// TODO: 添加全局路由守卫，判断是否用户登录，暂时先关闭
// router.beforeEach((to, from, next) => {
//   if (Vue.prototype.GLOBAL.userName.length === 0 &&to.path !== '/') {
//     // TODO：考虑使用组件方式显示
//     alert("请先在首页点击右上角进行用户登录！");
//     next('/')
//   } else {
//     next()
//   }
// });

export default router;
