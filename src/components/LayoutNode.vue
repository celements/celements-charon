<template>
  <component :is="tagName" v-bind="props.node.attributes">
    <LayoutNode
      v-for="node in props.node.subnodes"
      v-if="props.node.subnodes.length > 0"
      :node="node"
    ></LayoutNode>
    <RichTextComponent
      v-else
      context-doc-space="Content"
      context-doc-name="untitled1"
      :start-node-name="startNodeName"
    />
  </component>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { type LayoutNode } from '@/stores/layoutStore.ts';
import RichTextComponent from './RichTextComponent.vue';
import { ref } from 'vue';

const props = defineProps<{
  node: LayoutNode;
}>();

const tagName: string = props.node.tagName ?? 'div';
const startNodeName = ref(props.node.content?.replace(/.*\.(.*?)$/g, '$1'));
</script>
