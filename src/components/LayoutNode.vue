<template>
  <component :is="tagName" v-bind="rootNode.attributes">
    <LayoutNode
      v-for="node in children"
      :key="node.attributes?.['data-cell-ref']"
      :root-node="node"
      :context-doc-space="contextDocSpace"
      :context-doc-name="contextDocName"
    />
    <RichTextComponent
      v-if="children.length == 0"
      :context-doc-space="contextDocSpace"
      :context-doc-name="contextDocName"
      :start-node-name="startNodeName"
    />
  </component>
</template>

<script setup lang="ts">
import { type LayoutNode } from '@/stores/layoutStore';
import { computed, defineProps } from 'vue';
import RichTextComponent from './RichTextComponent.vue';

const props = defineProps<{
  rootNode: LayoutNode;
  contextDocSpace: string;
  contextDocName: string;
}>();

const tagName = computed(() => props.rootNode.tagName ?? 'div');
const children = computed(() => props.rootNode.subnodes ?? []);
const startNodeName = computed(() => props.rootNode.content?.replace(/.*\.(.*?)$/g, '$1'));
</script>
