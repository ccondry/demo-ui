<template>
  <b-loading :is-full-page="false" :active="isActive" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Loading',

  props: {
    group: {
      type: String,
      default () {
        return ''
      }
    },
    type: {
      type: String,
      default () {
        return ''
      }
    },
    active: {
      type: Array,
      default () {
        return []
      }
    }
  },

  computed: {
    ...mapGetters([
      'loading',
      'working'
    ]),
    isActive () {
      if (this.group.length && this.type.length) {
        return this.loading[this.group][this.type]
      }

      for (const a of this.active) {
        const parts = a.split('.')
        if (parts.length !== 3) {
          continue
        }
        if (parts[0] === 'loading' && this.loading[parts[1]][parts[2]]) {
          return true
        }
        if (parts[0] === 'working' && this.working[parts[1]][parts[2]]) {
          return true
        }
      }
      return false
    }
  }
}
</script>
