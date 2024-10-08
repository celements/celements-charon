<template>
  <LayoutNode
    v-for="node in layoutJson"
    :key="node.attributes?.['data-cell-ref']"
    :root-node="node"
    :context-doc-space="props.spacename"
    :context-doc-name="props.docname"
  />
</template>

<script setup lang="ts">
import LayoutNode from '@/components/LayoutNode.vue';
import { useLayoutStore } from '@/stores/layoutStore';
import { storeToRefs } from 'pinia';

const props = defineProps<{ spacename: string; docname: string }>();

const layoutStore = useLayoutStore();
const { layoutJson } = storeToRefs(layoutStore);
</script>
