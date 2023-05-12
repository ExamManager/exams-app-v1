import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/help',
      component: () => import('./views/Help.vue'),
    },
    {
      path: '/fullscreen',
      component: () => import('./views/fullscreen.vue'),
    },
],
})

export default router
