import './assets/main.css'
// material design icons
import '@mdi/font/css/materialdesignicons.css'
// toast notifications
import 'vue3-toastify/dist/index.css';
// modal style
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import Vue3Toasity from 'vue3-toastify'
import { createVfm } from 'vue-final-modal'

import Loading from './components/loading.vue'
import Field from './components/Field.vue'
import Button from './components/Button.vue'
import Message from './components/Message.vue'
import Icon from './components/Icon.vue'
import Input from './components/Input.vue'
import Select from './components/Select.vue'
import store from './store'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('Loading', Loading)
app.component('Field', Field)
app.component('Button', Button)
app.component('Icon', Icon)
app.component('Input', Input)
app.component('Select', Select)
app.component('Message', Message)

app.use(store)
app.use(router)
app.use(Vue3Toasity, {autoClose: 8000})
const vfm = createVfm()
app.use(vfm)

app.mount('#app')
