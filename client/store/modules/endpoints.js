let urlBase
if (process.env.NODE_ENV === 'development') {
  // development url base
  urlBase = 'http://localhost:3022/api/v1'
  // urlBase = 'https://branding.dcloud.cisco.com/api/v1'
} else {
  // production url base
  urlBase = '/api/v1'
}

const endpoints = {
  configure: urlBase + '/configure',
  session: urlBase + '/session',
  upstream: {
    customer: urlBase + '/upstream/customer'
  },
  verticals: urlBase + '/verticals',
  demo: urlBase + '/demo',
  ciscoSso: 'https://cloudsso.cisco.com/as/authorization.oauth2',
  ciscoOauth2: 'https://dcloud-collab-toolbox-rtp.cxdemo.net/api/v1/auth/login/oauth2/cisco',
  login: 'https://dcloud-collab-toolbox-rtp.cxdemo.net/api/v1/auth/login',
  version: urlBase + '/version',
  authApiVersion: 'https://dcloud-collab-toolbox-rtp.cxdemo.net/api/v1/auth/version'
}

const state = {
  endpoints
}

const getters = {
  endpoints: state => state.endpoints
}

module.exports = {
  state,
  getters
}
