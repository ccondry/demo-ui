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
import { mapGetters } from 'vuex'

export default {
  name: 'SessionConfig',

  components: {
    SelectMultichannel,
    SelectVertical
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

  computed: {
    ...mapGetters([
      'demoBaseConfig',
      'verticals',
    ]),
    verticalId () {
      try {
        return this.model.vertical
      } catch (e) {
        return null
      }
    },
  },

  watch: {
    value () {
      this.updateCache()
    },
    verticalId (val) {
      // if session config has not loaded yet
      if (!this.sessionConfig || !this.sessionConfig) {
        // do nothing - probably this is the first page load
        return
      }

      // did they select the current vertical?
      if (val === this.sessionConfig.vertical) {
        // do nothing
        return
      }

      // if demo doesn't use CVA feature
      if (
        !Array.isArray(this.demoBaseConfig.features) ||
        !this.demoBaseConfig.features.includes('cva')
      ) {
        // just update the vertical ID
        this.updateParent()
      }

      // find full vertical details
      const vertical = this.verticals.find(v => v.id === val)
      
      // if new vertical doesn't use CVA feature or uses standard CVA
      if (
        !vertical.gcpProjectId ||
        vertical.gcpProjectId === 'cumulus-v2-hotikl'
      ) {
        // just update the vertical ID
        this.updateParent()
      }

      // else new vertical uses custom CVA
      // prompt user for the private key ID
      this.$buefy.dialog.prompt({
        title: 'Enter Private Key ID',
        message: 'Please enter the Private Key ID to use the CVA features for this branding. You can find it in the JSON file or on your Google console Service Accounts page.',
        type: 'is-success',
        confirmText: 'Submit',
        rounded: true,
        onConfirm: (privateKeyId) => {
          // store privateKeyId in the config data. server will use it but
          // not write it to the config data.
          this.$set(this.model, 'privateKeyId', privateKeyId)
          // update demo config
          this.updateParent()
        }
      })
    },
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
