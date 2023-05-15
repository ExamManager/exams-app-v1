import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/App.vue'),
    },
    {
      path: '/multiexam',
      component: () => import('./views/multiexam/Home.vue'),
    },
    {
      path: '/premium',
      component: () => import('./views/premium/Home.vue'),
    },
    {
      path: '/premium/fullscreen',
      component: () => import('./views/premium/Fullscreen.vue'),
    },
],
})

export default router
