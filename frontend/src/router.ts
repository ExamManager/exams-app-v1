import { createRouter, createWebHistory } from 'vue-router'
import authenticate from './functions/authenticate';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      publicPath: '/',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/free',
      publicPath: '/free',
      component: () => import('./views/free/Home.vue'),
    },
    {
      path: '/premium',
      publicPath: '/premium',
      component: () => import('./views/premium/Home.vue'),
    },
    {
      path: '/premium/studentview',
      publicPath: '/premium/studentview',
      component: () => import('./views/premium/Fullscreen.vue'),
    },
    {
      path: '/pricing',
      publicPath: '/pricing',
      component: () => import('./views/Pricing.vue'),
    },
    {
      path: '/login',
      publicPath: '/login',
      component: () => import('./views/auth/SignIn.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuthenticated = await authenticate.methods.checkStatus();
        console.log(isAuthenticated);
        if (isAuthenticated === false) {
          // do nothing
          next()
        } else {
          next('/account')
        }
      }
    },
    {
      path: '/register',
      publicPath: '/register',
      component: () => import('./views/auth/SignUp.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuthenticated = await authenticate.methods.checkStatus();
        console.log(isAuthenticated);
        if (isAuthenticated === false) {
          // do nothing
          next()
        } else {
          next('/account')
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      publicPath: '/:pathMatch(.*)*',
      component: () => import('./views/404.vue'),
    },
    {
      path: '/account',
      publicPath: '/account',
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
      publicPath: '/setup',
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
