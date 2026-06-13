import { defineConfig } from 'vite';

export default defineConfig({
  // Configure relative paths so assets load correctly on GitHub Pages subdirectories
  base: './',
  build: {
    outDir: 'dist',
  }
});
