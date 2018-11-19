<template>
  <div class="content has-text-centered">
    <!-- Loading Indicator -->
    <b-loading :is-full-page="false" :active="working.app.login" :can-cancel="false"></b-loading>

    <h1 class="is-title is-bold">Login</h1>

    <div class="columns is-vcentered">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <form @submit.prevent="submit" v-if="!authenticated">
            <label class="label">Username</label>
            <p class="control">
              <input v-model="username" autocomplete="username" class="input" type="text" placeholder="username">
            </p>
            <label class="label">Password</label>
            <p class="control">
              <input v-model="password" autocomplete="current-password" class="input" type="password" placeholder="password">
            </p>
            <hr>
            <p class="control">
              <button type="submit" class="button is-primary is-fullwidth">Log In</button>
            </p>
            <a href="" @click.prevent="clickResetPassword">Reset Password</a>
            |
            <a :href="accountRequestUrl" target="account_request">Request an Account</a>
          </form>
        </div>
      </div>
    </div>
    <reset-password-modal
    v-if="showModal"
    ref="modal"
    :visible="showModal"
    title="Reset Your Password"
    @close="showModal = false"
    @submit="submitResetPassword">
    </reset-password-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ResetPasswordModal from '../../components/modals/reset-password'

export default {
  components: {
    ResetPasswordModal
  },
  data () {
    return {
      username: null,
      password: null,
      accountRequestUrl: 'https://docs.google.com/forms/d/1if5pG64yZiZbk5hwGKpU-KGDOfGUC7GDDGwC96aL210/viewform',
      showModal: false
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'authenticated',
      forwardTo: 'forwardTo',
      'working': 'working'
    })
  },
  activated () {
    // forward user to home page if they're already authenticated
    // if (this.authenticated) {
    //   this.$router.go(-1)
    // }
  },
  methods: {
    ...mapActions([
      'login',
      'sendPasswordResetEmail',
      'setForwardTo'
    ]),
    clickResetPassword () {
      console.log('clicked reset password')
      // open modal
      this.showModal = true
    },
    submitResetPassword (data) {
      console.log('submit reset password', data)
      this.showModal = false
      this.sendPasswordResetEmail(data)
    },
    async submit () {
      const username = this.username
      const password = this.password
      try {
        await this.login({
          username,
          password
        })
      } catch (e) {
        // do nothing
      }
    }
  },
  watch: {
    authenticated (val, oldVal) {
      // did user just login?
      if (val === true && oldVal === false) {
        console.log('became authenticated. going from login page to home page.')
        // go to the home page
        // console.log('router', this.$router)
        // // if the last page is a page here, go to it. otherwise go Home
        // // this.$router.go(-1)
        // if (this.forwardTo !== null) {
        //   console.log('forwardTo', this.forwardTo)
        //   this.$router.push(this.forwardTo.name)
        //   this.setForwardTo(null)
        // } else {
        //   this.$router.push('Home')
        // }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
</style>
