import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { vuetify } from './plugins/vuetify'
import router from './router'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(vuetify)
app.use(router).mount('#app')
