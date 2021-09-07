<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <!-- <b-loading :is-full-page="true" :active="loading.app.user" :can-cancel="false"></b-loading> -->
    <navbar :show="true" :menu-filter.sync="menuFilter"></navbar>
    <div v-if="endpoints">
      <sidebar :show="sidebar.opened && !sidebar.hidden" :menu-filter="menuFilter"></sidebar>
      <app-main></app-main>
    </div>
    <!-- <footer-bar></footer-bar> -->
    <footer class="footer" style="margin-left: 220px; height: 1.6em; padding: 0; background-color: #ebebeb">
      <div class="content">
        <small style="padding-right: 2em; padding-left: 1em;">
          UI version {{ uiVersion }}
        </small>
        <small style="padding-right: 2em; padding-left: 1em;">
          API version {{ apiVersion }}
        </small>
        <small style="padding-right: 2em; padding-left: 1em;">
          Auth API version {{ authApiVersion }}
        </small>
        <small style="padding-right: 2em; padding-left: 1em;">
          {{ ciscoRedirectUri }}
        </small>
      </div>
    </footer>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import { Navbar, Sidebar, AppMain } from 'components/layout/'
import { mapGetters, mapActions } from 'vuex'
// import router from './router'

export default {
  data () {
    return {
      menuFilter: ''
    }
  },

  components: {
    Navbar,
    Sidebar,
    AppMain,
    NprogressContainer
  },

  async beforeMount () {
    // check if JWT is in localstorage
    this.checkLogin()
    // load demo session configuration
    console.log('getting demo config...')
    await this.loadDemoConfig(false)
    console.log('getting demo config done.')
    // load dcloud session info
    console.log('getting session info...')
    await this.loadSessionInfo(false)
    console.log('getting session info done.')
    // load dcloud verticals list
    console.log('getting verticals...')
    await this.loadVerticals(false)
    console.log('getting verticals done.')
    // load demo base configuration
    console.log('getting demo base config...')
    await this.loadDemoBaseConfig(false)
    console.log('getting demo base config done.')
    // get API version info
    this.getApiVersion()
    this.getAuthApiVersion()
  },

  async mounted () {

  },

  computed: {
    ...mapGetters([
      'sidebar',
      'loading',
      'endpoints',
      'uiVersion',
      'apiVersion',
      'authApiVersion',
      'ciscoRedirectUri'
    ])
  },

  methods: {
    ...mapActions([
      'toggleDevice',
      'toggleSidebar',
      'loadDemoConfig',
      'loadDemoBaseConfig',
      'loadSessionInfo',
      'loadVerticals',
      'checkLogin',
      'getApiVersion',
      'getAuthApiVersion'
    ])
  }
}
</script>
