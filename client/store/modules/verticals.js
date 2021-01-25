import * as types from '../mutation-types'

const state = {
  verticals: [],
  demoConfig: {},
  demoBaseConfig: {},
  sessionInfo: {}
}

const getters = {
  verticals: state => state.verticals,
  demoConfig: state => state.demoConfig,
  demoBaseConfig: state => state.demoBaseConfig,
  sessionInfo: state => state.sessionInfo
}

const mutations = {
  [types.SET_VERTICALS] (state, data) {
    state.verticals = data
  },
  [types.SET_DEMO_CONFIG] (state, data) {
    state.demoConfig = data
  },
  [types.SET_DEMO_BASE_CONFIG] (state, data) {
    state.demoBaseConfig = data
  },
  [types.SET_SESSION_INFO] (state, data) {
    state.sessionInfo = data
  }
}

const actions = {
  async loadDemoBaseConfig ({getters, dispatch}) {
    await dispatch('fetch', {
      group: 'demo',
      type: 'baseConfig',
      url: getters.endpoints.demo,
      mutation: types.SET_DEMO_BASE_CONFIG,
      message: 'load demo base configuration'
    })
  },
  async loadVerticals ({getters, dispatch}) {
    await dispatch('fetch', {
      group: 'vertical',
      type: 'list',
      url: getters.endpoints.verticals,
      mutation: types.SET_VERTICALS,
      message: 'load verticals'
    })
  },
  async loadSessionInfo ({getters, dispatch}) {
    await dispatch('fetch', {
      group: 'session',
      type: 'info',
      url: getters.endpoints.session,
      mutation: types.SET_SESSION_INFO,
      message: 'load demo session information'
    })
  },
  async loadDemoConfig ({getters, dispatch}) {
    await dispatch('fetch', {
      group: 'session',
      type: 'config',
      url: getters.endpoints.configure,
      mutation: types.SET_DEMO_CONFIG,
      message: 'load demo session configuration'
    })
  },
  async saveDemoConfig ({getters, dispatch}, {data}) {
    await dispatch('fetch', {
      group: 'session',
      type: 'config',
      url: getters.endpoints.configure,
      options: {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${getters.jwt}`
        }
      },
      message: 'save demo session configuration'
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
