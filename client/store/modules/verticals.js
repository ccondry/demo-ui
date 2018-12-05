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
  async uploadImage ({dispatch, commit, getters}, {data, showNotification = true}) {
    // dispatch('setWorking', {group: 'images', type: data.node, value: true})
    // console.log(`uploading file`, data)
    // try {
    //   const response = await dispatch('postData', {
    //     endpoint: getters.endpoints.images,
    //     // query: {vertical: data.vertical},
    //     data
    //   })
    //   console.log('upload file successful. path = ', response.data)
    //   // commit(types.SET_IMAGE, {url: response.data, node: data.node, vertical: data.vertical})
    //   // callback to the emitter
    //   data.callback(response.data)
    //   // return response.data
    //   // if (showNotification) {
    //   //   dispatch('successNotification', 'Successfully uploaded file')
    //   // }
    // } catch (e) {
    //   console.error('error uploading file', e)
    //   dispatch('errorNotification', {title: 'Failed to upload file', error: e})
    // } finally {
    //   dispatch('setWorking', {group: 'images', type: data.node, value: false})
    // }
  },
  async saveVertical ({getters, commit, dispatch}, {id, data, showNotification}) {
    // console.log('saving vertical (not implemented) - params:', {id, data})
    // delete data._id
    // try {
    //   const response = await dispatch('putData', {
    //     name: 'vertical',
    //     endpoint: getters.endpoints.verticals + '/' + id,
    //     data,
    //     showNotification
    //   })
    //
    //   console.log('saved vertical. response:', response)
    //   dispatch('successNotification', 'Successfully saved vertical')
    // } catch (e) {
    //   console.log('error saving vertical', e)
    //   dispatch('notification', {
    //     title: 'Failed to save vertical',
    //     message: e.response.data.message,
    //     type: 'danger'
    //   })
    // }
  },
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
