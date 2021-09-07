import * as types from '../mutation-types'
import Vue from 'vue'
import {ToastProgrammatic as Toast} from 'buefy'
import {addUrlQueryParams} from '../../utils'
import pkg from '../../../package.json'

const state = {
  apiVersion: 'Loading...',
  authApiVersion: 'Loading...',
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
  },
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
  },
  loading: {
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
  loading: state => state.loading,
  working: state => state.working,
  sidebar: state => state.sidebar,
  effect: state => state.effect,
  device: state => state.device,
  uiVersion: () => pkg.version,
  apiVersion: state => state.apiVersion,
  authApiVersion: state => state.authApiVersion
}

const mutations = {
  [types.SET_API_VERSION] (state, data) {
    state.apiVersion = data.version
  },

  [types.SET_AUTH_API_VERSION] (state, data) {
    state.authApiVersion = data.version
  },

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
  },

  [types.SET_LOADING] (state, data) {
    // if state container for this group is not existing, create it
    if (!state.loading[data.group]) {
      Vue.set(state.loading, data.group, {})
    }

    // if state container for this type is not existing, create it
    if (!state.loading[data.group][data.type]) {
      Vue.set(state.loading[data.group], data.type, data.value)
    } else {
      state.loading[data.group][data.type] = data.value
    }
  }
}

const actions = {
  async getApiVersion ({getters, dispatch}) {
    return dispatch('fetch', {
      group: 'app',
      type: 'apiVersion',
      url: getters.endpoints.version,
      message: 'get API server version',
      mutation: types.SET_API_VERSION,
      showNotification: false
    })
  },
  async getAuthApiVersion ({getters, dispatch}) {
    return dispatch('fetch', {
      group: 'app',
      type: 'authApiVersion',
      url: getters.endpoints.authApiVersion,
      message: 'get authentication API server version',
      mutation: types.SET_AUTH_API_VERSION,
      showNotification: false
    })
  },
  setWorking ({commit}, {group, type, value = true}) {
    commit(types.SET_WORKING, {group, type, value})
  },

  setLoading ({commit}, {group, type, value = true}) {
    commit(types.SET_LOADING, {group, type, value})
  },

  async fetch ({commit, getters, dispatch}, {
    group,
    type,
    url,
    options = {},
    mutation,
    message,
    showNotification = true,
    onError,
    transform
  }) {
    message = message || `${options.method === 'POST' ? 'save' : 'get'} ${group} ${type}`
    if (!url) {
      throw Error('url is a required parameter for fetch ' + message)
    }
    console.log(`${message}...`)
    const loadingOrWorking = !options.method || options.method === 'GET' ? 'setLoading' : 'setWorking'
    dispatch(loadingOrWorking, {group, type, value: true})
    try {
      // const data = await dispatch('fetch', {url, options})
      // set default headers
      options.headers = options.headers || {}
      // set content type to JSON by default
      options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json'
      // set accept to JSON by default
      options.headers['Accept'] = options.headers['Accept'] || 'application/json'
      // set JWT auth header by default
      options.headers['Authorization'] = options.headers['Authorization'] || 'Bearer ' + getters.jwt
      // set instant demo instance name
      // options.headers['Instance'] = getters.instanceName
      // stringify body if it is an object
      if (typeof options.body === 'object') {
        options.body = JSON.stringify(options.body)
      }
      // add query parameters to URL
      const endpoint = addUrlQueryParams(url, options.query)
      // console.log('endpoint', endpoint)
      const response = await window.fetch(endpoint, options)
      // get the response body as text
      const text = await response.text()
      // response code 200 - 299?
      if (response.ok) {
        try {
          // parse response text into JSON
          const json = JSON.parse(text)
          console.log(`${message} success:`, json)
          if (typeof mutation === 'string') {
            if (typeof transform === 'function') {
              // put transformed JSON data into state
              commit(mutation, transform(json))
            } else {
              // put JSON data into state
              commit(mutation, json)
            }
          }
          return json
        } catch (e) {
          // body is not json data. return the raw text, and don't attempt
          // to put it into state
          console.log(`${message} success:`, text)
          return text
        }
      } else if (response.status === 401) {
        // expired JWT. forget jwt and forward to SSO login
        window.localStorage.removeItem('jwt')
        return dispatch('login')
      } else {
        // not OK and not 401
        let m = text
        try {
          const json = JSON.parse(text)
          m = json.message || json.apiError || json.error_description || json[Object.keys(json)[0]]
        } catch (e) {
          // use empty string instead of text/html content
          const regex = /text\/html/i
          if (response.headers.get('content-type').match(regex)) {
            console.log('removing html response from message')
            m = ''
          }
        }
        // console.log('bad response', m)
        let message = `${response.status} ${response.statusText}`
        if (m.length) {
          message += ` - ${m}`
        }
        const error = Error(message)
        error.status = response.status
        error.statusText = response.statusText
        error.text = m
        // throw error
        if (typeof onError === 'function') {
          onError(error)
        }
      }
    } catch (e) {
      console.error(`${message} failed: ${e.message}`)
      if (showNotification) {
        Toast.open({
          message: `Failed to ${message}: ${e.message}`,
          type: 'is-danger',
          duration: 6 * 1000,
          queue: false
        })
      }
    } finally {
      dispatch(loadingOrWorking, {group, type, value: false})
    }
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
