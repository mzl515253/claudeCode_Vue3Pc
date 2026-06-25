import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import i18n from './i18n'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// Element Plus dark theme variables
import 'element-plus/theme-chalk/dark/css-vars.css'

// Global styles
import '@/assets/styles/index.scss'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(i18n)
app.use(ElementPlus, { size: 'default' })

app.mount('#app')
