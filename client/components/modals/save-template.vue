<template>
  <card-modal :visible="visible" @close="close" :title="title"
  transition="zoom" @ok="ok" @cancel="close"
  ok-text="Save"
  @keyup.native.esc="close">
    <div class="content has-text-centered">
      What ID and name (title) would you like to give to this new vertical?
    </div>
      <!-- <div class="block">
        <div class="control is-horizontal">
          <div class="control-label">
            <label class="label">Template Name</label>
          </div>
          <div class="">
            <input v-model="templateName">
          </div>
        </div>
      </div> -->

      <div class="block">
        <div class="control is-horizontal">
          <div class="control-label">
            <label class="label">ID</label>
          </div>
          <div class="control">
            <input type="text" autofocus v-model="templateId" @keyup.enter="ok">
          </div>
        </div>

        <div class="control is-horizontal">
          <div class="control-label">
            <label class="label">Name</label>
          </div>
          <div class="control">
            <input type="text" autofocus v-model="templateName" @keyup.enter="ok">
          </div>
        </div>
      </div>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal'

export default {
  components: {
    CardModal
  },

  props: {
    visible: Boolean,
    title: String
  },

  data () {
    return {
      templateName: '',
      templateId: ''
    }
  },

  methods: {
    ok () {
      this.$emit('submit', {id: this.templateId, name: this.templateName})
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
