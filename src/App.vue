<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useLayoutStore } from '@/stores/layoutStore';
import HeadComponent from '@/components/HeadComponent.vue';

const layoutStore = useLayoutStore();

onMounted(() => {
  console.log('App mounted');
  layoutStore.initLayoutJson();
  layoutStore.fetchFiles();
});
console.log('JS Files: ', layoutStore.jsFilePaths.toString());
</script>

<template>
  <HeadComponent />
  <RouterView />
</template>
