import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0',
    port: 3001,
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@src': path.resolve(__dirname, '/src'),
      '@components': path.resolve(__dirname, '/src/components'),
      '@services': path.resolve(__dirname, '/src/services'),
      '@__tests__': path.resolve(__dirname, '/__tests__'),
    },
  },

})
