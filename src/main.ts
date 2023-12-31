import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import iceRequest from './service/request'
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

iceRequest.request({
  url: '',
  method: 'GET',
  showLoading: true
})

// console.log(import.meta.url)
// console.log(import.meta.env.DEV)
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.VITE_APP_BASE_URL)
// console.log(import.meta.env.BASE_URL)

app.mount('#app')
