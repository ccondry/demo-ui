<template>
  <div v-if="model">
    <!-- Demo Configuration -->
    <div v-if="!model">
      <b-button
      type="is-primary"
      rounded
      @click="clickConfigure"
      >
        Configure
      </b-button>
    </div>
    <div v-else>
      <div v-if="!model.vertical">
        <b-button
        type="is-primary"
        rounded
        @click="$set(model, 'vertical', 'travel')"
        >
          Configure
        </b-button>
      </div>

      <div v-else>
        <select-vertical
        v-model="model.vertical"
        :verticals="verticals"
        @load="clickLoadVerticals"
        @input="updateParent"
        />

        <select-multichannel
        v-if="hasMultichannel"
        v-model="model.multichannel"
        :options="multichannelOptions"
        @input="updateParent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectVertical from './select-vertical.vue'
import SelectMultichannel from './select-multichannel.vue'

export default {
  name: 'SessionConfig',

  components: {
    SelectMultichannel,
    SelectVertical,
  },

  props: {
    demo: {
      type: String,
      default () { return '' }
    },
    value: {
      type: Object,
      default () { return null }
    },
    verticals: {
      type: Array,
      default () { return [] }
    },
    hasMultichannel: {
      type: Boolean,
      default: false
    },
    multichannelOptions: {
      type: Array,
      default () { return [] }
    }
  },

  data () {
    return {
      model: null
    }
  },

  watch: {
    value () {
      this.updateCache()
    }
  },

  mounted () {
    console.log('mounted session-config', this.value)
    this.updateCache()
  },

  methods: {
    clickConfigure () {
      this.model = {vertical: 'travel'}
      this.updateParent()
    },
    clickLoadVerticals (owner) {
      this.$emit('load', owner)
    },
    updateCache () {
      this.model = JSON.parse(JSON.stringify(this.value))
      if (this.demo === 'pcce' && !this.model.multichannel) {
        // set a default multichannel option so the user doesn't have to click 'Configure' button
        this.$set(this.model, 'multichannel', 'ece')
      }
    },
    updateParent () {
      this.$emit('input', this.model)
    }
  }
}
</script>

<style>
.content .card-header .card-header-title {
  margin-bottom: 0;
}
.card-header-title, .card-header-icon {
  background-color: #f3f3f3;
}
</style>
