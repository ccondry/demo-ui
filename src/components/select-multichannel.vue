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
      @input="select"
      >
        <option
        v-for="channel of options"
        :key="channel.value"
        :value="channel.value"
        >
          {{ channel.label || channel.value }}
        </option>
      </b-select>
    </b-field>

    <b-field>
      <b-button
      rounded
      type="is-success"
      @click="clickSave"
      >
        Save
      </b-button>
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

  methods: {
    clickSave () {
      this.$emit('save')
    },
    clickConfigure () {
      this.$set(this.model, 'multichannel', 'ece')
    },
    select (e) {
      console.log('select multichannel input:', e)
      this.$emit('input', e)
    }
  }
}
</script>
