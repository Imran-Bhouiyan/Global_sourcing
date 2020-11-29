import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Dashboard'),
      name: "main",
      meta: {
        guest: true,
      },
    },
    {
      path: '/dashboard',
      component: () => import('@/views/dashboard/Index'),
      meta: {
        requiresAuth: true,
      },
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages

        {
          name: 'Dashboard',
          path: 'pages/about',
          component: () => import('@/views/dashboard/pages/About'),
        },

      ],
    },


  ],
});



export default router;
