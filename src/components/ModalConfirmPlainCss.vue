
<template>
  <VueFinalModal
  class="confirm-modal"
  content-class="confirm-modal-content"
  overlay-transition="vfm-fade"
  content-transition="vfm-fade"
  >
    <h1>{{ title }}</h1>  
    <!-- <slot /> -->
    <Field label="Private Key ID">
      <Input v-model="privateKeyId" placeholder="" expanded />
    </Field>
    <div class="buttons" style="display: flex; justify-content: flex-end;">
      <!-- cancel -->
      <!-- <Button
      rounded
      type="is-default"
      @click="cancel"
      >
        Cancel
      </Button>
      &nbsp;
      &nbsp; -->
      <!-- confirm -->
      <Button
      rounded
      type="is-success"
      @click="confirm"
      :disabled="!privateKeyId"
      >
        Confirm
      </Button>
    </div>
  </VueFinalModal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'
import { getCurrentInstance } from 'vue'

export default {
  components: {
    VueFinalModal
  },

  props: {
    title: {
      type: String
    }
  },

  emits: ['confirm'],

  data () {
    // get handle to the vue emit function
    const { emit } = getCurrentInstance()
    return {
      privateKeyId: '',
      emit
    }
  },

  methods: {
    confirm () {
      this.emit('confirm', this.privateKeyId)
    }
  },
}
</script>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
}
.confirm-modal-content > * + *{
  margin: 0.5rem 0;
}
.confirm-modal-content h1 {
  font-size: 1.375rem;
}
/* .confirm-modal-content button {
  margin: 0.25rem 0 0 auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
} */
.dark .confirm-modal-content {
  background: #000;
}
</style>