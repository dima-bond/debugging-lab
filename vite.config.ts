import { defineConfig, type Connect, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const catalog = {
  categories: {
    delay: 620,
    data: [
      { id: 'carry', label: 'Carry goods' },
      { id: 'desk', label: 'For the desk' },
      { id: 'travel', label: 'Travel well' },
    ],
  },
  products: {
    delay: 480,
    data: [
      { name: 'Canvas Weekender', category: 'Carry goods' },
      { name: 'Field Notebook Set', category: 'For the desk' },
      { name: 'Travel Mug No. 2', category: 'Travel well' },
    ],
  },
  prices: {
    delay: 680,
    data: [{ price: '€64' }, { price: '€18' }, { price: '€32' }],
  },
}

const handleCatalogRequest: Connect.NextHandleFunction = (req, res, next) => {
  if (req.method !== 'GET') {
    next()
    return
  }

  const resource = new URL(req.url ?? '/', 'http://localhost').pathname.slice(1)
  const response = catalog[resource as keyof typeof catalog]
  if (!response) {
    next()
    return
  }

  setTimeout(() => {
    if (res.destroyed) return
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('Server-Timing', `mock-api;dur=${response.delay}`)
    res.end(JSON.stringify(response.data))
  }, response.delay)
}

const delayedCatalogApi: Plugin = {
  name: 'delayed-catalog-api',
  configureServer(server) {
    server.middlewares.use('/api/catalog', handleCatalogRequest)
  },
  configurePreviewServer(server) {
    server.middlewares.use('/api/catalog', handleCatalogRequest)
  },
}

export default defineConfig({
  plugins: [react(), delayedCatalogApi],
})
