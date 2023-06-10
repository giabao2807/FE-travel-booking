import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/App.vue'
import { vuetify } from '@/plugins/vuetify'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/scss/themeElement.scss'
import '@/assets/css/index.css'
import router from '@/router'
import CKEditor from '@ckeditor/ckeditor5-vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(vuetify)
app.use(ElementPlus)
app.use(CKEditor)
app.use(router).mount('#app')
