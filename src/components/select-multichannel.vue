<template>
  <b-message title="Multichannel Configuration" :closable="false">
    <field label="Choose your multichannel system:">
      <Button
      v-if="typeof value === 'undefined'"
      type="is-primary"
      rounded
      @click="clickConfigure"
      >
        Configure
      </Button>
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
    </field>

    <field>
      <Button
      rounded
      type="is-success"
      @click="clickSave"
      >
        Save
      </Button>
    </field>
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
