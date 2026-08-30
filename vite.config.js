import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        skillGap: resolve(__dirname, 'skill-gap.html'),
        initiatives: resolve(__dirname, 'initiatives.html'),
        trainee: resolve(__dirname, 'trainee.html'),
      },
    },
  },
})


