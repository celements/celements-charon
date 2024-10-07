import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  envDir: '..',
  plugins: [vue(), topLevelAwait()],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['.', '../node_modules'],
    },
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          axios: ['axios'],
          fontawesomeCore: [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/vue-fontawesome',
          ],
          fontawesomeSolid: ['@fortawesome/free-solid-svg-icons'],
          fontawesomeRegular: ['@fortawesome/free-regular-svg-icons'],
          moment: ['moment', 'moment-timezone'],
          oidc: ['oidc-client-ts'],
          vue: [
            'vue',
            'vue-router',
            'pinia',
            'vue-i18n',
            'vue3-loading-overlay',
            '@vueuse/core',
            '@vueuse/math',
            '@vuelidate/core',
            '@vuelidate/validators',
          ],
        },
      },
    },
  },
});
