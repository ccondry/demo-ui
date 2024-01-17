<template>
  <div class="message">
    <div class="message-header">
      {{ title }}
    </div>
  
    <div class="message-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    } 
  }
}
</script>