import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

Vue.use(Router);

import Layout from '@/layout/index.vue';
import BlogLayout from '@/blogLayout/index.vue';
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
    component: BlogLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: i18n.t('route.home'),
          icon: 'home',
          affix: true
        }
      },
      {
        path: 'article/:id',
        component: () => import('@/views/article/index.vue'),
        name: 'Article',
        meta: {
          title: i18n.t('route.article'),
          icon: 'article',
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
