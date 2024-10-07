<template>
  <div ref="htmlElem"></div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from 'vue'
const htmlElem = ref()
const props = defineProps<{
  html: string
}>()
const updateContent = (html: string) => {
  htmlElem.value.replaceChildren()
  htmlElem.value.insertAdjacentHTML('afterbegin', html)
}
watch(props, (props) => updateContent(props.html))
onMounted(() => updateContent(props.html))
</script>
