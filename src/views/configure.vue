<template>
  <div>
    <loading :active="showLoading" />
    
    <!-- <session-info />  -->

    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">
            Demo Session Configuration
          </h1>
          <div class="content">

            <p>
              Use this form to choose the branding to use when you open
              <a :href="brandDemoLink" target="brand">
                <strong>your demo website</strong>
              </a><span v-if="hasMultichannel">,
                as well as which multichannel system you want to demo</span>.
            </p>

            <p>
              Your settings are automatically saved when you change them.
            </p>

            <loading
            :active="['loading.app.verticals', 'working.app.verticals']"
            />
            
            <session-config
            v-if="model"
            v-model="model.configuration"
            :demo="model.demo"
            @load="clickLoadVerticals"
            @save="save"
            :verticals="verticals"
            :has-multichannel="hasMultichannel"
            :multichannel-options="multichannelOptions"
            />

          </div>

        </article>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SessionConfig from '../components/session-config.vue'
import SessionInfo from '../components/session-info.vue'
import moment from 'moment'

export default {
  name: 'Configure',

  components: {
    SessionConfig,
    SessionInfo
  },

  data () {
    return {
      model: null
    }
  },

  computed: {
    ...mapGetters([
      'loading',
      'working',
      'demoBaseConfig',
      'sessionConfig',
      'sessionInfo',
      'verticals',
      'hasMultichannel',
      'multichannelOptions'
    ]),
    showLoading () {
      const a = [
        'loading.vertical.list',
        'loading.demo.baseConfig',
        'loading.session.config',
        'loading.session.info',
        'working.session.config'
      ]
      try {
        if (this.model.configuration.vertical) {
          a.push('loading.vertical.' + this.model.configuration.vertical)
        }
      } catch (e) {
        // continue
      }
      return a
    },
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

  async mounted () {
    // if demo config is loaded, make sure to update the cache when we mount
    if (Object.keys(this.sessionConfig).length) {
      this.updateCache()
    }
  },

  watch: {
    sessionConfig (val, oldVal) {
      this.updateCache()
    }
  },

  methods: {
    ...mapActions([
      'loadSessionConfig',
      'errorNotification',
      'saveDemoConfig',
      'listVerticals'
    ]),
    saveOnServer () {
      this.saveDemoConfig(this.model.configuration)
    },
    save () {
      // if demo doesn't use CVA feature
      if (
        !Array.isArray(this.demoBaseConfig.features) ||
        !this.demoBaseConfig.features.includes('cva')
      ) {
        // save
        this.saveOnServer()
        return
      }

      // if user did not change the vertical ID
      if (this.model.configuration.vertical === this.sessionConfig.vertical) {
        // save
        this.saveOnServer()
        return
      }

      // find full vertical details for user-selected vertical
      const vertical = this.verticals.find(v => v.id === this.model.configuration.vertical)
      
      // if new vertical doesn't use CVA feature or uses standard CVA
      if (
        !vertical.gcpProjectId ||
        vertical.gcpProjectId === 'cumulus-v2-hotikl'
      ) {
        // save
        this.saveOnServer()
        return
      }

      // else new vertical uses custom CVA
      // prompt user for the private key ID
      this.$buefy.dialog.prompt({
        title: 'Enter Private Key ID',
        message: 'Please enter the Private Key ID to use the CVA features for this branding. You can find it in the JSON file or on your Google console Service Accounts page.',
        type: 'is-success',
        confirmText: 'Submit',
        rounded: true,
        onConfirm: (privateKeyId) => {
          // store privateKeyId in the config data. server will use it but
          // not write it to the config data.
          this.$set(this.model.configuration, 'privateKeyId', privateKeyId)
          // save
          this.saveOnServer()
        },
        onCancel: () => {
          // save without CVA?
          this.saveOnServer()
        }
      })
    },
    clickLoadVerticals (owner) {
      this.listVerticals(owner)
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
    updateCache () {
      // copy state data to local data
      this.model = JSON.parse(JSON.stringify(this.sessionConfig))
    }
  }
}
</script>
