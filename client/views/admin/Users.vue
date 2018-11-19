<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12 is-vertical">
        <article class="tile is-child box">
          <h1 class="title">

            <!-- <button type="button" class="button is-primary" @click.prevent="refresh" :disabled="loading">Refresh</button> -->
            <!-- <input type="text" class="wysiwyg" v-model="filter" placeholder="filter users"> -->

            <!-- <div class="level-item">
              <div class="field">
                Users
              </div>
              <div class="field">
                <button type="button" class="button is-primary" @click.prevent="refresh" :disabled="loading">Refresh</button>
              </div>
              <div class="field">
                <input class="input" type="text" placeholder="filter users">
              </div>
            </div> -->


            <!-- Main container -->
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  <p>Users</p>
                </div>
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
          </h1>
          <div class="table-responsive">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Office</th>
                  <th>email</th>
                  <th>UPN</th>
                  <th>Actions</th>
                  <!-- <th class="is-hidden-mobile">Internal DNIS</th> -->
                </tr>
              </thead>

              <tbody>
                <tr v-for="user in sortedFilteredUsers">
                  <td>{{ user.name }}</td>
                  <td>{{ user.sAMAccountName }}</td>
                  <td>{{ user.description }}</td>
                  <td>{{ user.physicalDeliveryOfficeName }}</td>
                  <td>{{ user.mail }}</td>
                  <td>{{ user.userPrincipalName }}</td>
                  <td><button type="button" class="button is-primary" @click.prevent="clickSu(user)">Switch User</button></td>
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
import { contains } from '../../filters'

export default {
  data () {
    return {
      loading: false,
      filter: ''
    }
  },
  mounted () {
    // load users if they're not loaded yet
    if (!this.users.length) {
      return this.refresh(false)
    }
  },
  methods: {
    ...mapActions([
      'loadUsers',
      'su'
    ]),
    refresh (showNotification) {
      this.loadUsers(showNotification)
    },
    clickSu (user) {
      this.su({
        showNotification: true,
        user
      })
    }
  },
  computed: {
    ...mapGetters(['users']),
    sortedUsers () {
      return this.users
    },
    sortedFilteredUsers () {
      // filter data using the search box
      return this.sortedUsers.filter(contains(this.filter))
    }
  }
}
</script>
