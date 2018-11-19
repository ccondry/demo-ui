import axios from 'axios'

export const load = async function (jwt, endpoint, query) {
  try {
    console.log('GET', endpoint)
    const options = {
      params: query
    }
    options.headers = {
      Authorization: 'Bearer ' + jwt
    }
    return await axios.get(endpoint, options)
  } catch (e) {
    throw e
  }
}

export const put = async function (jwt, endpoint, query, data) {
  try {
    const options = {
      params: query
    }
    options.headers = {
      Authorization: 'Bearer ' + jwt
    }
    return await axios.put(endpoint, data, options)
  } catch (e) {
    throw e
  }
}

export const post = async function (jwt, endpoint, query, data) {
  try {
    const options = {
      params: query
    }
    options.headers = {
      Authorization: 'Bearer ' + jwt
    }
    return await axios.post(endpoint, data, options)
  } catch (e) {
    throw e
  }
}

export const httpDelete = async function (jwt, endpoint, query) {
  try {
    const options = {
      params: query
    }
    options.headers = {
      Authorization: 'Bearer ' + jwt
    }
    return await axios.delete(endpoint, options)
  } catch (e) {
    throw e
  }
}
