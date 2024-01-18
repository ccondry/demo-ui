<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <div class="field-content" :class="{ grouped }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Field',

  props: {
    label: {
      type: String,
      default () {
        return ''
      }
    },
    grouped: {
      type: Boolean,
      default: false
    }
  },

  computed: {
  }
}
</script>
