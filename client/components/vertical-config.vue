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
        <button class="button is-primary" @click="$set(model, 'configuration', JSON.parse(JSON.stringify(defaults)))">Configure</button>
      </div>
      <div class="card-content" v-else>

        <!-- Vertical Configuration -->
        <b-collapse class="content card" v-if="model.demo === 'pcce'">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Vertical Configuration</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.configuration.vertical">
            <button class="button is-primary" @click="$set(model.configuration, 'vertical', defaults.vertical)">Configure</button>
          </div>
          <div class="card-content" v-else>
            <b-field label="Vertical">
              <b-select v-model="model.configuration.vertical">
                <option v-for="vertical of verticals" :value="vertical.id">{{ vertical.name }}</option>
              </b-select>
            </b-field>
          </div>
        </b-collapse>
        <!-- /Vertical Configuration -->

        <!-- Multichannel Configuration -->
        <b-collapse class="content card" v-if="model.demo === 'pcce'">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Multichannel Configuration</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.configuration.multichannel">
            <button class="button is-primary" @click="$set(model.configuration, 'multichannel', defaults.multichannel)">Configure</button>
          </div>
          <div class="card-content" v-else>
            <b-field label="Multichannel System">
              <b-select v-model="model.configuration.multichannel">
                <option value="ece">ECE</option>
                <option value="sfdc">SFDC</option>
                <option value="upstream">Upstream</option>
              </b-select>
            </b-field>
          </div>
        </b-collapse>
        <!-- /Multichannel Configuration -->

        <!-- Chat Bot Configuration -->
        <b-collapse class="content card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Chat Bot Configuration</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="chatBotConfigured">
            <button class="button is-primary" @click="configureChatBot">Configure</button>
          </div>
          <div class="card-content" v-else>

            <b-field label="Bot Enabled">
              <b-select v-model="model.configuration.chatBotEnabled">
                <option :value="true">Enabled</option>
                <option :value="false">Disabled</option>
              </b-select>
            </b-field>

            <b-field label="DialogFlow Client API Token">
              <b-autocomplete
              v-model="model.configuration.chatBotToken"
              :data="[defaults.chatBotToken]"
              :placeholder="defaults.chatBotToken" />
            </b-field>

            <b-field grouped>
              <b-field label="Language">
                <b-select v-model="model.configuration.language">
                  <option value="en">English</option>
                </b-select>
              </b-field>

              <b-field label="Region">
                <b-select v-model="model.configuration.region">
                  <option value="US">US</option>
                </b-select>
              </b-field>
            </b-field>

            <b-field label="Post-Chat Survey">
              <b-select v-model="model.configuration.chatBotSurveyEnabled">
                <option :value="true">Enabled</option>
                <option :value="false">Disabled</option>
              </b-select>
            </b-field>

          </div>
        </b-collapse>
        <!-- /Chat Bot Configuration -->

      </div>
    </b-collapse>
    <!-- /IVR Menu -->

  </div>
</template>

<script>
export default {
  props: {
    'model': {
      type: Object,
      default () { return {} }
    },
    'sessionInfo': {
      type: Object,
      default () { return {} }
    },
    'working': {
      type: Object
    },
    'loading': {
      type: Object
    },
    'defaults': {
      type: Object,
      default () { return {} }
    },
    'verticals': {
      type: Array,
      default () {
        return [
          {id: 'travel', name: 'Travel'},
          {id: 'city', name: 'City'},
          {id: 'finance', name: 'Finance'},
          {id: 'health', name: 'Health'},
          {id: 'utility', name: 'Utility'}
        ]
      }
    }
  },

  methods: {
    pushChanges (data) {
      this.$emit('update:data', JSON.stringify(data, null, 2))
    },
    submit () {
      console.log('vertical config form submitted')
      this.$emit('save', this.model)
    },
    configureChatBot () {
      this.$set(this.model.configuration, 'chatBotEnabled', this.defaults.chatBotEnabled)
      this.$set(this.model.configuration, 'chatBotToken', this.defaults.chatBotEnabled)
      this.$set(this.model.configuration, 'language', this.defaults.chatBotEnabled)
      this.$set(this.model.configuration, 'region', this.defaults.chatBotEnabled)
      this.$set(this.model.configuration, 'chatBotSurveyEnabled', this.defaults.chatBotEnabled)
    }
  },

  computed: {
    chatBotConfigured () {
      return this.model.configuration.chatBotEnabled === undefined &&
      this.model.configuration.chatBotToken === undefined &&
      this.model.configuration.language === undefined &&
      this.model.configuration.region === undefined &&
      this.model.configuration.chatBotSurveyEnabled === undefined
    }
  },

  watch: {
    model (val, oldVal) {
      // model changed - format and push those changes back to the parent
      this.pushChanges(val)
    }
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
