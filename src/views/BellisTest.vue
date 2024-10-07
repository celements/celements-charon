<template>
  <p>Bellis async geladen</p>
  <CelementsComponent
    url="https://bellis.celdev.sneakapeek.ch/api/v1/layouts/partial"
    context-doc-space="Content"
    context-doc-name="untitled1"
    layout-space="Bellis-OB-Layout"
    start-node-name="nav"
  />
</template>

<script setup lang="ts">
import CelementsComponent from '@/components/CelementsComponent.vue'
import { useLayoutStore } from '../stores/layoutStore'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

const layoutStore = useLayoutStore()
const { layoutJson } = storeToRefs(layoutStore)

watch(layoutJson, async (layoutJson) => {
  console.log('BellisTest layoutJson changed')
  console.log('layoutJson', JSON.stringify(layoutJson))
})
</script>
