<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useLayoutStore } from './stores/layoutStore';
import HeadComponent from '@/components/HeadComponent.vue';

const layoutStore = useLayoutStore();

onMounted(() => {
  console.log('App mounted');
  layoutStore.initLayoutJson();
});
</script>

<template>
  <HeadComponent />
  <RouterView />
</template>
