import Vue from 'vue'
import Router from 'vue-router'
import loadingBar from '@/components/loading-bar' // 使用loadingbar
import home from '../views/home'
import error404 from '@/frontend/views/error-page/404.vue'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: home,
      children: [
        {
          path: 'article/:id',
          name: 'article',
          component: () => import('../views/article'),
          props: true
        },
        {
          path: '/file',
          name: 'file',
          component: () => import('../views/file')
        }
      ]
    },
    {
      path: '/tag',
      name: 'tag',
      component: () => import('../views/tag')
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('../views/music')
    },
    {
      path: '/movie',
      name: 'movie',
      component: () => import('../views/movie')
    },
    {
      path: '/effect',
      name: 'effect',
      component: () => import('../views/effect')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('../views/message')
    },
    {
      path: '*',
      component: error404
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  loadingBar.start()
  window.document.title = to.meta.title || '潜潜'
  next()
})

router.afterEach(() => {
  loadingBar.finish()
  window.scrollTo(0, 0)
})
