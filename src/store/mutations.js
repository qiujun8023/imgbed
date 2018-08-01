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

  [mutationTypes.ADD_UPLOAD] (state, file) {
    state.uploaded.unshift(file)
  },

  [mutationTypes.REMOVE_UPLOAD] (state, index) {
    state.uploaded.splice(index, 1)
  }
}
