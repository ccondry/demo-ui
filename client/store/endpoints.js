let urlBase = '/api/v1'
if (process.env.NODE_ENV === 'development') {
  urlBase = 'http://localhost:3022/api/v1'
}

export default {
  configure: urlBase + '/configure',
  session: urlBase + '/session',
  upstream: {
    customer: urlBase + '/upstream/customer'
  },
  verticals: urlBase + '/verticals',
  demo: urlBase + '/demo'
}
