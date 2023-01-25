import * as types from '../mutation-types'
import Vue from 'vue'

const state = {
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
  }
}

const getters = {
  working: state => state.working,
}

const mutations = {
  [types.SET_WORKING] (state, data) {
    // if state container for this group is not existing, create it
    if (!state.working[data.group]) {
      Vue.set(state.working, data.group, {})
    }

    // if state container for this type is not existing, create it
    if (!state.working[data.group][data.type]) {
      Vue.set(state.working[data.group], data.type, data.value)
    } else {
      state.working[data.group][data.type] = data.value
    }
  }
}

const actions = {
  setWorking ({commit}, {group, type, value = true}) {
    commit(types.SET_WORKING, {group, type, value})
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
