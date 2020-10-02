import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import modules from './modules'
import endpoints from './endpoints'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules,
  state: {
    endpoints,
    pkg,
    working: {
      app: {},
      images: {},
      cvp: {},
      admin: {},
      facebook: {},
      finesse: {},
      templates: {},
      session: {},
      upstream: {}
    },
    loading: {
      app: {},
      images: {},
      cvp: {},
      admin: {},
      facebook: {},
      finesse: {},
      templates: {},
      session: {},
      upstream: {}
    }
  },
  mutations
})

export default store
