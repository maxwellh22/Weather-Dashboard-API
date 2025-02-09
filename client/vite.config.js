import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://weather-dashboard-api-z8xv.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
