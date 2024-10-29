<template>
  <div ref="htmlElem"></div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, useTemplateRef, watch } from 'vue';
const htmlElem = useTemplateRef('htmlElem');
const props = defineProps<{
  html: string;
}>();
const updateContent = (html: string) => {
  if (htmlElem.value) {
    htmlElem.value.replaceChildren();
    htmlElem.value.insertAdjacentHTML('afterbegin', html);
  } else {
    console.error('template reference "htmlElem" not found');
  }
};
watch(props, (props) => updateContent(props.html));
onMounted(() => updateContent(props.html));
</script>
