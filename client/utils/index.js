// helper function to append query parameters to a URL for fetch
export const addUrlQueryParams = function (endpoint, params) {
  let url = endpoint
  if (typeof params === 'object') {
    // append URL query paramenters
    const keys = Object.keys(params)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = params[key]
      if (i === 0) {
        url += '?'
      } else {
        url += '&'
      }
      url += encodeURIComponent(key) + '=' + encodeURIComponent(value)
    }
  }
  return url
}
