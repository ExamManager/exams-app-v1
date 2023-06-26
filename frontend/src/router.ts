import { createRouter, createWebHistory } from 'vue-router'
import authenticate from './functions/authenticate';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/test',
      publicPath: '/test',
      component: () => import('./components/testing.vue'),
    },
    {
      path: '/',
      publicPath: '/',
      component: () => import('./views/Home.vue'),
      // beforeEnter: (to, from, next) => {
      //   authenticate.methods.updateData();
      //   console.log('before each');
      //   next();
      // },
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
      path: '/privacy',
      publicPath: '/privacy',
      component: () => import('./views/PrivacyPolicy.vue'),
    },
    {
      path: '/support', 
      publicPath: '/support',
      component: () => import('./views/support/HelpCenter.vue'),
    },
    {
      path: '/support/guides',
      publicPath: '/support/guides',
      component: () => import('./views/support/Guides.vue'),
    },
    {
      path: '/docs',
      publicPath: '/docs',
      component: () => import('./views/documentation/Home.vue'),
      
    },
    {
      path: '/login',
      publicPath: '/login',
      component: () => import('./views/auth/SignIn.vue'),
      beforeEnter: async (to, from, next) => {
        const isAuthenticated = await authenticate.methods.checkOnRoute();
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
        const isAuthenticated = await authenticate.methods.checkOnRoute();
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
        const isAuthenticated = await authenticate.methods.checkOnRoute();
        console.log(isAuthenticated);
        // returns fals if user is not authenticated and returns the user id if user is authenticated
        if (isAuthenticated != false) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/reset',
      publicPath: '/reset',
      component: () => import ('./views/auth/ResetPassword.vue')
    },
    {
      path: '/setnewpassword',
      publicPath: '/setnewpassword', 
      component: () => import('./views/auth/SetNewPassword.vue'),
    },
    {
      path: '/passwordResetTemplate',
      publicPath: '/emailTemplate',
      component: () => import('./components/email/passwordResetEmail.vue'),
    },
    {
      path: '/inviteNewUserTemplate',
      publicPath: '/inviteNewUserTemplate',
    component: () => import('./components/email/inviteNewUser.vue'),
    },
    {
      path: '/accountDeletedTemplate',
      publicPath: '/accountDeletedTemplate',
      component: () => import('./components/email/accountDeleted.vue'),
    },
    {
      path: '/accountCreatedTemplate',
      publicPath: '/accountCreatedTemplate',
      component: () => import('./components/email/accountCreated.vue'),
    },
    {
      path: '/accountEditedTemplate',
      publicPath: '/accountEditedTemplate',
      component: () => import('./components/email/accountEdited.vue'),
    },
    {
      path: '/passwordChangedTemplate',
      publicPath: '/passwordChangedTemplate',
      component: () => import('./components/email/passwordChanged.vue'),
    },
    {
      path: '/newLoginTemplate',
      publicPath: '/newLoginTemplate',
      component: () => import('./components/email/newLogin.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
})



export default router
