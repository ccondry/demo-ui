<template>
  <div class="content has-text-centered" style="height: 100vh">
    <b-loading
    :is-full-page="true"
    :active="!oauthError"
    :can-cancel="false"
    />
    <!-- <pre>{{$route.query.code}}</pre> -->
    <div v-if="oauthError">
      <p>
        Sorry, there was an error during OAUTH authorization:
        {{ oauthError }}
      </p>
      <b-field>
        <b-button @click="clickHome" class="is-primary">Return to Log In Page</b-button>
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'ciscoOauth2Login'
    ]),
    clickHome () {
      this.$router.push({name: 'Login'}).catch(e => {})
    }
  },
  async mounted () {
    this.ciscoOauth2Login(this.$route.query.code)
  },
  computed: {
    ...mapGetters([
      'oauthError'
    ])
  }
}
</script>
