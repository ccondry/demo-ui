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
        <b-field label="Session ID">
          <b-input v-model="model.id" disabled />
        </b-field>
        <b-field label="Datacenter">
          <b-input v-model="model.datacenter" disabled />
        </b-field>
      </div>
    </b-collapse>
    <!-- /Basic Information -->

    <!-- IVR Menu -->
    <b-collapse class="content card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">IVR Menu</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content" v-if="!model.cvp">
        <button class="button is-primary" @click="$set(model, 'cvp', JSON.parse(JSON.stringify(defaults.cvp)))">Configure</button>
      </div>
      <div class="card-content" v-else>

        <b-field label="Welcome Prompt">
          <b-input v-model="model.cvp.welcomePrompt" :placeholder="defaults.cvp.welcomePrompt" />
        </b-field>
        <!-- Main and Second Menu -->
        <b-collapse class="content card" v-for="(menu, i) of ['mainMenu', 'secondMenu']" :key="menu">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">{{ menu === 'mainMenu' ? 'Main Menu' : 'Second Menu' }}</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content">

            <b-field label="TTS">
              <b-input v-model="model.cvp[menu].tts" :placeholder="defaults.cvp[menu].tts" />
            </b-field>

            <b-collapse class="content card" v-for="(option, j) of model.cvp[menu].options" :key="menu + j">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">Option {{ j + 1 }}</p>
                <!-- <p class="card-header-title">{{ option.name }}</p> -->
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
                </a>
              </div>
              <div class="card-content">

                <b-field grouped>
                  <b-field label="ASR Keyword">
                    <b-input v-model="option.name" :placeholder="defaults.cvp[menu].options[j].name" />
                  </b-field>
                  <b-field label="Finesse Reason Call Variable" expanded>
                    <b-input v-model="option.description" :placeholder="defaults.cvp[menu].options[j].description" />
                  </b-field>
                </b-field>

              </div>
            </b-collapse>

          </div>
        </b-collapse>
        <!-- /Main and SecondMenu -->

        <!-- Jacada -->
        <b-collapse class="content card" v-if="user.admin">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">Jacada</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
            </a>
          </div>
          <div class="card-content" v-if="!model.cvp.jacadaMenu || !model.cvp.jacadaMenu.interactionId || !model.cvp.jacadaMenu.applicationKey">
            <button class="button is-primary" @click="$set(model.cvp, 'jacadaMenu', defaults.cvp.jacadaMenu)">Configure</button>
          </div>
          <div class="card-content" v-else>

            <b-field label="interactionId">
              <b-input v-model="model.cvp.jacadaMenu.interactionId" :placeholder="defaults.cvp.jacadaMenu.interactionId" />
            </b-field>
            <b-field label="applicationKey" expanded>
              <b-input v-model="model.cvp.jacadaMenu.applicationKey" :placeholder="defaults.cvp.jacadaMenu.applicationKey" />
            </b-field>

          </div>
        </b-collapse>
        <!-- /Jacada -->

      </div>
    </b-collapse>
    <!-- /IVR Menu -->

    <select-icon-modal
    v-if="showIconModal"
    :visible="showIconModal"
    :context="iconModalContext"
    title="Select Icon"
    @close="showIconModal = false"
    @submit="selectIcon">
    </select-icon-modal>

    <input type="file" style="display:none" ref="file" accept="image/*" v-uploader />

  </div>
</template>

<script>
import moment from 'moment'
import SelectIconModal from './modals/select-icon'
import Vue from 'vue'

// const TtsTypeSelector = Vue.component('TtsTypeSelector', {
//   props: ['field', 'types'],
//   computed: {
//     tooltip () {
//       try {
//         return this.types[this.field.ttstype].tooltip
//       } catch (e) {
//         return ''
//       }
//     }
//   }
// })

const ttsTypes = [
  {
    value: 'address',
    name: 'Address',
    tooltip: 'Interpret a value as part of street address.'
  },
  {
    value: 'characters',
    name: 'Characters',
    tooltip: 'Spell out each letter.'
  },
  {
    value: 'creditcard',
    name: 'Credit Card',
    tooltip: 'Interpret a value as a credit card number.'
  },
  {
    value: 'currency',
    name: 'Currency ($)',
    tooltip: 'Interpret a value as an amount of currency.'
  },
  {
    value: 'date',
    name: 'Date',
    tooltip: 'Interpret the value as a date. Specify the format with the format attribute.'
  },
  {
    value: 'digits',
    name: 'Digits',
    tooltip: 'Spell each digit separately.'
  },
  {
    value: 'number',
    name: 'Number',
    tooltip: 'Interpret the value as a cardinal number (1, 37, 2000, etc.).'
  },
  {
    value: 'ordinal',
    name: 'Ordinal',
    tooltip: 'Interpret the value as an ordinal number (1st, 2nd, 3rd, etc.).'
  },
  {
    value: 'telephone',
    name: 'Telephone',
    tooltip: 'Interpret a value as a 7-digit or 10-digit telephone number. This can also handle extensions (for example, 2025551212x345).'
  },
  {
    value: 'text',
    name: 'Text',
    tooltip: 'Interpret as normal text (attempt to pronounce all words).'
  },
  {
    value: 'time',
    name: 'Time',
    tooltip: 'Interpret a value such as 1\'21" as duration in minutes and seconds.'
  },
  // {
  //   value: 'fraction',
  //   name: 'Fraction',
  //   tooltip: 'Interpret the value as a fraction. This works for both common fractions (such as 3/20) and mixed fractions (such as 1+1/2).'
  // },
  {
    value: 'unit',
    name: 'Unit',
    tooltip: 'Interpret a value as a measurement. The value should be either a number or fraction followed by a unit (with no space in between) or just a unit.'
  }
  // {
  //   value: 'interjection',
  //   name: 'Interjection',
  //   tooltip: 'Interpret the value as an interjection. Alexa speaks the text in a more expressive voice. For optimal results, only use the supported interjections and surround each speechcon with a pause. For example: <say-as interpret-as="interjection">Wow.</say-as>. Speechcons are supported for the languages listed below.'
  // },
  // {
  //   value: 'expletive',
  //   name: 'Expletive',
  //   tooltip: '"Bleep" out the content inside the tag.'
  // }
]

