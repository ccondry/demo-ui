<template>
  <footer
  class="footer"
  style="position: sticky; bottom: 0; height: 1.6em; padding: 0; background-color: #ebebeb"
  >
    <div class="content">
      <small style="padding-right: 2em; padding-left: 1em;">
        UI version {{ uiVersion }}
      </small>
      <small style="padding-right: 2em; padding-left: 1em;">
        API version {{ apiVersion }}
      </small>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'uiVersion',
      'apiVersion'
    ])
  }
}
</script>
