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
      path: '/login',
      component: () => import('./views/auth/SignIn.vue'),
    },
    {
      path: '/register',
      component: () => import('./views/auth/SignUp.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('./views/404.vue'),
    },
    {
      path: '/account',
      component: () => import('./views/auth/Account.vue'),
    }
  ],
})

// router.afterEach((to, from, failure) => {
//   if (to.path != '/account' && sessionStorage.getItem('accountIsCurrent') == 'true') { 
//     sessionStorage.setItem('accountIsCurrent', 'false');
//     sessionStorage.removeItem('subNav');
//   }
// })

export default router
