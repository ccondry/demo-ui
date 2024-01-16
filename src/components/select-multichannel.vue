<template>
  <Message title="Multichannel Configuration" :closable="false">
    <Field label="Choose your multichannel system:">
      <Button
      v-if="typeof modelValue === 'undefined'"
      type="is-primary"
      rounded
      @click="clickConfigure"
      >
        Configure
      </Button>
      <Select
      v-else
      :model-value="modelValue"
      @update:modelValue="select"
      >
        <option
        v-for="channel of options"
        :key="channel.value"
        :value="channel.value"
        >
          {{ channel.label || channel.value }}
        </option>
      </Select>
    </Field>

    <Field>
      <Button
      rounded
      type="is-success"
      @click="clickSave"
      >
        Save
      </Button>
    </Field>
  </Message>
</template>

<script>
export default {
  name: 'SelectMultichannel',

  props: {
    modelValue: {
      type: String,
      default () { return '' }
    },
    options: {
      type: Array,
      default () { return [] }
    }
  },

  emits: ['update:modelValue', 'save'],

  methods: {
    clickSave () {
      this.$emit('save')
    },
    clickConfigure () {
      this.model['multichannel'] = 'ece'
    },
    select (e) {
      console.log('select multichannel input:', e)
      this.$emit('update:modelValue', modelValue)
    }
  }
}
</script>
