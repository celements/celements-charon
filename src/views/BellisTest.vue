<template>
  <p>Bellis async geladen</p>
  <LayoutNode v-for="node in layoutJson" :node="node"></LayoutNode>
</template>

<script setup lang="ts">
import LayoutNode from '@/components/LayoutNode.vue';
import { useLayoutStore } from '../stores/layoutStore';
import { storeToRefs } from 'pinia';

const layoutStore = useLayoutStore();
const { layoutJson } = storeToRefs(layoutStore);
</script>
