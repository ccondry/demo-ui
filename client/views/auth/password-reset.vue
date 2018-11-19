<template>
  <div class="content has-text-centered">
    <h1 class="is-title is-bold">Reset Your Password</h1>

    <div class="columns is-vcentered">
      <div class="column is-6 is-offset-3">
        <div class="box">
          <form @submit.prevent="submit">
            <label class="label">Token</label>
            <p class="control">
              <input v-model="token" class="input" type="text" placeholder="token" disabled>
            </p>
            <label class="label">Username</label>
            <p class="control">
              <input v-model="username" class="input" type="text" placeholder="username" disabled>
            </p>
            <label class="label">New Password</label>
            <p class="control">
              <input v-model="password" class="input" type="password" placeholder="new password">
            </p>
            <hr>
            <p class="control">
              <button type="submit" class="button is-primary is-fullwidth">Reset Password</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: null,
      password: null,
      token: ''
    }
  },
  mounted () {
    // get query string data
    this.username = this.$route.query.username
    this.token = this.$route.query.token
  },
  methods: {
    ...mapActions([
      'resetPassword'
    ]),
    async submit () {
      try {
        await this.resetPassword({
          token: this.token,
          newPassword: this.password
        })
        // forward to the login page
        // this.$router.push('Login')
      } catch (e) {
        console.log(e)
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
