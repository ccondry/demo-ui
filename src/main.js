import Vue from 'vue'
import App from './index.vue'
import store from './store'
import router from './router'
import VueRouter from 'vue-router'
import Loading from 'src/components/loading.vue'
import './style.scss'
// import 'buefy/dist/buefy.css'

import Buefy from 'buefy'

// add Buefy to Vue
Vue.use(Buefy)

Vue.use(VueRouter)
// load these components globally
Vue.component('loading', Loading)
// load clipboard copy button component globally
// Vue.component('copy', Copy)

const app = new Vue({
  // el: '#app',
  render: h => h(App),
  router,
  store
}).$mount('#app')

export default app