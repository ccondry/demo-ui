<template>
  <div>
    <!-- Basic Information -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Basic Information</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content">
        <b-field label="Demo">
          <b-input v-model="model.demo" disabled />
        </b-field>
        <b-field label="Version">
          <b-input v-model="model.version" disabled />
        </b-field>
      </div>
    </b-collapse>
    <!-- /Basic Information -->

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

        <b-field label="Chat Bot Enabled">
          <b-select v-model="model.configuration.chatBotEnabled">
            <option :value="true">Enabled</option>
            <option :value="false">Disabled</option>
          </b-select>
        </b-field>

        <b-field label="Chat Bot Token">
          <b-autocomplete
            v-model="model.configuration.chatBotToken"
            :data="[defaults.chatBotToken]"
            :placeholder="defaults.chatBotToken">
          </b-autocomplete>
        </b-field>

        <b-field label="Chat Bot Language">
          <b-select v-model="model.configuration.language">
            <option value="en">English</option>
          </b-select>
        </b-field>

        <b-field label="Chat Bot Region">
          <b-select v-model="model.configuration.region">
            <option value="US">US</option>
          </b-select>
        </b-field>

        <b-field label="Chat Bot Survey">
          <b-select v-model="model.configuration.chatBotSurveyEnabled">
            <option :value="true">Enabled</option>
            <option :value="false">Disabled</option>
          </b-select>
        </b-field>

        <b-field label="Multichannel">
          <b-select v-model="model.configuration.multichannel">
            <option value="ece">ECE</option>
            <option value="sfdc">SFDC</option>
            <option value="upstream">Upstream</option>
          </b-select>
        </b-field>

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
    'working': {
      type: Object
    },
    'loading': {
      type: Object
    },
    'defaults': {
      type: Object,
      default () { return {} }
    }
  },

  methods: {
    pushChanges (data) {
      this.$emit('update:data', JSON.stringify(data, null, 2))
    },
    submit () {
      console.log('vertical config form submitted')
      this.$emit('save', this.model)
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
