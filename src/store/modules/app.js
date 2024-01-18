import * as types from '../mutation-types'
import {version} from '../../../package.json'

const state = {
  isProduction: process.env.NODE_ENV === 'production',
  uiVersion: version,
  apiVersion: 'Loading...',
  authApiVersion: 'Loading...'
}

const getters = {
  isProduction: state => state.isProduction,
  uiVersion: state => state.uiVersion,
  apiVersion: state => state.apiVersion,
  authApiVersion: state => state.authApiVersion,
  isLocked: state => false
}

const mutations = {
  [types.SET_API_VERSION] (state, data) {
    state.apiVersion = data.version
  },
  [types.SET_AUTH_API_VERSION] (state, data) {
    state.authApiVersion = data.version
  }
}

const actions = {
  async getApiVersion ({commit, dispatch, getters}) {
    // get REST API version
    dispatch('fetch', {
      group: 'app',
      type: 'version',
      url: getters.endpoints.version,
      mutation: types.SET_API_VERSION
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
