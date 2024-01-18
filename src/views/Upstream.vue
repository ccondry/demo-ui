<template>
  <div>
    <!-- Loading Indicator -->
    <Loading
    :active="['loading.upstream.customer', 'working.upstream.customer']"
    />

    <article class="tile is-child box" style="width: 40rem;">
      <h1 class="title">
        Set Customer Interaction History
      </h1>
      <div class="block">
        <!-- first name -->
        <Field label="First Name">
          <Input v-model="form.firstName" placeholder="Michael" expanded />
        </Field>

        <!-- last name -->
        <Field label="Last Name">
          <Input v-model="form.lastName" placeholder="Littlefoot" expanded />
        </Field>
        <!-- <Field label="Contact ID">
          <Input v-model="form.contactId" placeholder="5551112222" />
        </Field> -->

        <!-- phone -->
        <Field label="Phone">
          <Input
          v-model="form.phone"
          placeholder="5551112222"
          expanded />
        </Field>

        <!-- email -->
        <Field label="Email">
          <Input
          v-model="form.email"
          placeholder="michael.littlefoot@gmail.com"
          expanded />
        </Field>
        <!-- <Field label="Vertical">
          <Select v-model="form.vertical">
            <option v-for="vertical of autocomplete.verticals" :value="vertical">
              {{ vertical }}
            </option>
          </Select>
        </Field> -->
        <Field label="Create Interaction History">
          <Input type="checkbox" v-model="form.interactionHistory" />
        </Field>

        <Field>
          <Button
          type="is-success"
          @click.prevent="clickCreate"
          :disabled="disableCreate"
          rounded
          >
            Submit
          </Button>
        </Field>
      </div>
    </article>
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
      // get vertical name from session config
      const verticalId = this.sessionConfig.configuration.vertical
      const vertical = this.verticals.find(v => v.id === verticalId)
      const verticalName = vertical.name
      // confirm with user and save the data to the server
      this.createUpstreamCustomer({
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        phone: this.form.phone,
        email: this.form.email,
        vertical: verticalName,
        interactionHistory: this.form.interactionHistory
      })
    },
    // confirmCreate (data) {
    //   console.log('confirmCreate', data)
    //   // pop confirmation dialog
    //   // TODO implement dialog. use new html standard modal?
    //   // this.$buefy.dialog.confirm({
    //   //   message: `Are you sure you want to create this customer in Upstream Works?`,
    //   //   onConfirm: async () => {
    //   //     await this.createUpstreamCustomer({data})
    //   //   }
    //   // })
    // }
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
