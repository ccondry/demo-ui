<template>
  <section>
    <b-field grouped group-multiline>
      <b-input placeholder="Filter Results..."
      type="search"
      icon="magnify"
      v-model="filter"
      @keyup.esc="filter = ''"/>
    </b-field>

    <b-table
    :data="filteredData"
    :paginated="true"
    :per-page="10"
    :current-page.sync="currentPage"
    :selected.sync="selected"
    default-sort="user.lastName">

      <template slot-scope="props">
        <b-table-column field="contactId" label="Contact ID" width="40" sortable numeric>
          {{ props.row.contactId }}
        </b-table-column>

        <b-table-column field="teamId" label="teamId" width="40" sortable numeric>
          {{ props.row.teamId }}
        </b-table-column>

        <b-table-column field="firstName" label="First Name" sortable>
          {{ props.row.firstName }}
        </b-table-column>

        <b-table-column field="lastName" label="Last Name" sortable>
          {{ props.row.lastName }}
        </b-table-column>

        <b-table-column field="phoneNumber" label="Phone Number" sortable>
          {{ props.row.phoneNumber }}
        </b-table-column>

        <b-table-column field="vertical" label="Vertical" sortable>
          {{ props.row.vertical }}
        </b-table-column>

        <!-- <b-table-column field="dateOfBirth" label="Date" sortable centered>
          <span class="tag is-success">
            {{ new Date(props.row.dateOfBirth).toLocaleDateString() }}
          </span>
        </b-table-column> -->

        <!-- <b-table-column label="Gender">
          <b-icon pack="fa"
          :icon="props.row.gender === 'Male' ? 'mars' : 'venus'" />
          {{ props.row.gender }}
        </b-table-column> -->
      </template>
      <!-- <template slot="footer" v-if="!isCustom">
        <div class="has-text-right">
          <button class="button is-info" :disabled="!selected">Change Vertical</button>
          <button class="button is-danger" :disabled="!selected">Delete</button>
        </div>
      </template> -->
    </b-table>
  </section>
</template>

<script>
function myFilter (filter, fields) {
  return function (v) {
    for (const field of fields) {
      if (v[field] && v[field].toString().toLowerCase().indexOf(filter) >= 0) return true
    }
  }
}

export default {
  props: ['model'],

  data () {
    return {
      filter: '',
      currentPage: 1,
      selected: null
    }
  },

  computed: {
    filteredData () {
      return this.model.filter(myFilter(this.filter, ['contactId', 'firstName', 'lastName', 'emailAddress']))
    }
  },

  watch: {
    filteredData (val, oldVal) {
      // when filtering data, deselect option if filtering removes option from list
      if (!this.filteredData.includes(this.selected)) {
        this.selected = null
      }
    }
  }
}
</script>
