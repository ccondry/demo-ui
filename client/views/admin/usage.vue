<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12 is-vertical">
        <article class="tile is-child box">
          <h1 class="title">
            Usage Statistics
          </h1>
          <div class="block">
            <a class="button is-success" :href="jsonData" download="usage.json">Download JSON</a>
            <a class="button is-success" :href="csvData" download="usage.csv">Download CSV</a>
          </div>
          <!-- Main container -->
          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item">
                <p class="subtitle is-5">
                  <button type="button" class="button is-primary" @click.prevent="refresh" :disabled="loading">Refresh</button>
                </p>
              </div>
              <div class="level-item">
                <div class="field has-addons">
                  <p class="control">
                    <input class="input" type="text" v-model="filter" placeholder="Filter">
                  </p>
                </div>
              </div>
            </div>
          </nav>

          <div class="table-responsive">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>datetime</th>
                  <th>datacenter</th>
                  <th>session</th>
                  <th>os</th>
                  <th>verticalId</th>
                  <th>verticalName</th>
                  <th>verticalOwner</th>
                  <th>action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="row in sortedFilteredRows">
                  <td>{{ row.datetime }}</td>
                  <td>{{ row.datacenter }}</td>
                  <td>{{ row.session }}</td>
                  <td>{{ row.os }}</td>
                  <td>{{ row.verticalId }}</td>
                  <td>{{ row.verticalName }}</td>
                  <td>{{ row.verticalOwner }}</td>
                  <td>{{ row.action }}</td>
                </tr>
              </tbody>
            </table>

          </div>

        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import fuzzy from 'fuzzy'

// extract menu item name
function extract (el) {
  // return description if available, or else return name
  return el.datetime + ' ' + el.datacenter + ' ' + el.session + ' ' + el.verticalOwner + ' ' + el.action + ' ' + el.verticalId + ' ' + el.verticalName
}

function makeCsvData (array) {
  if (!array || !Array.isArray(array)) {
    throw Error('data is not an array')
  }
  if (!array.length) {
    throw Error('data is an empty array')
  }
  let str = ''
  // add column titles row
  let line1 = ''
  for (let key of Object.keys(array[0])) {
    line1 += key + ','
  }
  // add everything except the last character (the dangling comma) to the csv
  str += line1.slice(0, -1)
  // add newline
  str += '\r\n'

  // count the rows
  // let rows = 0
  for (let row of array) {
    let line = ''
    // add each value of this row
    for (let i in row) {
      line += row[i] + ','
    }
    // add everything except the last character (the dangling comma) to the csv
    str += line.slice(0, -1)
    // add newline for the end of this row
    str += '\r\n'
    // increment rows
    // rows++
  }
  return str
}

export default {
  data () {
    return {
      loading: false,
      filter: ''
    }
  },
  mounted () {
    // load users if they're not loaded yet
    if (!this.usage.length) {
      return this.refresh(false)
    }
  },
  methods: {
    ...mapActions([
      'loadUsage'
    ]),
    refresh (showNotification) {
      this.loadUsage(showNotification)
    }
  },
  computed: {
    ...mapGetters(['usage']),
    csvData () {
      try {
        const csv = makeCsvData(this.usage)
        return 'data:text/csv;base64,' + window.btoa(csv)
      } catch (e) {
        return ''
      }
    },
    jsonData () {
      return 'data:text/json;charset=utf-8;base64,' + window.btoa(JSON.stringify(this.usage, null, 2))
    },
    sortedRows () {
      return this.usage
    },
    sortedFilteredRows () {
      // filter data using the search box
      const results = fuzzy.filter(this.filter, this.sortedRows, {extract})
      // map the original children objects
      const matches = results.map(function (el) { return el.original })
      // replace children with fuzzy filtered results map
      return matches
    }
  }
}
</script>
