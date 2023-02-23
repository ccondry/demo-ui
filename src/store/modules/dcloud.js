import * as types from '../mutation-types'
import {addUrlQueryParams} from '../../utils'

const state = {
  // list of demo verticals
  verticals: [],
  sessionConfig: {},
  demoBaseConfig: {},
  sessionInfo: {}
}

const mutations = {
  [types.SET_VERTICAL] (state, data) {
    const index = state.verticals.findIndex(v => v.id === data.id)
    if (index >= 0) {
      // replace
      state.verticals.splice(index, 1, data)
    } else {
      // insert
      state.verticals.push(data)
    }
  },
  [types.SET_VERTICALS] (state, data) {
    state.verticals = data
  },
  [types.SET_DEMO_CONFIG] (state, data) {
    state.sessionConfig = data
  },
  [types.SET_DEMO_BASE_CONFIG] (state, data) {
    state.demoBaseConfig = data
  },
  [types.SET_SESSION_INFO] (state, data) {
    state.sessionInfo = data
  }
}

const getters = {
  // datacenter: state => state.datacenter,
  // sessionId: state => state.sessionId,
  // which vertical the demo website is set to
  verticals: state => state.verticals,
  // the customer-side demo website link
  brandDemoLink (state, getters) {
    try {
      return addUrlQueryParams('https://mm-brand.cxdemo.net', {
        session: getters.sessionId,
        datacenter: getters.datacenter
      })
    } catch (e) {
      return null
    }
  },
  sessionConfig: state => state.sessionConfig,
  demoBaseConfig: state => state.demoBaseConfig,
  sessionInfo: state => state.sessionInfo,
  demoPlatform: (state, getters) => getters.sessionConfig.demo,
  demoVersion: (state, getters) => getters.sessionConfig.version,
  multichannelOptions (state, getters) {
    try {
      return getters.demoBaseConfig.multichannel
    } catch (e) {
      return []
    }
  },
  hasMultichannel (state, getters) {
    try {
      return getters.multichannelOptions.length > 0
    } catch (e) {
      return false
    }
  }
}

const actions = {
  getVertical ({dispatch, getters}, id) {
    return dispatch('fetch', {
      group: 'vertical',
      type: id,
      url: getters.endpoints.vertical + '/' + id,
      mutation: types.SET_VERTICAL,
      message: 'get vertical ' + id
    })
  },
  listVerticals ({dispatch, getters}, owner) {
    return dispatch('fetch', {
      group: 'vertical',
      type: 'list',
      url: getters.endpoints.vertical,
      options: {
        query: {
          owner,
          summary: true
        }
      },
      mutation: types.SET_VERTICALS,
      message: 'get verticals list'
    })
  },
  async loadDemoBaseConfig ({getters, dispatch}) {
    await dispatch('fetch', {
      group: 'demo',
      type: 'baseConfig',
      url: getters.endpoints.demo,
      mutation: types.SET_DEMO_BASE_CONFIG,
      message: 'load demo base configuration'
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
  async loadSessionConfig ({getters, dispatch}) {
    await dispatch('fetch', {
      group: 'session',
      type: 'config',
      url: getters.endpoints.configure,
      mutation: types.SET_DEMO_CONFIG,
      message: 'load demo session configuration'
    })
    // make sure selected vertical is loaded
    try {
      const currentVertical = getters.sessionConfig.configuration.vertical
      if (!currentVertical) {
        return
      }
      const verticalLoaded = getters.verticals.find(v => v.id === currentVertical)
      if (verticalLoaded) {
        return
      }
      dispatch('getVertical', currentVertical)
    } catch (e) {
      // continue
    }
  },
  async saveDemoConfig ({getters, dispatch}, body) {
    await dispatch('fetch', {
      group: 'session',
      type: 'config',
      url: getters.endpoints.configure,
      options: {
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${getters.jwt}`
        }
      },
      message: 'Save demo session configuration',
      showNotification: true
    })
    dispatch('loadSessionConfig')
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
