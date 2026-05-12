import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig } from 'vite';
import { glob } from 'glob';

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync('*.html', { ignore: ['*_online.html'] })
          .map(file => [file.replace('.html', ''), path.resolve(__dirname, file)])
      ),
    },
  },
});
