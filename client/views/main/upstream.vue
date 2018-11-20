<template>
  <div>
    <!-- Loading Indicator -->
    <b-loading :is-full-page="false" :active="working.upstream.customer" :can-cancel="false"></b-loading>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <h1 class="title">
            Create Customer
          </h1>
          <div class="block">
            <b-field label="First Name">
              <b-input v-model="form.firstName" placeholder="Michael" />
            </b-field>
            <b-field label="Last Name">
              <b-input v-model="form.lastName" placeholder="Littlefoot" />
            </b-field>
            <b-field label="Contact ID">
              <b-input v-model="form.contactId" placeholder="5551112222" />
            </b-field>
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
              <button type="button" class="button is-success" @click.prevent="clickCreate" :disabled="disableCreate">Create</button>
            </b-field>

          </div>
        </article>
      </div>
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <h1 class="title">
            Edit Customer's Vertical
          </h1>
          <div class="block">
            <b-field label="Contact ID">
              <b-input v-model="form2.contactId" placeholder="5551112222" />
            </b-field>
            <b-field label="Vertical">
              <b-autocomplete
              v-model="form2.vertical"
              :data="autocomplete.verticals"
              :placeholder="autocomplete.verticals[0]" />
            </b-field>

            <b-field>
              <button type="button" class="button is-success" @click.prevent="clickSave" :disabled="disableSave">Save</button>
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
  components: {
  },
  data () {
    return {
      form: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        contactId: '',
        vertical: ''
      },
      form2: {
        contactId: '',
        vertical: ''
      },
      autocomplete: {
        verticals: [
          'travel',
          'city',
          'finance',
          'utility',
          'healthcare'
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'createUpstreamCustomer',
      'setUpstreamVertical'
    ]),
    clickCreate () {
      console.log('clicked create')
      // confirm with user and save the data to the server
      this.confirmCreate({
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        contactId: this.form.contactId,
        phone: this.form.phone,
        email: this.form.email,
        vertical: this.form.vertical
      })
    },
    clickSave () {
      console.log('clicked save')
      // confirm with user and save the data to the server
      this.confirmSave({
        contactId: this.form2.contactId,
        vertical: this.form2.vertical
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
    },
    confirmSave (data) {
      console.log('confirmSave', data)
      // pop confirmation dialog
      this.$dialog.confirm({
        message: `Are you sure you want to change this Upstream customer's vertical?`,
        onConfirm: async () => {
          await this.setUpstreamVertical({data})
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'loading',
      'working'
    ]),
    disableSave () {
      return false
    },
    disableCreate () {
      return !this.form.firstName.length ||
      !this.form.lastName.length ||
      !this.form.phone.length ||
      !this.form.email.length ||
      !this.form.contactId.length ||
      !this.form.vertical.length
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
