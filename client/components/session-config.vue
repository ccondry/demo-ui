<template>
  <div>
    <!-- Demo Configuration -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Demo Configuration</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content" v-if="!model.configuration">
        <b-button
        type="is-primary"
        rounded
        @click="$set(model, 'configuration', {vertical: 'travel'})"
        >
          Configure
        </b-button>
      </div>
      <div class="card-content" v-else>

        <!-- Vertical Configuration -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Vertical Selection</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.configuration.vertical">
            <b-button
            type="is-primary"
            rounded
            @click="$set(model.configuration, 'vertical', 'trave')"
            >
              Configure
            </b-button>
          </div>
          <div class="card-content" v-else>
            <div class="block">
              <b-field label="Log in to load your custom verticals">
                <b-button
                type="is-primary"
                rounded
                @click="clickLogin"
                >
                  Log In
                </b-button>
              </b-field>

              <b-field label="Choose your demo vertical">
                <div class="select">
                  <select class="input" v-model="model.configuration.vertical" @change="selectVertical">
                    <option value="" disabled selected>
                      Choose a vertical to use
                    </option>
                    <option
                    v-for="vertical in systemVerticals"
                    :value="vertical.id"
                    :key="vertical.id"
                    >
                      {{ `${vertical.name} (${vertical.id})` }}
                    </option>
                    <option disabled>-----------------------------------------</option>
                    <option
                    v-for="vertical in userVerticals"
                    :value="vertical.id"
                    :key="vertical.id"
                    v-if="verticalFilter === 'all'"
                    >
                      {{ `${vertical.name} (${vertical.id})` }}
                    </option>
                    <option
                    v-for="vertical in filteredSortedVerticals"
                    :value="vertical.id"
                    :key="vertical.id"
                    v-if="verticalFilter === 'other'"
                    >
                      {{ `${vertical.name} (${vertical.id})` }}
                    </option>
                  </select>
                </div>
              </b-field>
            </div>

          </div>
        </b-collapse>
        <!-- /Vertical Configuration -->

        <!-- Multichannel Configuration -->
        <b-collapse class="content card" v-if="hasMultichannel">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Multichannel Configuration</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.configuration.multichannel">
            <button class="button is-primary" @click="$set(model.configuration, 'multichannel', 'ece')">Configure</button>
          </div>
          <div class="card-content" v-else>
            <b-field label="Multichannel System">
              <b-select
              v-model="model.configuration.multichannel"
              @input="selectMultichannel"
              >
                <option
                v-for="channel of multichannelOptions"
                :key="channel"
                :value="channel"
                >
                  {{ channelNames[channel] || channel }}
                </option>
              </b-select>
            </b-field>
          </div>
        </b-collapse>
        <!-- /Multichannel Configuration -->

      </div>
    </b-collapse>
    <!-- /Demo Configuration -->

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Login from './modals/login'

export default {
  components: {
    Login
  },

  data () {
    return {
      ownerFilter: '',
      verticalFilter: 'other',
      channelNames: {
        ece: 'ECE',
        salesforce: 'Salesforce',
        servicenow: 'ServiceNow',
        upstream: 'Upstream Works',
        msdynamics: 'MS Dynamics',
        webex: 'Webex'
      }
    }
  },

  props: {
    'model': {
      type: Object,
      default () { return {} }
    }
  },

  methods: {
    ...mapActions([
      'login'
    ]),
    clickLogin () {
      this.$buefy.modal.open({
        parent: this,
        component: Login,
        hasModalCard: true,
        trapFocus: true,
        events: {
          login: (data) => {
            // log user in with username and password
            this.login(data)
          },
          sso: () => {
            // forward to SSO login page
            window.location = this.ciscoSsoUrl
          }
        }
      })
    },
    selectVertical (e) {
      this.$emit('save')
    },
    selectMultichannel (e) {
      this.$emit('save')
    },
    setDefaults () {
      // if this is a PCCE demo and multichannel is not set yet
      try {
        if (this.model.demo === 'pcce' && !this.model.configuration.multichannel) {
          // set a default multichannel option so the user doesn't have to click 'Configure' button
          this.$set(this.model.configuration, 'multichannel', 'ece')
        }
      } catch (e) {
        // do nothing if fail
      }
    },
    pushChanges (data) {
      this.$emit('update:data', JSON.stringify(data, null, 2))
    }
  },

  computed: {
    ...mapGetters([
      'sessionInfo',
      'working',
      'loading',
      'user',
      'verticals',
      'demoBaseConfig',
      'hasMultichannel',
      'multichannelOptions',
      'ciscoSsoUrl',
      'ciscoRedirectUri'
    ]),
    chatBotConfigured () {
      return this.model.configuration.chatBotEnabled === undefined &&
      this.model.configuration.chatBotToken === undefined &&
      this.model.configuration.language === undefined &&
      this.model.configuration.region === undefined &&
      this.model.configuration.chatBotSurveyEnabled === undefined
    },
    autocompleteOwners () {
      const allOwners = this.verticals.map(v => v.owner)
      const uniqueOwners = Array.from(new Set(allOwners))
      return uniqueOwners.filter((option) => {
        return option
        .toString()
        .toLowerCase()
        .indexOf(this.ownerFilter.toLowerCase()) >= 0
      })
    },
    sortedVerticals () {
      // make a mutable copy of the store data
      try {
        const copy = JSON.parse(JSON.stringify(this.verticals))
        // case-insensitive sort by name
        copy.sort((a, b) => {
          var nameA = a.name.toUpperCase() // ignore upper and lowercase
          var nameB = b.name.toUpperCase() // ignore upper and lowercase
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          // names must be equal
          return 0
        })
        return copy
      } catch (e) {
        console.log(`couldn't get sorted verticals`, e)
      }
    },
    systemVerticals () {
      return this.sortedVerticals.filter(v => !v.owner || v.owner === 'system' || v.owner === null)
    },
    userVerticals () {
      return this.sortedVerticals.filter(v => v.owner && v.owner !== 'system' && v.owner !== null)
    },
    filteredSortedVerticals () {
      // filter to only show the verticals owned by specified user
      return this.sortedVerticals.filter(v => v.owner === this.ownerFilter)
    }
  },

  watch: {
    model (val, oldVal) {
      // is this the first time mounting the config?
      if (val.configuration && !oldVal.configuration) {
        this.setDefaults()
      }
      // model changed - format and push those changes back to the parent
      this.pushChanges(val)
    }
  },

  mounted () {
    // when this component is mounted, set defaults
    // this.setDefaults()
  }

}
</script>

<style lang="scss">
.content .card-header .card-header-title {
  margin-bottom: 0;
}
.card-header-title, .card-header-icon {
  background-color: #f3f3f3;
}
</style>
