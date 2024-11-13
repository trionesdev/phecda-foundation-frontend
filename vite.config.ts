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
      '@views': resolve('src/views'),
      '@components': resolve('src/components'),
    }
  },
  server: {
    port: 3200,
    proxy: {
      '/tenant-api': {
        target: 'http://localhost:8200/',
        // target: 'http://192.168.10.202:82/', //测试站ip
        // target: 'http://192.168.10.73:8080/', //戎宇ip
        // target: 'http://192.168.10.150:8080/', //陈涛ip
        // target: "http://dubhe-gateway.moensun.cn/",
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
