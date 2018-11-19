<template>
  <div>
    <!-- Loading Indicator -->
    <b-loading :is-full-page="false" :active="loading.app.user || working.app.user" :can-cancel="false"></b-loading>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Information</h1>
          <p>
            View and edit your Cumulus demo verticals for the Cumulus mobile app and website.
          </p>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">Existing Verticals</h1>
          <div class="block">
            <div class="wysiwyg">
              <p>
                Use this form to load an existing vertical config into the panel
                below.
              </p>
            </div>
          </div>
          <div class="block">
            <div class="field">
              <div class="field">
                <b-radio v-model="verticalFilter"
                native-value="all">Show all verticals</b-radio>
              </div>
              <div class="field">
                <b-radio v-model="verticalFilter"
                native-value="mine">Show only my verticals</b-radio>
              </div>
              <div class="field">
                <b-radio v-model="verticalFilter"
                native-value="other">
                Show only this user's verticals:
                <b-autocomplete
                  v-model="ownerFilter"
                  :data="autocompleteOwners"
                  :placeholder="user.username">
                  <template slot="empty">No results found</template>
                </b-autocomplete>
              </b-radio>
              </div>
              <!-- <b-field>
                <b-checkbox v-model="showOnlyMyVerticals">Show only my verticals</b-checkbox>
              </b-field> -->
              <!-- <b-checkbox v-model="filterTemplates">Show only this user's verticals:</b-checkbox> -->
              <b-field grouped>
                <!-- <b-input v-model="ownerFilter" /> -->

              </b-field>
            </div>
            <div class="select">
              <select class="input" v-model="selectedTemplate">
                <option value="" disabled selected>Choose a vertical to load</option>
                <option v-for="vertical in systemVerticals" :value="vertical.id">{{ `${vertical.name} (${vertical.id})` }}</option>
                <option disabled>-----------------------------------------</option>
                <option v-for="vertical in userVerticals" :value="vertical.id" v-if="verticalFilter === 'all'">{{ `${vertical.name} (${vertical.id})` }}</option>
                <option v-for="vertical in myVerticals" :value="vertical.id" v-if="verticalFilter === 'mine'">{{ `${vertical.name} (${vertical.id})` }}</option>
                <option v-for="vertical in filteredSortedVerticals" :value="vertical.id" v-if="verticalFilter === 'other'">{{ `${vertical.name} (${vertical.id})` }}</option>
              </select>
            </div>
          </div>
          <div class="block">
            <button type="button" class="button is-primary"
            @click.prevent="clickLoadTemplate"
            :disabled="!selectedTemplate">Load</button>
            <!-- <button type="button" class="button is-success"
            @click.prevent="clickSaveVertical(selectedTemplate)"
            :disabled="disableSaveTemplate">Save</button> -->
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h1 class="title">
            Vertical Config
            <!-- 'updated' tag -->
            <b-tag v-if="isRecent('2018-10-24')" type="is-primary">Updated</b-tag>
          </h1>
          <div class="block wysiwyg">
            <p>
              You can update your verticals by using the save button
              on this panel. You will not be able to save over other users'
              verticals.
            </p>
            <p>
              You can create new verticals by loading an existing vertical and
              then using the 'Save As' button. Choose a new unique vertical ID to
              save a new vertical. If you Save As using with an existing vertical
              ID, it will be replace the existing one (if you own it).
            </p>
          </div>
          <div class="block">
            <button type="button" class="button is-success" @click.prevent="clickSave" :disabled="disableSave">Save</button>
            <button type="button" class="button is-success" @click.prevent="clickSaveAs" :disabled="disableSaveAs">Save As</button>
            <!-- <button type="button" class="button is-info" @click.prevent="refresh">Reload</button> -->
          </div>
          <!-- Only offer raw JSON to admins -->
          <b-tabs v-model="activeTab" v-if="user.admin">
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

          <vertical-config
          v-if="!user.admin"
          :model.sync="formModel"
          @save="clickSave"
          @upload="upload"
          :working="working"
          :loading="loading"
          :defaults="defaults.verticals"
          :user="user"
          ></vertical-config>

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
      filterTemplates: false,
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
      'loadVerticals',
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
          await this.loadVerticals(false)
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
      // load verticals
      this.loadVerticals(false)
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
      'defaults'
    ]),
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
    myVerticals () {
      return this.sortedVerticals.filter(v => v.owner === this.user.username)
    },
    filteredSortedVerticals () {
      // filter to only show the verticals owned by specified user
      return this.sortedVerticals.filter(v => v.owner === this.ownerFilter)
    },
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
    },
    filterTemplates (val, oldVal) {
      // console.log('filter template selected', this.selectedTemplate)
      // did the user check the filter verticals option?
      if (val === true) {
        if (this.selectedTemplate === undefined || !this.filteredSortedVerticals.find(v => v.id === this.selectedTemplate)) {
          // console.log('template selected is no longer in list', this.selectedTemplate)
          this.selectedTemplate = this.filteredSortedVerticals[0].id
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
