<template>
  <span class="mdi mdi-24px" :class="icon"></span>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>