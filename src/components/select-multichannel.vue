<template>
  <Message title="Multichannel Configuration">
    <Field label="Choose your multichannel system:">
      <Button
      v-if="typeof modelValue === 'undefined'"
      type="is-primary"
      rounded
      @click="clickConfigure"
      >
        Configure
      </Button>
      <Select v-else v-model="model">
        <option
        v-for="channel of options"
        :key="channel.value"
        :value="channel.value"
        >
          {{ channel.label || channel.value }}
        </option>
      </Select>
    </Field>

    <!-- save button -->
    <div class="buttons">
      <Button
      rounded
      type="is-success"
      @click="clickSave"
      :disabled="busy"
      >
        {{ busy ? 'Working...' : 'Save' }}
      </Button>
    </div>
  </Message>
</template>

<script>
export default {
  name: 'SelectMultichannel',

  props: {
    busy: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default () { return '' }
    },
    options: {
      type: Array,
      default () { return [] }
    }
  },

  emits: [
    'update:modelValue',
    'save'
  ],

  computed: {
    model: {
      get () {
        return this.modelValue
      },
      set (value) {
        console.log('select-multichannel.vue update model', value)
        this.$emit('update:modelValue', value)
      }
    }
  },

  methods: {
    clickSave () {
      this.$emit('save')
    },
    clickConfigure () {
      this.model['multichannel'] = 'ece'
    }
  }
}
</script>
