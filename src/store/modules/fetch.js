import {ToastProgrammatic as Toast} from 'buefy'
import {addUrlQueryParams} from '../../utils'

const actions = {
  async fetch ({commit, getters, dispatch}, {
    group,
    type,
    url,
    options = {},
    mutation,
    message,
    userMessage,
    showNotification = false,
    showErrorNotification = true,
    onError,
    transform,
    // whether to log to console. false will log to console.
    silent = false
  }) {
    const map = {
      'GET': 'get',
      'POST': 'save',
      'PATCH': 'save',
      'DELETE': 'delete'
    }
    message = message || `${map[options.method] || 'request'} ${group} ${type}`
    if (!url) {
      throw Error('url is a required parameter for fetch ' + message)
    }
    if (!silent) {
      console.log(`${message}...`)
    }
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
        let ret
        try {
          // parse response text into JSON
          let json
          if (text.length === 0) {
            json = null
          } else {
            json = JSON.parse(text)
          }
          if (!silent) {
            console.log(`${message} success:`, json)
          }
          if (typeof mutation === 'string') {
            if (typeof transform === 'function') {
              // put transformed JSON data into state
              commit(mutation, transform(json))
            } else {
              // put JSON data into state
              commit(mutation, json)
            }
          }
          ret = json
        } catch (e) {
          if (!silent) {
            console.log('fetch caught exception:', e.message)
          }
          // body is not json data. return the raw text, and don't attempt
          // to put it into state
          if (!silent) {
            console.log(`${message} success:`, text)
          }
          ret = text
        }
        if (showNotification && !silent) {
          Toast.open({
            message: userMessage || `${message} succeeded.`,
            type: 'is-success',
            duration: 4 * 1000,
            queue: false
          })
        }
        return ret
      } else if (response.status === 401) {
        // check if our JWT expired
        dispatch('checkJwt')
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
        throw error
      }
    } catch (error) {
      if (!silent) {
        console.error(`${message} failed: ${error.message}`)
      }
      if (showNotification || showErrorNotification && !silent) {
        Toast.open({
          message: `${message} failed: ${error.message}`,
          type: 'is-danger',
          duration: 8 * 1000,
          queue: false
        })
      }
      // run error callback, if defined
      if (typeof onError === 'function') {
        onError(error)
      }
      // return the error
      return error
    } finally {
      dispatch(loadingOrWorking, {group, type, value: false})
    }
  }
}

export default {
  actions
}
