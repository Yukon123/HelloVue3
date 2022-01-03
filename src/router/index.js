import { createRouter, createWebHistory } from 'vue-router'
import Vue2 from '../views/vue2.vue'

const routes = [
  {
    path: '/Vue2',
    name: 'Vue2',
    component: Vue2,
  },
  {
    path: '/Vue3',
    name: 'vue3',
    component: () => import(/* webpackChunkName: "about" */ '../views/vue3.vue'),
  },
  {
    path: '/Setup',
    name: 'setup',
    component: () => import(/* webpackChunkName: "about" */ '../views/setup.vue'),
  },
  {
    path: '/usehook',
    name: 'usehook',
    component: () => import(/* webpackChunkName: "about" */ '../views/useHook.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
