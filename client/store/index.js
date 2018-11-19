import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import modules from './modules'
import config from '../config'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules,
  state: {
    endpoints: config.app.endpoints,
    pkg,
    working: {
      app: {},
      images: {},
      cvp: {},
      admin: {},
      facebook: {},
      finesse: {},
      templates: {}
    },
    loading: {
      app: {},
      images: {},
      cvp: {},
      admin: {},
      facebook: {},
      finesse: {},
      templates: {}
    },
    defaultChatEntryPointId: config.ece.defaultChatEntryPointId
  },
  mutations
})

export default store
