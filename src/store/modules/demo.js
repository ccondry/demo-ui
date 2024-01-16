import {toast} from '../../utils'

const actions = {
  async startRetailJourneyDemo ({getters, dispatch}, body) {
    const response = await dispatch('fetch', {
      message: 'start retail journey demo',
      group: 'demo',
      type: 'retailJourney',
      url: getters.endpoints.retailJourneyDemo,
      options: {
        method: 'POST',
        body
      }
    })
    if (response instanceof Error) {
      // let the normal error display
    } else {
      // success
      toast({
        message: 'The demo is starting - please check your phone for the message.',
        type: 'is-success',
        duration: 6 * 1000,
        queue: false
      })
    }
  },
  async startCollectionsDemo ({getters, dispatch}, body) {
    const response = await dispatch('fetch', {
      message: 'start collections demo',
      group: 'demo',
      type: 'collections',
      url: getters.endpoints.collectionsDemo,
      options: {
        method: 'POST',
        body
      }
    })
    if (response instanceof Error) {
      // let the normal error display
    } else {
      // success
      toast({
        message: 'The demo is starting - please check your phone for the message.',
        type: 'is-success',
        duration: 6 * 1000,
        queue: false
      })
    }
  },
  async startAppointmentDemo ({getters, dispatch}, body) {
    const response = await dispatch('fetch', {
      message: 'start appointment demo',
      group: 'demo',
      type: 'appointment',
      url: getters.endpoints.appointmentDemo,
      options: {
        method: 'POST',
        body
      }
    })
    if (response instanceof Error) {
      // let the normal error display
    } else {
      // success
      toast({
        message: 'The demo is starting - please check your phone for the message.',
        type: 'is-success',
        duration: 6 * 1000,
        queue: false
      })
    }
  },
  async startProductDemo ({getters, dispatch}, body) {
    const response = await dispatch('fetch', {
      message: 'start product demo',
      group: 'demo',
      type: 'product',
      url: getters.endpoints.productDemo,
      options: {
        method: 'POST',
        body
      }
    })
    if (response instanceof Error) {
      // let the normal error display
    } else {
      // success
      toast.({
        message: 'The demo is starting - please check your phone for the message.',
        type: 'is-success',
        duration: 6 * 1000,
        queue: false
      })
    }
  }
}

export default {
  actions
}
