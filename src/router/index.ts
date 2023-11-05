import { createRouter, createWebHistory } from 'vue-router';
import { onlyAuthenticated, onlyUnauthenticated } from '@/helpers/router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'register',
      path: '/register',
      beforeEnter: [onlyUnauthenticated],
      component: () => import('../views/auth/register.vue')
    },
    {
      name: 'login',
      path: '/login',
      beforeEnter: [onlyUnauthenticated],
      component: () => import('../views/auth/login.vue')
    },
    {
      name: 'home',
      path: '/home',
      beforeEnter: [onlyAuthenticated],
      component: () => import('../views/home.vue')
    },
    {
      path: '',
      redirect: to => {
        return {
          name: 'login',
          query: { redirect: to.fullPath },
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/errors/notFound.vue')
    }
  ]
});

export default router;