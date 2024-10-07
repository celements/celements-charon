import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
export default mergeConfig(viteConfig, defineConfig({
    test: {
        // Specify the test files location
        root: './test',
    },
}));
