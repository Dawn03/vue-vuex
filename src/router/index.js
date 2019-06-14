import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import backsystem from '@/components/backsystem'
import MyIndex from '@/components/myIndex'
import Detail from '@/components/detail'
import Movie from '@/components/movie'
import MovieCount from '@/components/movieCount'
import Test from '@/components/test'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'backsystem',
    //   component: backsystem
    // },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'myIndex',
      component: MyIndex,
      children: [
        {

          path: '',
          name: 'movie',
          component: Movie
        },
        {

          path: 'movie',
          name: 'movie',
          author: '',
          component: Movie
        },
        {
          path: 'movieCount',
          name: 'movieCount',
          component: MovieCount
        },
        {
          path: 'backsystem',
          name: 'backsystem',
          component: backsystem
        },
        {
          path: 'detail',
          name: 'detail',
          component: Detail
        }, {

          path: 'test',
          name: 'test',
          component: Test
        },
      ]
    },

  ]
})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (!token) {
      next('/login');
    } else {
      next();
    }
  }
});
export default router