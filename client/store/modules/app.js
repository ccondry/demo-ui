import * as types from '../mutation-types'
import {load} from '../../utils'
const getters = {
}

const state = {
  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: false,
    hidden: false
  },
  effect: {
    translate3d: true
  }
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile'
    state.device.isTablet = device === 'tablet'
  },

  [types.TOGGLE_SIDEBAR] (state, config) {
    if (state.device.isMobile && config.hasOwnProperty('opened')) {
      state.sidebar.opened = config.opened
    } else {
      state.sidebar.opened = true
    }

    if (config.hasOwnProperty('hidden')) {
      state.sidebar.hidden = config.hidden
    }
  },

  [types.SWITCH_EFFECT] (state, effectItem) {
    for (let name in effectItem) {
      state.effect[name] = effectItem[name]
    }
  },

  [types.SET_SESSION] (state, data) {
    state.sessionId = data.sessionId
    state.datacenter = data.datacenter
  }
}

const endpoint = process.env.NODE_ENV === 'production' ? '/api/v1/verticals/endpoints' : 'http://localhost:3033/api/v1/verticals/endpoints'

const actions = {
  async getEndpoints ({getters, commit, dispatch}, showNotification = true) {
    dispatch('setLoading', {group: 'app', type: 'endpoints', value: true})
    try {
      const response = await load(getters.jwt, endpoint)
      commit(types.SET_ENDPOINTS, response.data)
      // dispatch('successNotification', `Successfully loaded endpoints`)
    } catch (e) {
      console.error(`error during GET endpoints`, e)
      dispatch('errorNotification', {title: `Failed to GET endpoints`, error: e})
    } finally {
      dispatch('setLoading', {group: 'app', type: 'endpoints', value: false})
    }
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
