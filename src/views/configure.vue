<template>
  <div>
    <Loading :active="showLoading" />
    
    <!-- <session-info />  -->

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

        <Loading
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SessionConfig from '../components/session-config.vue'
import SessionInfo from '../components/session-info.vue'

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
      'multichannels',
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
      console.log('click save')
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
      // TODO implement dialog. use new html standard modal?
      // this.$buefy.dialog.prompt({
      //   title: 'Enter Private Key ID',
      //   message: 'Please enter the Private Key ID to use the CVA features for this branding. You can find it in the JSON file or on your Google console Service Accounts page.',
      //   type: 'is-success',
      //   confirmText: 'Submit',
      //   rounded: true,
      //   onConfirm: (privateKeyId) => {
      //     // store privateKeyId in the config data. server will use it but
      //     // not write it to the config data.
      //     this.$set(this.model.configuration, 'privateKeyId', privateKeyId)
      //     // save
      //     this.saveOnServer()
      //   },
      //   onCancel: () => {
      //     // cancel save
      //     return
      //   }
      // })
    },
    clickLoadVerticals (owner) {
      this.listVerticals(owner)
    },
    isRecent (date) {
      return false
    },
    updateCache () {
      // copy state data to local data
      this.model = JSON.parse(JSON.stringify(this.sessionConfig))
    }
  }
}
</script>