const tooltips = {
  logo: 'The logo image is used for both the website and the mobile app.',
  logoUpload: 'We recommend using an image that has a 4:1 aspect ratio (i.e. 1000 x 250 pixels).',
  mobileWallpaperUpload: 'Note: the mobile wallpaper image will have a light blue filter applied by the mobile app. We recommend using an image that is at least 1242 x 2208 pixels.'
}

const Datepick = Vue.component('Datepick', {
  props: ['field'],
  data () {
    return {
      model: this.getDateValue()
    }
  },
  methods: {
    input (data) {
      // date picker chose a date, so update the field
      this.field.value = this.dateFormatter(data)
    },
    getDateValue () {
      // get a Date object for the current field value
      return new Date(moment(this.field.value).toDate())
    },
    dateParser (date) {
      // return new Date(Date.parse(date))
      const parsedDate = new Date(moment(date).format('MMM DD, YYYY HH:MM'))
      console.log('parsedDate', parsedDate)
      return parsedDate
    },
    dateFormatter (date) {
      // return date.toLocaleDateString()
      return moment(date).format('DD MMM YYYY')
    }
  }
})

export default {
  components: {
    SelectIconModal,
    Datepick
    // TtsTypeSelector
  },

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
    'user': {
      type: Object
    },
    'defaults': {
      type: Object,
      default () { return {} }
    }
  },

  directives: {
    uploader: {
      bind (el, binding, vnode) {
        el.addEventListener('change', e => {
          // validate that a file was selected
          if (!e.target.files || !e.target.files[0]) {
            return
          }
          // console.log('change uploader with ref', vnode.data.ref, e.target.files)
          console.log('change uploader with ref', vnode.context.uploadRef, vnode.context.uploadIndex, e.target.files)
          // vnode.context.uploadFile(vnode.data.ref, e.target.files[0])
          vnode.context.uploadFile(vnode.context.uploadRef, vnode.context.uploadIndex, e.target.files[0])
          // vnode.context.chosenFiles = e.target.files
        })
      }
    }
  },

  data () {
    return {
      showIconModal: false,
      iconModalContext: {},
      active: {},
      ttsTypes,
      tooltips,
      files: [],
      images: [],
      uploadRef: null,
      uploadIndex: null
    }
  },

  methods: {
    launchFilePicker (ref, index) {
      console.log('launching file picker for', ref, index)
      // set ref
      this.uploadRef = ref
      // set index
      this.uploadIndex = index
      // launch native file picker
      this.$refs.file.click()
    },
    uploadFile (node, index, file) {
      console.log('vertical-config.vue - uploading file', node, index, file)
      // init file reader
      const reader = new window.FileReader()
      reader.onload = (e) => {
        const data = e.currentTarget.result
        const name = file.name.substring(0, file.name.lastIndexOf('.'))
        // set up callback for when the file is done uploading
        const callback = (url) => {
          // map out the node names to model data references
          const map = {
            'logoFile': (url) => { this.model.logo.rasterised = url },
            'mobileWallpaper': (url) => { this.model.mobileWallpaper = url },
            'slider': (url, index) => { this.model.sliders[index].image = url },
            'blogItem': (url, index) => { this.model.blogItems[index].image = url },
            'authors': (url, index) => { this.model.authors[index].image = url },
            'services': (url, index) => { this.model.services[index].image = url },
            'servicesThumbnail': (url, index) => { this.model.services[index].thumbnail = url },
            'timelinePosts': (url, index) => { this.model.timelinePosts[index].image = url }
          }
          // update our model with the new file URL
          try {
            map[node](url, index)
          } catch (e) {
            // continue
          }
        }
        // determine node name - if node has index, suffix node name with it
        let nodeName = node
        if (index) {
          nodeName += index
        }
        // actually upload the file now
        this.$emit('upload', {name, node: nodeName, vertical: this.model.id, data, callback})
        // reset the file input
        this.$refs.file.value = ''
      }
      // read the file data
      reader.readAsDataURL(file)
    },
    getTooltip (type) {
      try {
        return this.tooltips[type]
      } catch (e) {
        return ''
      }
    },
    getTtsTooltip (type) {
      try {
        return this.ttsTypes.find(v => v.value === type).tooltip
      } catch (e) {
        return ''
      }
    },
    selectIcon ({icon, context}) {
      console.log('selectIcon', icon)
      // close modal
      this.showIconModal = false
      // set value
      context.mobileOption.icon = icon
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
      // console.log('branding config form model changed', val)
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
