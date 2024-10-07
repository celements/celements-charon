import { defineStore } from 'pinia'
import { ref } from '@vue/reactivity';

export const useLayoutStore = defineStore('layout', () => {
  const layoutJson = ref<object | undefined>(undefined);

  async function initLayoutJson() {
    const url = 'https://bellis.celdev.sneakapeek.ch/api/v1/layouts/json/Bellis-OB-Layout';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Response status: ' + response.status);
      }
      layoutJson.value = await response.json();
    }catch (error) {
      console.error('Failed to fetch layout JSON:', error);
    }
  } 

  return { layoutJson, initLayoutJson }
})
