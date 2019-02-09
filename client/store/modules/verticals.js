import * as types from '../mutation-types'
import {Toast} from 'buefy'

const state = {
  verticals: [],
  demoConfig: {},
  sessionInfo: {}
}

const getters = {
  verticals: state => state.verticals,
  demoConfig: state => state.demoConfig,
  sessionInfo: state => state.sessionInfo
}

const mutations = {
  [types.SET_VERTICALS] (state, data) {
    state.verticals = data
  },
  [types.SET_DEMO_CONFIG] (state, data) {
    state.demoConfig = data
  },
  [types.SET_SESSION_INFO] (state, data) {
    state.sessionInfo = data
  }
}

const actions = {
  async loadVerticals ({getters, commit, dispatch}, showNotification = true) {
    dispatch('setLoading', {group: 'app', type: 'verticals', value: true})
    try {
      await dispatch('loadToState', {
        name: 'verticals',
        endpoint: getters.endpoints.verticals,
        mutation: types.SET_VERTICALS,
        showNotification
      })
    } catch (e) {
      console.error('error loading verticals', e)
      // notify user
      Toast.open({
        duration: 5000,
        message: `load verticals failed`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setLoading', {group: 'app', type: 'verticals', value: false})
    }
  },
  async loadSessionInfo ({getters, commit, dispatch}, showNotification = true) {
    dispatch('setLoading', {group: 'session', type: 'info', value: true})
    try {
      await dispatch('loadToState', {
        name: 'load demo session info',
        endpoint: getters.endpoints.session,
        mutation: types.SET_SESSION_INFO,
        showNotification
      })
    } catch (e) {
      console.log('error loading demo session info', e)
      Toast.open({
        duration: 5000,
        message: `load demo session info failed`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setLoading', {group: 'session', type: 'info', value: false})
    }
  },
  async loadDemoConfig ({getters, commit, dispatch}, showNotification = true) {
    dispatch('setLoading', {group: 'session', type: 'config', value: true})
    try {
      await dispatch('loadToState', {
        name: 'load demo session configuration',
        endpoint: getters.endpoints.configure,
        mutation: types.SET_DEMO_CONFIG,
        showNotification
      })
    } catch (e) {
      console.log('error loading demo session configuration', e)
      dispatch('errorNotification', {title: 'Failed to load demo session configuration', error: e})
      Toast.open({
        duration: 5000,
        message: `load demo session configuration failed`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setLoading', {group: 'session', type: 'config', value: false})
    }
  },
  async saveDemoConfig ({getters, commit, dispatch}, {data, showNotification = true}) {
    dispatch('setWorking', {group: 'session', type: 'config', value: true})
    try {
      await dispatch('postData', {
        name: 'save demo session configuration',
        endpoint: getters.endpoints.configure,
        data,
        showNotification
      })
    } catch (e) {
      console.log('error saving demo session config', e)
      // dispatch('errorNotification', {title: 'Failed to save demo session configuration', error: e})
      Toast.open({
        duration: 5000,
        message: `save demo session configuration failed`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setWorking', {group: 'session', type: 'config', value: false})
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
