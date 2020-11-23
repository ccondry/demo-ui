import * as types from '../mutation-types'
import {addUrlQueryParams} from '../../utils'

const state = {
  oauthError: null
}

const getters = {
  oauthError: state => state.oauthError,
  ciscoRedirectUri: () => {
    // the URL to come back to after SSO
    return `${window.location.protocol}//${window.location.host}/ciscosso/`
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
      redirect_uri: this.ciscoRedirectUri,
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
    try {
      const response = await dispatch('fetch', {
        group: 'user',
        type: 'login',
        url: getters.endpoints.ciscoOauth2,
        method: 'POST',
        body: {code},
        message: 'SSO login'
      })
      dispatch('setJwt', response.jwt)
      dispatch('successNotification', {
        title: `Logged in Successfully`,
        message: ''
      })
    } catch (e) {
      commit(types.SET_OAUTH_ERROR, e.message)
    }
  }
}

export default {
  getters,
  actions,
  state,
  mutations
}
