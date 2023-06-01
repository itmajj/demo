import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
      ],
      imports: ['vue'],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
   ],
   base:'/'

  // server: {
  //   proxy: {
  //     '/': {
  //       target: 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',  //你要跨域访问的网址
  //       changeOrigin: true,   // 允许跨域
  //       // rewrite: (path) => path.replace(/^\/api/, '') // 重写路径把路径变成空字符
  //     }
  //   }
  // }
})