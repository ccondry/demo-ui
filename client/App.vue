<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <!-- <b-loading :is-full-page="true" :active="loading.app.user" :can-cancel="false"></b-loading> -->
    <navbar :show="true" :menu-filter.sync="menuFilter"></navbar>
    <div v-if="authenticated && endpoints">
      <sidebar :show="sidebar.opened && !sidebar.hidden" :menu-filter="menuFilter"></sidebar>
      <app-main></app-main>
    </div>
    <div v-else>
      <login />
    </div>
    <!-- <footer-bar></footer-bar> -->
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import { Navbar, Sidebar, AppMain } from 'components/layout/'
import { mapGetters, mapActions } from 'vuex'
// import router from './router'
import Login from './views/auth/Login'

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
    NprogressContainer,
    Login
  },

  async beforeMount () {
    const { body } = document
    const WIDTH = 768
    const RATIO = 3

    const handler = () => {
      if (!document.hidden) {
        let rect = body.getBoundingClientRect()
        let isMobile = rect.width - RATIO < WIDTH
        this.toggleDevice(isMobile ? 'mobile' : 'other')
        this.toggleSidebar({
          opened: !isMobile
        })
      }
    }

    // add event listeners for DOM events
    document.addEventListener('visibilitychange', handler)
    window.addEventListener('DOMContentLoaded', handler)
    window.addEventListener('resize', handler)

    // check the JWT in localstorage to see if the user is already logged in
    // try {
    console.log('checking login...')
    await this.checkLogin()
    console.log('checking login done.')
    console.log('getting endpoints...')
    await this.getEndpoints()
    console.log('getting endpoints done.')
      // logged in
    // } catch (e) {
      // not logged in, so go to login page
      // return router.push('Login')
    // }

    // if (this.authEnabled === true) {
    //   try {
    //     await this.checkLogin()
    //   } catch (e) {
    //     console.log(e)
    //     console.log('this.$route', this.$route)
    //     if (this.$route.name === 'Password Reset') {
    //       // leave it
    //     } else {
    //       // go to login screen
    //       this.$router.push('Login')
    //     }
    //   }
    // }
  },

  async mounted () {
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'authEnabled',
      'authenticated',
      'loading',
      'endpoints'
    ])
  },

  methods: {
    ...mapActions([
      'toggleDevice',
      'toggleSidebar',
      'checkLogin',
      'getEndpoints'
    ])
  },
  watch: {
    authenticated (val, oldVal) {
      // if user goes from logged in to logged out, forward them to the login page
      if (oldVal === true && val === false) {
        // this.$router.push('Login')
      }
    }
  }
}
</script>

<style lang="scss">
// @import '~animate.css';
// .animated {
//   animation-duration: .377s;
// }

@import '~bulma';

@import '~wysiwyg.css/wysiwyg.sass';

$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';

html {
  background-color: whitesmoke;
}

.nprogress-container {
  position: fixed !important;
  width: 100%;
  height: 50px;
  z-index: 2048;
  pointer-events: none;

  #nprogress {
    $color: #48e79a;

    .bar {
      background: $color;
    }
    .peg {
      box-shadow: 0 0 10px $color, 0 0 5px $color;
    }

    .spinner-icon {
      border-top-color: $color;
      border-left-color: $color;
    }
  }
}
</style>
