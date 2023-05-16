import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/free',
      component: () => import('./views/multiexam/Home.vue'),
    },
    {
      path: '/premium',
      component: () => import('./views/premium/Home.vue'),
    },
    {
      path: '/premium/studentview',
      component: () => import('./views/premium/Fullscreen.vue'),
    },
],
})

export default router
