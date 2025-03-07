import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr"
import path from "path"

const resolve = (dir:any) => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr({ svgrOptions: { icon: true } })],
  resolve: {
    alias: {
      '@': resolve('src'),
      '@icons': resolve('src/icons'),
      '@commons': resolve('src/commons'),
      '@apis': resolve('src/apis'),
      '@app': path.resolve(__dirname, './src/app'),
      '@components': resolve('src/components'),
    }
  },
  server: {
    port: 3200,
    proxy: {
      '/tenant-api': {
        target: 'http://localhost:8200/',
        // target: 'http://demo.phecda-foundation-backend.moensun.net/',
        changeOrigin: true,
        secure: false,
      },
      "/boss-api": {
        target: "http://localhost:8200/",
        // target: 'http://demo.phecda-foundation-backend.moensun.net/',
        changeOrigin: true,
        secure: false
      },
    }
  }
})
