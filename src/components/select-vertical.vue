<template>
  <!-- Vertical Selection -->
  <b-message title="Branding Selection" :closable="false">
    <div class="block" style="position: relative;">
      <loading group="vertical" type="list" />
      <b-field label="Load brandings owned by this username:" grouped>
        <b-input
        v-model="owner"
        @keyup.enter.native="clickLoad"
        />
        <b-button
        type="is-primary"
        rounded
        @click="clickLoad"
        :disabled="owner.length === 0"
        >
          Load User Brandings
        </b-button>
      </b-field>
      <b-field :label="`Choose your demo branding (${sortedVerticals.length} options):`">
        <div class="select">
          <b-select
          :value="value"
          @input="selectVertical"
          >
            <option value="" disabled selected>
              Choose a branding to use
            </option>
            <option
            v-for="vertical in systemVerticals"
            :value="vertical.id"
            :key="vertical.id"
            >
              {{ `${vertical.name} (${vertical.id})` }}
            </option>
            <option
            disabled
            >
              --------------------------------
            </option>
            <option
            v-for="vertical in userVerticals"
            :value="vertical.id"
            :key="vertical.id"
            >
              {{ `${vertical.name} (${vertical.id})` }}
            </option>
          </b-select>
        </div>
      </b-field>

      <b-field>
        <b-button
        rounded
        type="is-success"
        @click="clickSave"
        >
          Save
        </b-button>
      </b-field>
    </div>
  </b-message>
</template>

<script>
export default {
  name: 'SelectVertical',

  props: {
    value: {
      type: String,
      default () { return '' }
    },
    verticals: {
      type: Array,
      deafult () {
        return []
      }
    }
  },

  data () {
    return {
      owner: ''
    }
  },

  computed: {
    sortedVerticals () {
      // make a mutable copy of the store data
      try {
        // case-insensitive sort by name
        return this.verticals.slice().sort((a, b) => {
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
      } catch (e) {
        console.log(`couldn't get sorted verticals`, e)
      }
    },
    systemVerticals () {
      return this.sortedVerticals.filter(v => {
        return !v.owner || v.owner === 'system' || v.owner === null
      })
    },
    userVerticals () {
      return this.sortedVerticals.filter(v => {
        // return v.owner && (v.id === this.value || v.owner === this.owner)
        return this.systemVerticals.findIndex(x => x.id === v.id) < 0
      })
    }
  },

  methods: {
    clickLoad () {
      this.$emit('load', this.owner)
    },
    selectVertical (e) {
      this.$emit('input', e)
    },
    clickSave () {
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
    }
  }
}
</script>
