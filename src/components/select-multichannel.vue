<template>
  <b-message title="Multichannel Configuration" :closable="false">
    <b-field label="Choose your multichannel system:">
      <b-button
      v-if="typeof value === 'undefined'"
      type="is-primary"
      rounded
      @click="clickConfigure"
      >
        Configure
      </b-button>
      <b-select
      v-else
      :value="value"
      @change="select"
      >
        <option
        v-for="channel of options"
        :key="channel"
        :value="channel"
        >
          {{ channelNames[channel] || channel }}
        </option>
      </b-select>
    </b-field>
  </b-message>
</template>

<script>
export default {
  name: 'SelectMultichannel',

  props: {
    value: {
      type: String,
      default () { return '' }
    },
    options: {
      type: Array,
      default () { return [] }
    }
  },

  data () {
    return {
      channelNames: {
        ece: 'ECE',
        salesforce: 'Salesforce',
        servicenow: 'ServiceNow',
        upstream: 'Upstream Works',
        msdynamics: 'MS Dynamics',
        webex: 'Webex'
      }
    }
  },

  methods: {
    clickConfigure () {
      this.$set(this.model, 'multichannel', 'ece')
    },
    select (e) {
      // console.log('input', e.target.value)
      this.$emit('input', e.target.value)
    }
  }
}
</script>
