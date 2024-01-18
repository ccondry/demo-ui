<template>
  <!-- Vertical Selection -->
  <Message title="Branding Selection">
    <div class="block" style="position: relative;">
      <Loading :active="['loading.vertical.list']" />

      <!-- load verticals owned by username -->
      <Field label="Load brandings owned by this username:" grouped>
        <Input
        v-model="owner"
        @keyup.enter.native="clickLoad"
        />
        <Button
        type="is-primary"
        rounded
        @click="clickLoad"
        :disabled="owner.length === 0 || loading.vertical.list"
        >
          {{ loading.vertical.list ? 'Working...' : 'Load User Brandings' }}
        </Button>
      </Field>

      <!-- choose vertical selection -->
      <Field :label="`Choose your demo branding (${sortedVerticals.length} options):`">
        <Select v-model="model">
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
        </Select>
      </Field>

      <!-- save button -->
      <div class="buttons">
        <Button
        rounded
        type="is-success"
        @click="clickSave"
        :disabled="busy"
        >
          {{ busy ? 'Working...' : 'Save' }}
        </Button>
      </div>
    </div>
  </Message>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'SelectVertical',

  props: {
    busy: {
      type: Boolean,
      default: false
    },
    modelValue: {
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

  emits: [
    'update:modelValue',
    'load',
    'save'
  ],

  data () {
    return {
      owner: ''
    }
  },

  computed: {
    ...mapGetters([
      'loading'
    ]),
    model: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    },
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
        // return v.owner && (v.id === this.modelValue || v.owner === this.owner)
        return this.systemVerticals.findIndex(x => x.id === v.id) < 0
      })
    }
  },

  methods: {
    clickLoad () {
      this.$emit('load', this.owner)
    },
    clickSave () {
      this.$emit('save')
    },
    setDefaults () {
      // if this is a PCCE demo and multichannel is not set yet
      try {
        if (this.model.demo === 'pcce' && !this.model.configuration.multichannel) {
          // set a default multichannel option so the user doesn't have to click 'Configure' button
          this.model.configuration['multichannel'] = 'ece'
        }
      } catch (e) {
        // do nothing if fail
      }
    }
  }
}
</script>
