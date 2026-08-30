import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function multiPageRewritePlugin() {
  return {
    name: 'multipage-rewrite',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : ''
        const query = req.url && req.url.includes('?') ? '?' + req.url.split('?')[1] : ''
        const rewrites = {
          '/dashboard': '/dashboard.html',
          '/skill-gap': '/skill-gap.html',
          '/initiatives': '/initiatives.html',
          '/trainee': '/trainee.html',
          '/employment': '/dashboard.html',
          '/training': '/initiatives.html',
          '/career': '/trainee.html',
        }
        if (rewrites[url]) {
          req.url = rewrites[url] + query
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), multiPageRewritePlugin()],
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



