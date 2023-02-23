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
              Use this form to choose the Vertical to use when you open
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
            @input="save"
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
    save () {
      this.saveDemoConfig(this.model.configuration)
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
