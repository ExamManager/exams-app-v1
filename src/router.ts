import { createRouter, createWebHistory } from 'vue-router'
import authenticate from './functions/authenticate';


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
      // check if user is authenticated
      beforeEnter: async (to, from, next) => {
        const isAuthenticated = await authenticate.methods.checkStatus();
        console.log(isAuthenticated);
        if (isAuthenticated != false) {
          // do nothing
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/setup',
      component: () => import('./views/auth/AccountSetup.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuthenticated = await authenticate.methods.checkStatus();
        console.log(isAuthenticated);
        // returns fals if user is not authenticated and returns the user id if user is authenticated
        if (isAuthenticated != false) {
          next()
        } else {
          next('/login')
        }
      }
    },
  ],
})



export default router
