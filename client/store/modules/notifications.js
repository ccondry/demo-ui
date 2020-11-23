import { ToastProgrammatic as Toast } from 'buefy'

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
    Toast.open({
      title: options.title || '',
      message: options.message || '',
      type: options.type || 'info',
      duration: options.duration || 6000
    })
  },
  successNotification ({state}, options) {
    if (typeof options === 'string') {
      return Toast.open({
        title: options,
        message: '',
        type: 'success',
        duration: 2500
      })
    } else {
      return Toast.open({
        title: options.title,
        message: options.message,
        type: 'success',
        duration: options.duration || 2500
      })
    }
  },
  errorNotification ({state}, options) {
    if (typeof options === 'string') {
      return Toast.open({
        title: options,
        message: '',
        type: 'danger',
        duration: 8000
      })
    } else if (typeof options.error === 'object') {
      // exception
      Toast.open({
        title: options.title,
        message: getErrorMessage(options.error),
        type: 'danger',
        duration: options.duration || 8000
      })
    } else {
      // config
      Toast.open({
        title: options.title,
        message: options.message,
        type: 'danger',
        duration: options.duration || 8000
      })
    }
  },
  infoNotification ({state}, options) {
    Toast.open({
      title: options.title,
      message: options.message,
      type: 'info',
      duration: options.duration || 6000
    })
  },
  warningNotification ({state}, options) {
    Toast.open({
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
