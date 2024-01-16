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

              <Field grouped>
                <Field label="Datacenter">
                  <p class="control">
                    {{ sessionInfo.datacenter }}
                  </p>
                </Field>
                <Field label="Session ID">
                  <p class="control">
                    {{ sessionInfo.id }}
                  </p>
                </Field>
                <Field label="Owner">
                  <p class="control">
                    {{ sessionInfo.owner }}
                  </p>
                </Field>
              </Field>

              <Field grouped>
                <Field label="Demo">
                  <p class="control">
                    {{ sessionConfig.demo }}
                  </p>
                </Field>
                <Field label="Version">
                  <p class="control">
                    {{ sessionConfig.version }}
                  </p>
                </Field>
              </Field>

              <Field grouped>
                <Field label="AnyConnect Username">
                  <p class="control">
                    {{ `v${sessionInfo.vpod}user1` }}
                  </p>
                </Field>
                <Field label="Password">
                  <p class="control">
                    {{ sessionInfo.anycpwd }}
                  </p>
                </Field>
              </Field>

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
