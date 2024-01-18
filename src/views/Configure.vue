<template>
  <div>
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

        <Loading :active="showLoading" />

        <session-config
        v-if="model"
        v-model="model.configuration"
        :demo="model.demo"
        @load="clickLoadVerticals"
        @save="save"
        :verticals="verticals"
        :has-multichannel="hasMultichannel"
        :multichannel-options="multichannelOptions"
        :busy="isBusy"
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
    isBusy () {
      return this.working.session.config || this.loading.session.config
    },
    showLoading () {
      const a = [
        'loading.demo.baseConfig',
        'loading.session.config',
        'loading.session.info',
        'working.session.config',
      ]
      // 'loading.vertical.list',
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
    },
    hasCva () {
      try {
        return this.demoBaseConfig.features.includes('cva')
      } catch (e) {
        return false
      }
    },
    isVerticalChanged () {
      try {
        return this.model.configuration.vertical !== this.sessionConfig.vertical
      } catch (e) {
        return false
      }
    },
    isDefaultGcp () {
      return !vertical.gcpProjectId ||
        vertical.gcpProjectId === 'cumulus-v2-hotikl'
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
      return this.saveOnServer()
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
