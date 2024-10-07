<template>
  <component :is="tagName" v-bind="rootNode.attributes">
    <LayoutNode
      v-for="node in children"
      :key="node.attributes?.['data-cell-ref']"
      :root-node="node"
    />
    <RichTextComponent
      v-if="children.length == 0"
      context-doc-space="Content"
      context-doc-name="untitled1"
      :start-node-name="startNodeName"
    />
  </component>
</template>

<script setup lang="ts">
import { type LayoutNode } from '@/stores/layoutStore';
import { computed, defineProps } from 'vue';
import RichTextComponent from './RichTextComponent.vue';

const props = defineProps<{ rootNode: LayoutNode }>();

const tagName = computed(() => props.rootNode.tagName ?? 'div');
const children = computed(() => props.rootNode.subnodes ?? []);
const startNodeName = computed(() => props.rootNode.content?.replace(/.*\.(.*?)$/g, '$1'));
</script>
