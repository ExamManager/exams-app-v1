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
      component: () => import('./views/free/Home.vue'),
    },
    {
      path: '/premium',
      component: () => import('./views/premium/Home.vue'),
    },
    {
      path: '/premium/studentview',
      component: () => import('./views/premium/Fullscreen.vue'),
    },
    {
      path: '/pricing',
      component: () => import('./views/Pricing.vue'),
    },
    {
      path: '/docs',
      component: () => import('./views/Docs.vue'),
    },
],
})

export default router
