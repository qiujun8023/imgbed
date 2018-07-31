import Vue from 'vue'
import * as mutationTypes from '@/store/mutation-types'

export default {
  [mutationTypes.SET_PROVIDER_NAME] (state, providerName) {
    state.providerName = providerName
  },

  [mutationTypes.SET_CONFIGS] (state, configs) {
    state.configs = configs
  },

  [mutationTypes.SET_UPLOADED] (state, uploaded) {
    state.uploaded = uploaded
  },

  [mutationTypes.UPLOAD_PROGRESS] (state, file) {
    console.log(JSON.stringify(state.progress))
    Vue.set(state.progress, file.uuid, file)
  },

  [mutationTypes.UPLOAD_SUCCESS] (state, file) {
    state.uploaded.unshift(file)
    Vue.delete(state.progress, file.uuid)
  },

  [mutationTypes.UPLOAD_ERROR] (state, file) {
    Vue.delete(state.progress, file.uuid)
  }
}
