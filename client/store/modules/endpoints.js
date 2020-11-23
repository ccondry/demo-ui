let urlBase
if (process.env.NODE_ENV === 'development') {
  // development url base
  urlBase = 'http://localhost:3022/api/v1'
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
  ciscoOauth2: urlBase + 'https://dcloud-collab-toolbox.cxdemo.net/login/oauth2/cisco'
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
