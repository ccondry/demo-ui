<template>
  <!-- AI Selection -->
  <Message title="AI Selection">
    <div class="block" style="position: relative;">

      <!-- choose AI agent type -->
      <Field :label="`Choose the AI Agent type you want to use:`">
        <Select v-model="model">
          <option value="scripted">Scripted</option>
          <option value="autonomous">Autonomous</option>
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
    </div>
  </Message>
</template>

<script>
export default {
  name: 'SelectAi',

  props: {
    busy: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default () { return 'scripted' }
    },
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
        this.$emit('update:modelValue', value)
      }
    },
  },

  methods: {
    clickSave () {
      this.$emit('save')
    },
  }
}
</script>
