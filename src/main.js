import './assets/main.css'

import { createApp } from 'vue'
import Loading from './components/loading.vue'
import Field from './components/Field.vue'
import Button from './components/Button.vue'
import store from './store'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('Loading', Loading)
app.component('Field', Field)
app.component('Button', Button)

app.use(store)
app.use(router)

app.mount('#app')
