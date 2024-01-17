<template>
  <div class="control">
    <input :type="type" v-model="model">
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      default () {
        return ''
      }
    },
    type: {
      type: String,
      default () {
        return 'text'
      }
    }
  },

  emits: ['update:modelValue'],

  computed: {
    model: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>