<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">
        dCloud Collaboration Toolbox Log In
      </p>
      <button
      type="button"
      class="delete"
      style="margin-left: 0.5rem;"
      @click="$emit('close')"
      />
    </header>

    <section class="modal-card-body">
      <div class="buttons">
        <b-button
        @click="clickSso"
        type="is-info"
        expanded
        >
          Log In with Cisco SSO
        </b-button>
      </div>
    </section>

    <footer class="modal-card-foot">
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeStep: 0,
      username: '',
      password: ''
    }
  },

  methods: {
    clickSso () {
      this.$emit('sso')
      this.$emit('close')
    }
    // clickLogin () {
    //   this.$emit('login', {
    //     username: this.username,
    //     password: this.password
    //   })
    //   this.$emit('close')
    // }
  }
}
</script>
