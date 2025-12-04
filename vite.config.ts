import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 👇 Library build configuration – uses src/index.ts
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ContentstackPersonalize',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // Don't bundle React into the library
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
