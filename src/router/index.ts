import { createRouter, createWebHistory } from 'vue-router';
import { store } from '@/store';
import { initUser } from '@/InitUser';
import AxiosService from '@/services/AxiosService';
import type User from '@/interfaces/User';
import AuthService from '@/services/AuthService';

let user: User | null;
const auth = new AuthService;
const axiosService = new AxiosService;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'register',
      path: '/register',
      meta: {
        requiresUnauthenticated: true,
      },
      component: () => import('../views/auth/register.vue')
    },
    {
      name: 'login',
      path: '/login',
      meta: {
        requiresUnauthenticated: true,
      },
      component: () => import('../views/auth/login.vue')
    },
    {
      name: 'home',
      path: '/home',
      beforeEnter: [onlyAuthenticated],
      meta: {
        requiresAuthenticated: true,
      },
      component: () => import('../views/home.vue')
    },
  ]
});

async function onlyAuthenticated(to: any, from: any): Promise<any> {
  const userFromTheBrowser = auth.getUserFromTheBrowser();
  
  if (userFromTheBrowser?.token) {
    await axiosService.setAuthToken(userFromTheBrowser.token);
    user = await initUser();
  }

  if (user) {
    return true;
  } else if (!user) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    };
  }
}

export default router;