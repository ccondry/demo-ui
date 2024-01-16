import './assets/main.css'

import { createApp } from 'vue'
import Loading from './components/loading.vue'
import store from './store'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('Loading', Loading)

app.use(store)
app.use(router)

app.mount('#app')
