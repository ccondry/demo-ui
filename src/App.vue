<template>
  <div id="container">
    <!-- main page content -->
    <div class="content">
      <navbar />
      <sidebar />
      <app-main />
    </div>
    <!-- footer -->
    <div class="footer">
      <site-footer />
    </div>
  </div>
</template>

<script>
import AppMain from './components/layout/main.vue'
import Navbar from './components/layout/navbar.vue'
import Sidebar from './components/layout/sidebar.vue'
import SiteFooter from './components/layout/footer.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Index',

  components: {
    AppMain,
    Navbar,
    Sidebar,
    SiteFooter,
  },

  computed: {
    ...mapGetters([
      'loading',
      'uiVersion',
      'apiVersion',
    ])
  },
  
  async beforeMount () {
    // get API version info
    this.getApiVersion()

    // load dcloud verticals list
    console.log('getting verticals...')
    await this.listVerticals()
    console.log('getting verticals done.')

    // load demo session configuration
    console.log('getting demo config...')
    await this.loadSessionConfig()
    console.log('getting demo config done.')

    // load dcloud session info
    console.log('getting session info...')
    await this.loadSessionInfo()
    console.log('getting session info done.')

    // load demo base configuration
    console.log('getting demo base config...')
    await this.loadDemoBaseConfig()
    console.log('getting demo base config done.')

    // load multichannel options
    console.log('getting multichannel options...')
    await this.listMultichannels()
    console.log('getting multichannel options done.')
  },

  methods: {
    ...mapActions([
      'loadSessionConfig',
      'loadDemoBaseConfig',
      'loadSessionInfo',
      'listVerticals',
      'listMultichannels',
      'getApiVersion',
    ])
  }
}
</script>
