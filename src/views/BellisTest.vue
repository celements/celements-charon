<template>
  <p>Bellis async geladen</p>
  <CelementsComponent
    :url = "url"
    context-doc-space="Content"
    context-doc-name="untitled1"
    :layout-space="layoutSpace"
    :start-node-name="nodeName"
  />
</template>

<script setup lang="ts">
import CelementsComponent from '@/components/CelementsComponent.vue'
import { useLayoutStore } from '../stores/layoutStore'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

const url = import.meta.env.VITE_DB_PATH + import.meta.env.VITE_API + '/partial';
const layoutSpace = import.meta.env.VITE_LAYOUT_SPACE;

const layoutStore = useLayoutStore()
const { layoutJson } = storeToRefs(layoutStore)
const nodeName = ref<string | undefined>();

watch(layoutJson, async (layoutJson) => {
  console.log('BellisTest layoutJson changed')
  console.log('layoutJson', JSON.stringify(layoutJson))
  nodeName.value = layoutJson?.[0].subnodes?.[1].subnodes?.[0].subnodes?.[1].attributes?.id;
});
</script>
