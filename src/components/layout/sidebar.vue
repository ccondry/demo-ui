<template>
  <aside class="menu app-sidebar">
    <ul class="menu-list">
      <!-- for each menu item - but only show admins the Admin menu -->
      <li>
        <Icon icon="mdi-tune" />
        <router-link
        to="/configure"
        :exact="true"
        >
          Configure
        </router-link>
      </li>
      <li v-if="hasUpstream">
        <Icon icon="mdi-cloud" />
        <router-link
        to="/upstream"
        :exact="true"
        >
          Upstream Works
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'hasUpstream'
    ]),
  },

  methods: {
    ...mapActions([
      'expandMenu'
    ]),
  }
}
</script>
