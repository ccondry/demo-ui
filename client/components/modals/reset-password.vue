<template>
  <card-modal :visible="visible" @close="close" :title="title"
  transition="zoom" @ok="ok" @cancel="close"
  ok-text="Send">
  <div class="content has-text-centered">
    Please enter your username or email address. We will email you a link
    to reset your password using the primary email address on your account.
  </div>

  <form class="control" @submit.prevent="ok">
    <p class="control has-icon">
      <input class="input is-expanded" type="text" placeholder="Username or Email Address" name="email" ref="email" autofocus v-model="templateName">
      <span class="icon is-small">
        <i class="fa fa-envelope"></i>
      </span>
    </p>

  </form>

</card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal'

export default {
  components: {
    CardModal
  },

  mounted () {
    this.$refs.email.focus()
  },

  props: {
    visible: Boolean,
    title: String
  },

  data () {
    return {
      templateName: ''
    }
  },

  methods: {
    ok () {
      this.$emit('submit', this.templateName)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
