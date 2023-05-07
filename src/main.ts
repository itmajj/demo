import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
const app = createApp(App)
const store = createPinia()
app.use(router).use(store).mount('#app')
