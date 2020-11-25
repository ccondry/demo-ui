<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">
          Demo Session Information
        </h1>
        <div class="block">
          <!-- Basic Information -->
          <b-collapse class="content card">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">Basic Information</p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
              </a>
            </div>
            <div class="card-content">

              <b-field grouped>
                <b-field label="Datacenter">
                  <p class="control">
                    {{ sessionInfo.datacenter }}
                  </p>
                </b-field>
                <b-field label="Session ID">
                  <p class="control">
                    {{ sessionInfo.id }}
                  </p>
                </b-field>
                <b-field label="Owner">
                  <p class="control">
                    {{ sessionInfo.owner }}
                  </p>
                </b-field>
              </b-field>

              <b-field grouped>
                <b-field label="Demo">
                  <p class="control">
                    {{ demoConfig.demo }}
                  </p>
                </b-field>
                <b-field label="Version">
                  <p class="control">
                    {{ demoConfig.version }}
                  </p>
                </b-field>
              </b-field>

              <b-field grouped>
                <b-field label="AnyConnect Username">
                  <p class="control">
                    {{ `v${sessionInfo.vpod}user1` }}
                  </p>
                </b-field>
                <b-field label="Password">
                  <p class="control">
                    {{ sessionInfo.anycpwd }}
                  </p>
                </b-field>
              </b-field>

            </div>
          </b-collapse>
          <!-- /Basic Information -->
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'sessionInfo',
      'demoConfig'
    ])
  }
}
</script>

<style scoped>
p.control {
  margin-right: 4rem;
}
</style>
