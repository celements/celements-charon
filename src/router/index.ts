import LayoutView from '@/views/BellisTest.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:part1?/:part2?',
      name: 'Document',
      props: route => {
        console.log('Document route', route.path.endsWith('/'), 'part1', route.params.part1, 'part2', route.params.part2);
        const spacename = (((route.path.endsWith('/') && !!route.params.part1) || (!!route.params.part2 && !!route.params.part1)) ? route.params.part1 : undefined) ?? 'Content';
        const docname = [route.params.part2, !route.path.endsWith('/') ? route.params.part1 : undefined, 'WebHome'].find(part => !!part && part.length > 0);
        console.log('Document params space', spacename, 'document', docname);
        return {
          spacename: spacename,
          docname : docname,
        };
      },
      component: LayoutView,
    },
  ],
});

export default router;
