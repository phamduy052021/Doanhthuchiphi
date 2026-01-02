
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/frontend/components'),
      '@/lib': path.resolve(__dirname, './src/frontend/lib'),
      '@/utils': path.resolve(__dirname, './src/frontend/utils'),
      '@/services': path.resolve(__dirname, './src/frontend/services'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/backend': path.resolve(__dirname, './src/backend'),
    },
  },
  root: './',
  publicDir: 'public',
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
    cors: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'hono'],
  },
});