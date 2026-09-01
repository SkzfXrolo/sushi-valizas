import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const pages = {
  '/rocha': '/rocha.html',
  '/menu': '/menu.html',
  '/fotos': '/fotos.html',
  '/sushimen': '/sushimen.html',
  '/reservas': '/reservas.html',
  '/contacto': '/contacto.html',
}

function cleanUrlPlugin() {
  return {
    name: 'clean-urls',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split('?')[0]
        if (url && pages[url]) {
          req.url = pages[url] + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '')
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [cleanUrlPlugin()],
  server: {
    port: 5174,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        rocha: resolve(__dirname, 'rocha.html'),
        menu: resolve(__dirname, 'menu.html'),
        fotos: resolve(__dirname, 'fotos.html'),
        sushimen: resolve(__dirname, 'sushimen.html'),
        reservas: resolve(__dirname, 'reservas.html'),
        contacto: resolve(__dirname, 'contacto.html'),
      },
    },
  },
})
