/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/frontend',
  server: {
    port: 4200,
    host: 'localhost',
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react(), tailwindcss()],
  
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
