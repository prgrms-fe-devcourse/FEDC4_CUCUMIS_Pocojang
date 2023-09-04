import path from 'path';

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@/public',
        replacement: path.resolve(__dirname, ''),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
})
