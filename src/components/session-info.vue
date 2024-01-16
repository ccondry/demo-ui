<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">
          Demo Session Information
        </h1>
        <div class="block">
          <!-- Basic Information -->
          <Collapse class="content card">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">Basic Information</p>
              <a class="card-header-icon">
                <Icon :icon="props.open ? 'menu-down' : 'menu-up'" />
              </a>
            </div>
            <div class="card-content">

              <field grouped>
                <field label="Datacenter">
                  <p class="control">
                    {{ sessionInfo.datacenter }}
                  </p>
                </field>
                <field label="Session ID">
                  <p class="control">
                    {{ sessionInfo.id }}
                  </p>
                </field>
                <field label="Owner">
                  <p class="control">
                    {{ sessionInfo.owner }}
                  </p>
                </field>
              </field>

              <field grouped>
                <field label="Demo">
                  <p class="control">
                    {{ sessionConfig.demo }}
                  </p>
                </field>
                <field label="Version">
                  <p class="control">
                    {{ sessionConfig.version }}
                  </p>
                </field>
              </field>

              <field grouped>
                <field label="AnyConnect Username">
                  <p class="control">
                    {{ `v${sessionInfo.vpod}user1` }}
                  </p>
                </field>
                <field label="Password">
                  <p class="control">
                    {{ sessionInfo.anycpwd }}
                  </p>
                </field>
              </field>

            </div>
          </Collapse>
          <!-- /Basic Information -->
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Icon from './Icon.vue'

export default {
  name: 'SessionInfo',

  components: {
    Icon,
  },
  
  computed: {
    ...mapGetters([
      'sessionInfo',
      'sessionConfig'
    ])
  }
}
</script>

<style scoped>
p.control {
  margin-right: 4rem;
}
</style>
