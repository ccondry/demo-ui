// helper function to append query parameters to a URL for fetch
export const addUrlQueryParams = function (endpoint, params) {
  let url = endpoint
  if (typeof params === 'object') {
    // append URL query paramenters
    // and filter keys with undefined values
    const keys = Object.keys(params).filter(k => typeof params[k] !== 'undefined')
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      let value = params[key]
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

export const fetch = async function (url, options = {}) {
  if (!url) {
    throw Error('url is a required parameter for fetch')
  }
  // set content type to JSON by default
  options.headers = options.headers || {}
  options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json'

  // stringify body if object
  if (typeof options.body === 'object') {
    options.body = JSON.stringify(options.body)
  }
  // console.log('fetch', url, options)
  // add query parameters to URL
  try {
    // console.log('url', url)
    const endpoint = addUrlQueryParams(url, options.query)
    // console.log('endpoint', endpoint)
    const response = await window.fetch(endpoint, options)
    const text = await response.text()
    if (response.ok) {
      try {
        return JSON.parse(text)
      } catch (e) {
        return text
      }
    } else {
      let m = text
      try {
        const json = JSON.parse(text)
        m = json.message || json.apiError || json[Object.keys(json)[0]]
      } catch (e) {
        const regex = /text\/html/i
        if (response.headers.get('content-type').match(regex)) {
          // text/html - don't return that whole thing
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
      throw error
    }
  } catch (e) {
    // just rethrow any other errors, like connection timeouts
    throw e
  }
}
