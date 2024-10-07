<template>
  <LayoutNode
    v-for="node in layoutJson"
    :key="node.attributes?.['data-cell-ref']"
    :root-node="node"
  />
</template>

<script setup lang="ts">
import LayoutNode from '@/components/LayoutNode.vue';
import { useLayoutStore } from '@/stores/layoutStore';
import { storeToRefs } from 'pinia';

const layoutStore = useLayoutStore();
const { layoutJson } = storeToRefs(layoutStore);
</script>
