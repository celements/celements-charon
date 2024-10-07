<template>
  <HtmlElement :html="html"></HtmlElement>
</template>

<script setup lang="ts">
import HtmlElement from '@/components/base/HtmlElement.vue'
import { defineProps, ref, watch } from 'vue'
const props = defineProps<{
  url: string
  contextDocSpace: string
  contextDocName: string
  layoutSpace: string
  startNodeName?: string
}>()
const html = ref('')
const loadHtml = async (url) => {
  if (!props.startNodeName) return;
  try {
    console.log('fetch html', url)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/xml',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contextDocSpace: props.contextDocSpace,
        contextDocName: props.contextDocName,
        layoutSpace: props.layoutSpace,
        startNodeName: props?.startNodeName ?? null
      })
    })
    html.value = await response.text()
    console.log('html', html.value)
  } catch (error) {
    console.error(error)
    html.value = 'error ' + error
  }
}
watch(props, (props) => loadHtml(props.url))
loadHtml(props.url)
</script>
