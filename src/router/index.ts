import { createRouter, createWebHistory } from 'vue-router';
import LayoutView from '../views/BellisTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:spacename/',
      name: 'Content',
      alias: [''],
      props: true,
      children: [{
        path: ':docname',
        name: 'WebHome',
        alias: ['', '/:docname'],
        component: LayoutView,
        props: true,
      }],
    },
  ],
});

export default router;
