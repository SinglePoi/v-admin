import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import iceRequest from './service/request'
const app = createApp(App)

app.use(createPinia())
app.use(router)

iceRequest.request({
  url: '',
  method: 'GET',
  showLoading: true
})

app.mount('#app')
