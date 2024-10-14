<template>
  <Teleport to="head">
    <link
      v-for="fileName in layoutStore.cssFilePaths"
      :key="fileName"
      rel="stylesheet"
      media="all"
      type="text/css"
      :href="fileName"
    />
    <component
    :is="'script'"
    v-for="fileName in layoutStore.jsFilePaths"
    :key="fileName"
    defer
    :src="fileName"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/stores/layoutStore';

const layoutStore = useLayoutStore();

</script>
