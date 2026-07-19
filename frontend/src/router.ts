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
      path: '/demo',
      component: () => import('./views/premium/Home.vue'),
    },
    {
      path: '/demo/studentview',
      component: () => import('./views/premium/Fullscreen.vue'),
    },
    {
      path: '/pricing',
      component: () => import('./views/Pricing.vue'),
    },
    {
      path: '/privacy',
      component: () => import('./views/PrivacyPolicy.vue'),
    },
    {
      path: '/support',
      component: () => import('./views/support/HelpCenter.vue'),
    },
    {
      path: '/support/guides',
      component: () => import('./views/support/Guides.vue'),
    },
    {
      path: '/docs',
      component: () => import('./views/documentation/Home.vue'),
    },
    {
      path: '/login',
      component: () => import('./views/auth/SignIn.vue'),
      beforeEnter: async (_to, _from, next) => {
        const isAuthenticated = await authenticate.methods.checkOnRoute();
        if (isAuthenticated === false) {
          next()
        } else {
          next('/account')
        }
      }
    },
    {
      path: '/account',
      component: () => import('./views/auth/Account.vue'),
      beforeEnter: async (_to, _from, next) => {
        const isAuthenticated = await authenticate.methods.checkOnRoute();
        if (isAuthenticated != false) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/setup',
      component: () => import('./views/auth/AccountSetup.vue'),
      beforeEnter: async (_to, _from, next) => {
        const isAuthenticated = await authenticate.methods.checkOnRoute();
        if (isAuthenticated != false) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/reset',
      component: () => import('./views/auth/ResetPassword.vue')
    },
    {
      path: '/setnewpassword',
      component: () => import('./views/auth/SetNewPassword.vue'),
    },
    {
      path: '/dashboard',
      component: () => import('./views/dashboard/dashboard.vue'),
    },
    {
      path: '/dashboard/planner',
      component: () => import('./views/dashboard/planner.vue'),
    },
    // Catch-all must be last so named routes above are reachable
    {
      path: '/:pathMatch(.*)*',
      component: () => import('./views/404.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
})

const SITE_NAME = 'ExamManager V1'

const routeTitles: Record<string, string> = {
  '/': SITE_NAME,
  '/free': `Free | ${SITE_NAME}`,
  '/demo': `Demo | ${SITE_NAME}`,
  '/demo/studentview': `Student View | ${SITE_NAME}`,
  '/pricing': `Pricing | ${SITE_NAME}`,
  '/privacy': `Privacy | ${SITE_NAME}`,
  '/support': `Support | ${SITE_NAME}`,
  '/support/guides': `Guides | ${SITE_NAME}`,
  '/docs': `Docs | ${SITE_NAME}`,
  '/login': `Sign In | ${SITE_NAME}`,
  '/account': `Account | ${SITE_NAME}`,
  '/setup': `Setup | ${SITE_NAME}`,
  '/reset': `Reset Password | ${SITE_NAME}`,
  '/setnewpassword': `Set New Password | ${SITE_NAME}`,
  '/dashboard': `Dashboard | ${SITE_NAME}`,
  '/dashboard/planner': `Planner | ${SITE_NAME}`,
}

router.afterEach((to) => {
  document.title = routeTitles[to.path] ?? SITE_NAME
})

export default router
