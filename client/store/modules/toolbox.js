import * as types from '../mutation-types'
import {addUrlQueryParams} from '../../utils'
import {ToastProgrammatic as Toast} from 'buefy'

const state = {
  oauthError: null
}

const getters = {
  oauthError: state => state.oauthError,
  ciscoRedirectUri () {
    // the URL to return to after completing SSO login
    return `${window.location.protocol}//${window.location.host}/`
  },
  ciscoSsoUrl: (state, getters) => {
    // URL to forward user to when requesting SSO login
    const scopes = [
      'profile',
      'email',
      'openid'
    ]
    const params = {
      client_id: 'dcloud-collab-toolbox',
      response_type: 'code',
      redirect_uri: getters.ciscoRedirectUri,
      scope: scopes.join(' '),
      state: 'demo-ui-login'
    }
    return addUrlQueryParams(getters.endpoints.ciscoSso, params)
  }
}

const mutations = {
  [types.SET_OAUTH_ERROR] (state, data) {
    state.oauthError = data
  }
}

const actions = {
  async ciscoOauth2Login ({commit, dispatch, getters}, code) {
    const response = await dispatch('fetch', {
      group: 'user',
      type: 'login',
      url: getters.endpoints.ciscoOauth2,
      options: {
        method: 'POST',
        body: {code}
      },
      message: 'SSO login',
      onError (e) {
        commit(types.SET_OAUTH_ERROR, e.message)
      },
      showNotification: true
    })
    if (response) {
      console.log('ciscoOauth2Login', response)
      dispatch('setJwt', response.jwt)
      Toast.open({
        message: 'Logged in Successfully',
        type: 'is-success'
      })
    }
  }
}

export default {
  getters,
  actions,
  state,
  mutations
}
