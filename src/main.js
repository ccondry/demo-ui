import './assets/main.css'

import { createApp } from 'vue'
import Loading from './components/loading.vue'
import Field from './components/Field.vue'
import Button from './components/Button.vue'
import Message from './components/Message.vue'
import Input from './components/Input.vue'
import Select from './components/Select.vue'
import store from './store'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('Loading', Loading)
app.component('Field', Field)
app.component('Button', Button)
app.component('Input', Input)
app.component('Select', Select)
app.component('Message', Message)

app.use(store)
app.use(router)

app.mount('#app')
