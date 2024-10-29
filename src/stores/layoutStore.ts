import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface LayoutNode {
  tagName?: string;
  attributes?: Record<string, string>;
  content?: string;
  subnodes?: LayoutNode[];
}

export interface HeaderData {
  title: string;
  description: string | null;
  language: string;
  favicon: string | null;
  stylesheets: CssEntry[];
  scripts: JsEntry[];
}

export interface CssEntry {
  path: string;
  alternate?: boolean;
  title?: string;
  media?: string;
}

export interface JsEntry {
  path: string;
  module: boolean;
  mode: string;
}


export const useLayoutStore = defineStore('layout', () => {
  const layoutJson = ref<LayoutNode[] | undefined>(undefined);
  const headerData = ref<HeaderData | undefined>(undefined);
  const cssFilePaths = ref<string[]>([
    '/assets/mock-data/BellisLayout/WebHome/Bellis-mobile.css',
    '/assets/mock-data/BellisLayout/WebHome/Bellis.css',
    '/assets/mock-data/BellisLayout/WebHome/Bellis-content.css',
    '/assets/mock-data/BellisLayout/WebHome/Bellis-footer.css',
    '/assets/mock-data/BellisLayout/WebHome/presentation.css',
    '/assets/mock-data/BellisLayout/WebHome/Bellis-header.css',
  ]);
  const jsFilePaths = computed<string[]>(() => {
    console.log('computing jsFilePaths');
    return headerData.value?.scripts.map((entry) => entry.path) || [];
  });

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

  async function fetchFiles() {
    const queryParams = '?space=Content&doc=untitled1';
    const url =       import.meta.env.VITE_DB_PATH +
    import.meta.env.VITE_API + '/head' + queryParams;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Response status: ' + response.status);
      }
      headerData.value = await response.json();
      console.log('Header data:', headerData);
    } catch (error) {
      console.error('Failed to fetch file JSON:', error);
    }
  }

  return { layoutJson, cssFilePaths, jsFilePaths, initLayoutJson, fetchFiles };
});
