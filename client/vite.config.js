import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible'
// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP_",
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Địa chỉ của máy chủ back-end
      },
    },
  },
  plugins: [
    react(),
    envCompatible
  ],
})
