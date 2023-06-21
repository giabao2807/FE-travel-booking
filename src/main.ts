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
import vue3GoogleLogin from 'vue3-google-login'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(vuetify)
app.use(ElementPlus)
app.use(CKEditor)
app.use(vue3GoogleLogin, {
  clientId: '998587115630-ubo22cf69riu891huoch6c0nbckm10h0.apps.googleusercontent.com'
})
app.use(router).mount('#app')
