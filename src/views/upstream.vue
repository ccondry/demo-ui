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
            <!-- <b-field label="Vertical">
              <b-select v-model="form.vertical">
                <option v-for="vertical of autocomplete.verticals" :value="vertical">
                  {{ vertical }}
                </option>
              </b-select>
            </b-field> -->
            <b-field label="Create Interaction History">
              <b-checkbox v-model="form.interactionHistory" />
            </b-field>

            <b-field>
              <b-button
              type="is-success"
              @click.prevent="clickCreate"
              :disabled="disableCreate"
              rounded
              >
                Submit
              </b-button>
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
  name: 'Upstream',

  data () {
    return {
      form: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        // contactId: '',
        // vertical: 'Finance',
        interactionHistory: true
      }
      // autocomplete: {
      //   verticals: [
      //     'Travel',
      //     'City',
      //     'Finance',
      //     'Utility',
      //     'Healthcare'
      //   ]
      // }
    }
  },

  methods: {
    ...mapActions([
      'createUpstreamCustomer'
    ]),
    clickCreate () {
      console.log('clicked create')
      // get vertical name from session config
      const verticalId = this.sessionConfig.configuration.vertical
      const vertical = this.verticals.find(v => v.id === verticalId)
      const verticalName = vertical.name
      // confirm with user and save the data to the server
      this.confirmCreate({
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        phone: this.form.phone,
        email: this.form.email,
        vertical: verticalName,
        interactionHistory: this.form.interactionHistory
      })
    },
    confirmCreate (data) {
      console.log('confirmCreate', data)
      // pop confirmation dialog
      this.$buefy.dialog.confirm({
        message: `Are you sure you want to create this customer in Upstream Works?`,
        onConfirm: async () => {
          await this.createUpstreamCustomer({data})
        }
      })
    }
  },

  computed: {
    ...mapGetters([
      'loading',
      'working',
      'sessionConfig',
      'verticals'
    ]),
    disableCreate () {
      return !this.form.firstName.length ||
      !this.form.lastName.length ||
      !this.form.phone.length ||
      !this.form.email.length
      // !this.form.contactId.length ||
      // !this.form.vertical.length
    }
  }
}
</script>
