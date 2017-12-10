import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import signup from '@/views/signup'
import home from '@/views/home'
import change from '@/views/change'
import newnb from '@/views/newnb'
import newn from '@/views/newn'
import search from '@/views/search'

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
    },
    {
      path: '/change',
      name: 'change',
      component: change
    },
    {
      path: '/newnb',
      name: 'newnb',
      component: newnb
    },
    {
      path: '/newn',
      name: 'newn',
      component: newn
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
  ]
})
