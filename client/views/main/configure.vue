<template>
  <div>
    <!-- Loading Indicator -->
    <b-loading :is-full-page="false" :active="loading.session.config || loading.session.info || working.session.config" :can-cancel="false"></b-loading>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">
            Demo Session Information
            <!-- 'updated' tag -->
            <!-- <b-tag v-if="isRecent('2018-10-24')" type="is-primary">Updated</b-tag> -->
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
                  <b-field label="Session ID">
                    <b-input v-model="sessionInfo.id" disabled />
                  </b-field>
                  <b-field label="Datacenter">
                    <b-input v-model="sessionInfo.datacenter" disabled />
                  </b-field>
                  <b-field label="Owner">
                    <b-input v-model="sessionInfo.owner" disabled />
                  </b-field>
                </b-field>

                <b-field grouped>
                  <b-field label="Demo">
                    <b-input v-model="demoConfig.demo" disabled />
                  </b-field>
                  <b-field label="Version">
                    <b-input v-model="demoConfig.version" disabled />
                  </b-field>
                </b-field>

                <b-field grouped>
                  <b-field label="AnyConnect Username">
                    <b-input :value="`v${sessionInfo.vpod}user1`" disabled />
                  </b-field>
                  <b-field label="Password">
                    <b-input :value="sessionInfo.anycpwd" disabled />
                  </b-field>
                </b-field>

              </div>
            </b-collapse>
            <!-- /Basic Information -->
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">
            Demo Session Configuration
          </h1>
          <div class="content">
            <p>
              Use this form to choose the Vertical to use when you open
              <a :href="brandDemoLink" target="brand">
                <strong>your demo website</strong>
              </a>. Be sure to click Save after changing these settings.
            </p>
            <!-- <p>
              You can create and configure your own vertical on the
              <a :href="brandEditorLink" target="brand-toolbox">
                <strong>Demo Branding Toolbox</strong>
              </a>.
            </p> -->
            <!-- <button type="button" class="button is-success" @click.prevent="clickSave" :disabled="disableSave">Save</button> -->
            <b-loading :is-full-page="false" :active="loading.app.verticals || working.app.verticals" :can-cancel="false"></b-loading>
            <session-config
            :model.sync="formModel"
            @save="clickSave"
            :defaults="defaults.configuration"
            ></session-config>

            <div class="block" style="padding-top: 1em;">
              <button type="button" class="button is-success" @click.prevent="clickSave" :disabled="disableSave">Save</button>
            </div>
          </div>

        </article>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SessionConfig from '../../components/session-config.vue'
import moment from 'moment'

export default {

  components: {
    SessionConfig
  },

  data () {
    return {
      activeTab: 0,
      verticalDataString: '',
      showModal: false,
      formModel: {}
    }
  },

  methods: {
    ...mapActions([
      'loadDemoConfig',
      'errorNotification',
      'saveDemoConfig'
    ]),
    confirmSaveDemoConfig ({data}) {
      console.log('confirmSaveDemoConfig', data)
      // pop confirmation dialog
      this.$dialog.confirm({
        message: `Are you sure you want to save your demo configuration?`,
        onConfirm: async () => {
          // this.$toast.open('Save demo configuration confirmed')
          await this.saveDemoConfig({data})
          await this.loadDemoConfig(false)
        }
      })
    },
    isRecent (date) {
      try {
        // items are updated if updated property is less than 14 days old
        return moment().diff(moment(date), 'days') < 14
      } catch (e) {
        // if anything fails, use false
        return false
      }
    },
    async clickSave () {
      try {
        let data
        if (this.activeTab === 0) {
          // use Form model data
          data = JSON.parse(JSON.stringify(this.formModel)).configuration
        } else if (this.activeTab === 1) {
          // use Raw JSON string data
          data = JSON.parse(this.verticalDataString).configuration
        }
        // remove empty strings from the data, so that those values are not unset on server side
        for (const key of Object.keys(data)) {
          if (data[key] === '') {
            delete data[key]
          }
        }
        // confirm with user and save the data to the server
        this.confirmSaveDemoConfig({data})
      } catch (e) {
        // failed to save data
        console.log('failed to save vertical', e.message)
        this.errorNotification(`Failed to save vertical. Check JSON syntax.`)
      }
    },
    updateCache (data) {
      // copy state data to local data
      this.verticalDataString = JSON.stringify(data, null, 2)
    },
    async clickSaveVertical ({id, name}) {
      console.log('saving vertical as', id, '-', name)
      this.showModal = false
      try {
        let data
        if (this.activeTab === 0) {
          // use Form model
          data = JSON.parse(JSON.stringify(this.formModel))
        } else if (this.activeTab === 1) {
          // use Raw JSON string
          data = JSON.parse(this.verticalDataString)
        }
        // set id and name in the request data
        data.id = id
        data.name = name
        // confirm with user and save the data to the server
        await this.confirmSaveDemoConfig({id, data})
      } catch (e) {
        console.log('failed to save vertical', id, e)
        this.errorNotification(`Failed to save vertical ${id} - check JSON syntax. Error message: ${e.message}`)
      }
    }
  },

  computed: {
    ...mapGetters([
      'loading',
      'working',
      'defaults',
      'demoConfig',
      'sessionInfo'
    ]),
    disableSave () {
      return false
    },
    brandEditorLink () {
      return `https://dcloud-collab-toolbox-${this.sessionInfo.datacenter}.cisco.com/`
    },
    brandDemoLink () {
      return `https://mm-brand.cxdemo.net?session=${this.sessionInfo.id}&datacenter=${this.sessionInfo.datacenter}`
    }
  },

  mounted () {
    // if demo config is loaded, make sure to update the cache when we mount
    if (Object.keys(this.demoConfig).length) {
      this.updateCache(this.demoConfig)
    }
  },

  watch: {
    demoConfig (val, oldVal) {
      // demo configuration state changed
      // update the raw JSON string
      this.updateCache(val)
      // update the form with a copy of the template object
      this.formModel = JSON.parse(JSON.stringify(val))
    },
    activeTab (val, oldVal) {
      console.log('activeTab changed')
      if (val !== oldVal) {
        // editor tab changed, so sync the changes to the destination editor tab
        if (val === 0) {
          // switched to Form tab
          // sync the raw JSON to the form model
          this.formModel = JSON.parse(this.verticalDataString)
        } else if (val === 1) {
          // switched to Raw JSON tab
          // sync the form model to the raw JSON string
          this.updateCache(this.formModel)
        }
      }
    }
  }
}
</script>
