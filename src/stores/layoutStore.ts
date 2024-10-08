import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface LayoutNode {
  tagName?: string;
  attributes?: Record<string, string>;
  content?: string;
  subnodes?: LayoutNode[];
}

export const useLayoutStore = defineStore('layout', () => {
  const layoutJson = ref<LayoutNode[] | undefined>(undefined);
  const cssFileStrings = ref<string[]>([
    '/assets/mock-data/BellisLayout/WebHome/Bellis-mobile.css',
      '/assets/mock-data/BellisLayout/WebHome/Bellis.css',
      '/assets/mock-data/BellisLayout/WebHome/Bellis-content.css',
      '/assets/mock-data/BellisLayout/WebHome/Bellis-footer.css',
      '/assets/mock-data/BellisLayout/WebHome/presentation.css',
      '/assets/mock-data/BellisLayout/WebHome/Bellis-header.css']);

  async function initLayoutJson() {
    const url =
      import.meta.env.VITE_DB_PATH +
      import.meta.env.VITE_API +
      '/json/' +
      import.meta.env.VITE_LAYOUT_SPACE;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Response status: ' + response.status);
      }
      layoutJson.value = await response.json();
    } catch (error) {
      console.error('Failed to fetch layout JSON:', error);
    }
  }

  return { layoutJson, cssFileStrings, initLayoutJson };
});
