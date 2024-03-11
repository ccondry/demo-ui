<!-- Demo Configuration -->
<template>
  <div>
    <!-- demo brand/vertical selection -->
    <select-vertical
    v-model="vertical"
    :verticals="verticals"
    @load="clickLoadVerticals"
    @update:modelValue="updateParent" 
    @save="clickSave"
    :busy="busy"
    />

    <!-- multichannel selection -->
    <select-multichannel
    v-if="hasMultichannel"
    v-model="multichannel"
    :options="multichannelOptions"
    @update:modelValue="updateParent"
    @save="clickSave"
    :busy="busy"
    :defaultValue="defaultMultichannel"
    />
  </div>
</template>

<script>
import SelectVertical from './select-vertical.vue'
import SelectMultichannel from './select-multichannel.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'SessionConfig',

  components: {
    SelectMultichannel,
    SelectVertical
  },

  props: {
    busy: {
      type: Boolean,
      default: false
    },
    demo: {
      type: String,
      default () { return '' }
    },
    modelValue: {
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
    },
    defaultMultichannel: {
      type: String,
      required: true
    }
  },

  emits: ['update:modelValue', 'load', 'save'],

  data () {
    return {
      model: null
    }
  },

  computed: {
    verticalId () {
      try {
        return this.model.vertical
      } catch (e) {
        return null
      }
    },
    vertical: {
      get () {
        try {
          return this.model.vertical
        } catch (e) {
          return 'travel'
        }
      },
      set (value) {
        if (!this.model) {
          this.model = {}
        }
        this.model.vertical = value
      }
    },
    multichannel: {
      get () {
        try {
          return this.model.multichannel
        } catch (e) {
          return this.defaultMultichannel
        }
      },
      set (value) {
        if (!this.model) {
          this.model = {}
        }
        this.model.multichannel = value
      }
    }
  },

  watch: {
    value () {
      this.updateCache()
    },
  },

  mounted () {
    console.log('mounted session-config', this.modelValue)
    this.updateCache()
  },

  methods: {
    clickSave () {
      this.$emit('save')
    },
    clickLoadVerticals (owner) {
      this.$emit('load', owner)
    },
    updateCache () {
      this.model = JSON.parse(JSON.stringify(this.modelValue))
      // if demo is PCCE and multichannel hasn't been configured yet
      if (this.demo === 'pcce' && this.model && !this.model.multichannel) {
        // set a default multichannel option so the user doesn't have to click 'Configure' button
        this.model['multichannel'] = this.defaultMultichannel
      }
    },
    updateParent () {
      this.$emit('update:modelValue', this.model)
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
