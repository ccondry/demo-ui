<template>
  <div>
    <!-- <pre>{{ jwtUser }}</pre> -->
    <!-- Loading Indicator -->
    <b-loading :is-full-page="false" :active="loading.session.config || loading.session.info || working.session.config" :can-cancel="false"></b-loading>
    <b-notification type="is-danger" v-model="oauthError">
      Sorry, there was an error during OAUTH authorization:
      {{ oauthError }}
    </b-notification>
    
    <session-info />

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
              </a><span v-if="hasMultichannel">, as well as which multichannel system you want to demo</span>.
            </p>

            <p>
              Your settings are automatically saved when you change them.
            </p>

            <b-loading
            :is-full-page="false"
            :active="loading.app.verticals || working.app.verticals"
            :can-cancel="false"
            />
            
            <session-config
            :model.sync="formModel"
            @save="clickSave"
            />

          </div>

        </article>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SessionConfig from '../../components/session-config'
import SessionInfo from '../../components/session-info'
import moment from 'moment'

export default {

  components: {
    SessionConfig,
    SessionInfo
  },

  data () {
    return {
      verticalDataString: '',
      formModel: {}
    }
  },

  methods: {
    ...mapActions([
      'loadDemoConfig',
      'errorNotification',
      'saveDemoConfig',
      'ciscoOauth2Login'
    ]),
    async confirmSaveDemoConfig ({data}) {
      console.log('confirmSaveDemoConfig', data)
      await this.saveDemoConfig({data})
      await this.loadDemoConfig(false)
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
        // use Form model data
        data = JSON.parse(JSON.stringify(this.formModel)).configuration
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
      try {
        let data
        // use Form model
        data = JSON.parse(JSON.stringify(this.formModel))
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
      'demoConfig',
      'sessionInfo',
      'hasMultichannel',
      'oauthError',
      'jwtUser'
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

  async mounted () {
    // if demo config is loaded, make sure to update the cache when we mount
    if (Object.keys(this.demoConfig).length) {
      this.updateCache(this.demoConfig)
    }
    // check if SSO is in progress
    if (this.$route.query.code) {
      await this.ciscoOauth2Login(this.$route.query.code)
      // unset URL query
      // this.$route.query.code
      this.$router.push({query: {}}).catch(e => {})
    }
  },

  watch: {
    demoConfig (val, oldVal) {
      // demo configuration state changed
      // update the raw JSON string
      this.updateCache(val)
      // update the form with a copy of the template object
      this.formModel = JSON.parse(JSON.stringify(val))
    }
  }
}
</script>
