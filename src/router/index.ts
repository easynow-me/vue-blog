import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

Vue.use(Router);

import Layout from '@/layout/index.vue';
import i18n from '@/lang';

export const constantRoutes: RouteConfig[] = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index.vue')
      }
    ],
    meta: { hidden: true }
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: i18n.t('route.dashboard'),
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  }
];

const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher;
}

export default router;
