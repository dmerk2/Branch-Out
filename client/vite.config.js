import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      },
      '/presigned-url': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      },
      // '/presigned-url': {
      //   target: 'https://branch-out-web-service.onrender.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/presigned-url/, '')
      // },
    }
  }
})
