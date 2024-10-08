import { createRouter, createWebHistory } from 'vue-router';
import LayoutView from '../views/BellisTest.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Document_Default',
      redirect: '/Content/WebHome',
    },
    {
      path: '/:val',
      name: 'Document_Partial',
      redirect: to => {
        console.log(to.path);
        if (to.path.endsWith('/')) {
          return { path: to.path + 'WebHome' }
        }
        return { path: '/Content' + to.path }
      },
    },
    {
      path: '/:spacename/:docname',
      name: 'Document',
      props: true,
      component: LayoutView,
    },
  ],
});

export default router;
