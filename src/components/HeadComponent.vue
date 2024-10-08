<template>
  <Teleport to="head">
    <link v-for="fileName in layoutStore.cssFileStrings" :key="fileName" rel="stylesheet" media="all"  type="text/css" :href="fileName"/>
  </Teleport>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores/layoutStore';

const layoutStore = useLayoutStore();
console.log('layoutStore.cssFileStrings', layoutStore.cssFileStrings);

</script>

