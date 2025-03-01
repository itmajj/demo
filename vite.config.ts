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

  // server: {
  //   proxy: {
  //     '/': {
  //       target: 'http://127.0.0.1:4523/m1/5922937-5610011-default',  //你要跨域访问的网址
  //       changeOrigin: true,   // 允许跨域
  //       // rewrite: (path) => path.replace(/^\//, '') // 重写路径把路径变成空字符
  //     }
  //   }
  // }
})