import Vue from 'vue'
import Notification from 'vue-bulma-notification'
const NotificationComponent = Vue.extend(Notification)

const openNotification = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 4500,
  container: '.notifications'
}) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
}

function getErrorMessage (error) {
  // console.log('raw error keys:', Object.keys(error))
  // console.log('error response:', error.response)

  if (error.response) {
    if (error.response.data && error.response.data.body) {
      return error.response.body
    } else {
      return error.response.data
    }
  } else {
    return ''
  }
}

const actions = {
  notification ({state}, options) {
    openNotification({
      title: options.title || '',
      message: options.message || '',
      type: options.type || 'info',
      duration: options.duration || 6000
    })
  },
  successNotification ({state}, options) {
    if (typeof options === 'string') {
      return openNotification({
        title: options,
        message: '',
        type: 'success',
        duration: 2500
      })
    } else {
      return openNotification({
        title: options.title,
        message: options.message,
        type: 'success',
        duration: options.duration || 2500
      })
    }
  },
  errorNotification ({state}, options) {
    if (typeof options === 'string') {
      return openNotification({
        title: options,
        message: '',
        type: 'danger',
        duration: 8000
      })
    } else if (typeof options.error === 'object') {
      // exception
      openNotification({
        title: options.title,
        message: getErrorMessage(options.error),
        type: 'danger',
        duration: options.duration || 8000
      })
    } else {
      // config
      openNotification({
        title: options.title,
        message: options.message,
        type: 'danger',
        duration: options.duration || 8000
      })
    }
  },
  infoNotification ({state}, options) {
    openNotification({
      title: options.title,
      message: options.message,
      type: 'info',
      duration: options.duration || 6000
    })
  },
  warningNotification ({state}, options) {
    openNotification({
      title: options.title,
      message: options.message,
      type: 'warning',
      duration: options.duration || 6000
    })
  }
}

export default {
  actions
}
