import * as types from '../mutation-types'
import {ToastProgrammatic as Toast} from 'buefy'
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
  },
  async getAuthApiVersion ({commit, dispatch, getters}) {
    // get REST API version
    dispatch('fetch', {
      group: 'app',
      type: 'version',
      url: getters.endpoints.authVersion,
      mutation: types.SET_AUTH_API_VERSION
    })
  },
  copyToClipboard (asdf, {string, type = 'Text'}) {
    // copy text to clipboard
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.value = string
    input.select()
    const result = document.execCommand('copy')
    if (result === 'unsuccessful') {
      // failed
      console.error('Failed to copy text.')
    } else {
      // success
      Toast.open({
        message: type + ' Copied to Your Clipboard',
        queue: false
      })
    }

    // Remove the selections - NOTE: Should use
    // removeRange(range) when it is supported
    window.getSelection().removeAllRanges()
    // remove the input field
    input.remove()
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
