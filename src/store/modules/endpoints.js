let urlBase
if (process.env.NODE_ENV === 'development') {
  // development url base
  // urlBase = 'http://localhost:3022/api/v1'
  // urlBase = 'https://branding.dcloud.cisco.com/api/v1'
  urlBase = 'http://branding.dcloud.cisco.com/api/v1'
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
  vertical: urlBase + '/verticals',
  demo: urlBase + '/demo',
  version: urlBase + '/version'
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
