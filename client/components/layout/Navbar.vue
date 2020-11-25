<template>
  <b-navbar :fixed-top="true" :shadow="true" :centered="true">
    <template slot="start">
      <b-navbar-item style="margin-left: 10rem;"> 
        <strong>dCloud Toolbox - Demo Session Configuration</strong>
      </b-navbar-item>
    </template>
    <template slot="end" v-if="isLoggedIn">
      <b-navbar-item tag="div">
        <span style="padding-right: 1rem;">
          {{ jwtUser.email }}
        </span>
        <b-button
        type="is-info"
        rounded
        @click="clickLogout"
        >
          Log Out
        </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'jwtUser',
      'isLoggedIn'
    ])
  },

  methods: {
    ...mapActions([
      'logout'
    ]),
    clickLogout () {
      this.logout()
    }
  }
}
</script>
