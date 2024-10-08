<template>
  <HtmlElement :html="html"></HtmlElement>
</template>

<script setup lang="ts">
import HtmlElement from '@/components/base/HtmlElement.vue';
import { defineProps, ref } from 'vue';
const props = defineProps<{
  contextDocSpace: string;
  contextDocName: string;
  startNodeName?: string;
}>();

const html = ref('');
const url: string = import.meta.env.VITE_DB_PATH + import.meta.env.VITE_API + '/partial';
const layoutSpace: string = import.meta.env.VITE_LAYOUT_SPACE;

const loadHtml = async (url: string) => {
  if (!props.startNodeName) return;
  try {
    console.log('fetch html', url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/xml',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contextDocSpace: props.contextDocSpace,
        contextDocName: props.contextDocName,
        layoutSpace: layoutSpace,
        startNodeName: props?.startNodeName ?? null,
      }),
    });
    html.value = await response.text();
    console.log('html', html.value);
  } catch (error) {
    console.error(error);
    html.value = 'error ' + error;
  }
};
loadHtml(url);
</script>
