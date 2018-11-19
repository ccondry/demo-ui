<template>
  <div>
    <!-- Loading Indicator -->
    <b-loading :is-full-page="false" :active="loading.session.config || working.session.config" :can-cancel="false"></b-loading>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">
            Demo Session Configuration
            <!-- 'updated' tag -->
            <b-tag v-if="isRecent('2018-10-24')" type="is-primary">Updated</b-tag>
          </h1>
          <div class="block">
            <button type="button" class="button is-success" @click.prevent="clickSave" :disabled="disableSave">Save</button>
          </div>

          <b-tabs v-model="activeTab">
            <b-tab-item label="Form">
              <b-loading :is-full-page="false" :active="loading.app.verticals || working.app.verticals" :can-cancel="false"></b-loading>
              <vertical-config
              :model.sync="formModel"
              @save="clickSave"
              @upload="upload"
              :working="working"
              :loading="loading"
              :defaults="defaults.verticals"
              :user="user"
              ></vertical-config>
            </b-tab-item>

            <b-tab-item label="Raw JSON">
              <textarea class="input is-12" v-model="verticalDataString" style="min-height: 25em;"></textarea>
            </b-tab-item>
          </b-tabs>

        </article>
      </div>
    </div>

    <save-template-modal
    ref="modal"
    :visible="showModal"
    title="Save Vertical As..."
    @close="showModal = false"
    @submit="clickSaveVertical"></save-template-modal>


  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VerticalConfig from '../../components/vertical-config.vue'
import SaveTemplateModal from '../../components/modals/save-template.vue'
import moment from 'moment'

export default {
  components: {
    VerticalConfig,
    SaveTemplateModal
  },
  data () {
    return {
      activeTab: 0,
      verticalDataString: '',
      selectedTemplate: '',
      showModal: false,
      formModel: {},
      ownerFilter: '',
      // selectedOwner: null,
      verticalFilter: 'all'
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    ...mapActions([
      'loadDemoConfig',
      'errorNotification',
      'saveVertical',
      'uploadImage'
    ]),
    confirmSaveVertical ({id, data}) {
      console.log('confirmSaveVertical', id, data)
      // pop confirmation dialog
      this.$dialog.confirm({
        message: `Are you sure you want to save vertical ${data.name} (${id})?`,
        onConfirm: async () => {
          this.$toast.open('Save vertical confirmed')
          await this.saveVertical({id, data})
          // update verticals data in state with current server data
          await this.loadDemoConfig(false)
          // make sure the the new vertical is the selected one
          this.selectedTemplate = id
          // load the selected vertical - so that after Save As, the vertical ID
          // will be correctly displayed
          this.clickLoadTemplate()
        }
      })
    },
    upload (data) {
      console.log('Home.vue - upload vertical image', data)
      this.uploadImage({data})
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
    refresh () {
      // load demo session configuration
      this.loadDemoConfig(false)
    },
    async clickSave () {
      const id = this.selectedTemplate
      console.log('click save vertical', id)
      try {
        let data
        if (this.activeTab === 0) {
          // use Form model
          data = JSON.parse(JSON.stringify(this.formModel))
        } else if (this.activeTab === 1) {
          // use Raw JSON string
          data = JSON.parse(this.verticalDataString)
        }
        // confirm with user and save the data to the server
        this.confirmSaveVertical({id, data})
      } catch (e) {
        // failed to save data
        console.log('failed to save vertical', e.message)
        this.errorNotification(`Failed to save vertical. Check JSON syntax.`)
      }
    },
    clickSaveAs () {
      console.log('saving vertical as...')
      this.showModal = true
    },
    updateCache (data) {
      // copy state data to local data
      this.verticalDataString = JSON.stringify(data, null, 2)
    },
    clickLoadTemplate () {
      // user clicked button to load a template into their user branding config
      console.log('loading vertical', this.selectedTemplate)
      // update the raw JSON string
      this.updateCache(this.selectedTemplateObject)
      // update the form with a copy of the template object
      this.formModel = JSON.parse(JSON.stringify(this.selectedTemplateObject))
      // remove database _id
      delete this.formModel._id
    },
    async clickSaveVertical ({id, name}) {
      console.log('saving vertical as', id, '-', name)
      this.showModal = false
      try {
        let data
        if (this.activeTab === 0) {
          // use Form model
          data = JSON.parse(JSON.stringify(this.formModel))
        } else if (this.activeTab === 1) {
          // use Raw JSON string
          data = JSON.parse(this.verticalDataString)
        }
        // set id and name in the request data
        data.id = id
        data.name = name
        // confirm with user and save the data to the server
        await this.confirmSaveVertical({id, data})
      } catch (e) {
        console.log('failed to save vertical', id, e)
        this.errorNotification(`Failed to save vertical ${id} - check JSON syntax. Error message: ${e.message}`)
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'verticals',
      'loading',
      'working',
      'defaults',
      'demoConfig'
    ]),
    disableSave () {
      if (this.selectedTemplate && this.selectedTemplate.length && this.selectedTemplateObject) {
        // any template has been selected
        if (this.selectedTemplateObject.owner === this.user.username || this.user.admin) {
          // this user owns this template or is an admin
          return false
        } else {
          // this user doesn't have access to save over this template,
          // so disable the button
          return true
        }
      } else {
        // template selection still on placeholder option
        return true
      }
    },
    disableSaveAs () {
      return !Object.keys(this.formModel).length
    },
    selectedTemplateObject () {
      if (this.verticals && this.verticals.length && this.selectedTemplate.length) {
        return this.verticals.find(v => v.id === this.selectedTemplate)
      } else {
        return {}
      }
    }
  },

  watch: {
    configuration (val, oldVal) {
      // demo configuration state changed
      // update the raw JSON string
      this.updateCache(val)
      // update the form with a copy of the template object
      this.formModel = JSON.parse(JSON.stringify(val))
      // remove database _id
      delete this.formModel._id
    },
    activeTab (val, oldVal) {
      console.log('activeTab changed')
      if (val !== oldVal) {
        // editor tab changed, so sync the changes to the destination editor tab
        if (val === 0) {
          // switched to Form tab
          // sync the raw JSON to the form model
          this.formModel = JSON.parse(this.verticalDataString)
        } else if (val === 1) {
          // switched to Raw JSON tab
          // sync the form model to the raw JSON string
          this.updateCache(this.formModel)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
