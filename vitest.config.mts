import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // Specify the test files location
      root: './test',
    },
  })
);
