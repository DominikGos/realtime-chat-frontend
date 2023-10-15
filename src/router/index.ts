import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    name: 'register',
    path: '/register',
    component: () => import('../views/auth/register.vue')
   },
   {
    name: 'login',
    path: '/login',
    component: () => import('../views/auth/login.vue')
   },
   {
    name: 'home',
    path: '/home',
    component: () => import('../views/home.vue')
   },
  ]
});

export default router;