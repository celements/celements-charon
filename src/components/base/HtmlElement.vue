<template>
  <div ref="htmlElem">
    <VueSpinner size="20" color="#3E3E3E" />
  </div>
</template>

<script setup lang="ts">
import type { Maybe } from '@/utils/utils';
import { onMounted, useTemplateRef, watch } from 'vue';
import { VueSpinner } from 'vue3-spinners';

const htmlElem = useTemplateRef('htmlElem');
const props = defineProps<{
  html: Maybe<string>;
}>();
const updateContent = (html: Maybe<string>) => {
  if (!html) return;
  console.log('updateContent', html);
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
