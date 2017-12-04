import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import signup from '@/views/signup'
import home from '@/views/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
