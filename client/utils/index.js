import axios from 'axios'

export const load = async function (endpoint, query) {
  try {
    console.log('GET', endpoint)
    const options = {
      params: query
    }
    return await axios.get(endpoint, options)
  } catch (e) {
    throw e
  }
}

export const put = async function (endpoint, query, data) {
  try {
    const options = {
      params: query
    }
    return await axios.put(endpoint, data, options)
  } catch (e) {
    throw e
  }
}

export const post = async function (endpoint, query, data) {
  try {
    const options = {
      params: query
    }
    return await axios.post(endpoint, data, options)
  } catch (e) {
    throw e
  }
}

export const httpDelete = async function (endpoint, query) {
  try {
    const options = {
      params: query
    }
    return await axios.delete(endpoint, options)
  } catch (e) {
    throw e
  }
}
