import * as types from '../mutation-types'
import Vue from 'vue'
import defaultVertical from './default-vertical.json'

const state = {
  defaults: {
    verticals: defaultVertical
  }
}

const getters = {
  defaults: state => state.defaults
}

const mutations = {
  [types.SET_DEFAULTS] (state, data) {
    Vue.set(state.defaults, data.type, data.defaults)
  }
}

const actions = {
  async loadDefaults ({getters, commit, dispatch}, {type, showNotification = true}) {
    dispatch('setLoading', {group: 'app', type: 'defaults', value: true})
    // await dispatch('loadToState', {
    //   path: 'defaults',
    //   query: {type},
    //   mutation: types.SET_DEFAULTS,
    //   name: 'defaults',
    //   transform (response) {
    //     return {
    //       type,
    //       defaults: response.data.demos || {}
    //     }
    //   },
    //   showNotification
    // })
    dispatch('setLoading', {group: 'app', type: 'defaults', value: false})
  },
  async putDefaults ({commit, getters, dispatch}, data) {
    dispatch('setWorking', {group: 'app', type: 'defaults', value: true})
    // await dispatch('putData', {
    //   path: 'defaults',
    //   query: {type: data.type},
    //   name: 'defaults',
    //   data: data.data,
    //   showNotification: true
    // })
    dispatch('setWorking', {group: 'app', type: 'defaults', value: false})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
