import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/bellis',
      name: 'bellis',
      component: () => import('../views/BellisTest.vue'),
    },
  ],
});

export default router;
