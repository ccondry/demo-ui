<template>
  <div>
    <!-- Loading Indicator -->
    <b-loading :is-full-page="false" :active="loading.upstream.customer || working.upstream.customer" :can-cancel="false"></b-loading>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <h1 class="title">
            Set Customer Interaction History
          </h1>
          <div class="block">
            <b-field label="First Name">
              <b-input v-model="form.firstName" placeholder="Michael" />
            </b-field>
            <b-field label="Last Name">
              <b-input v-model="form.lastName" placeholder="Littlefoot" />
            </b-field>
            <!-- <b-field label="Contact ID">
              <b-input v-model="form.contactId" placeholder="5551112222" />
            </b-field> -->
            <b-field label="Phone">
              <b-input v-model="form.phone" placeholder="5551112222" />
            </b-field>
            <b-field label="Email">
              <b-input v-model="form.email" placeholder="michael.littlefoot@gmail.com" />
            </b-field>
            <b-field label="Vertical">
              <b-autocomplete
              v-model="form.vertical"
              :data="autocomplete.verticals"
              :placeholder="autocomplete.verticals[0]" />
            </b-field>

            <b-field>
              <button type="button" class="button is-success" @click.prevent="clickCreate" :disabled="disableCreate">Submit</button>
            </b-field>

          </div>
        </article>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  data () {
    return {
      form: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        // contactId: '',
        vertical: ''
      },
      autocomplete: {
        verticals: [
          'Travel',
          'City',
          'Finance',
          'Utility',
          'Healthcare'
        ]
      }
    }
  },

  methods: {
    ...mapActions([
      'createUpstreamCustomer'
    ]),
    clickCreate () {
      console.log('clicked create')
      // confirm with user and save the data to the server
      this.confirmCreate({
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        phone: this.form.phone,
        email: this.form.email,
        vertical: this.form.vertical
      })
    },
    confirmCreate (data) {
      console.log('confirmCreate', data)
      // pop confirmation dialog
      this.$dialog.confirm({
        message: `Are you sure you want to create this customer in Upstream?`,
        onConfirm: async () => {
          await this.createUpstreamCustomer({data})
        }
      })
    }
  },

  computed: {
    ...mapGetters([
      'loading',
      'working'
    ]),
    disableCreate () {
      return !this.form.firstName.length ||
      !this.form.lastName.length ||
      !this.form.phone.length ||
      !this.form.email.length ||
      // !this.form.contactId.length ||
      !this.form.vertical.length
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
