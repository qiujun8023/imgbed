import * as mutationTypes from '@/store/mutation-types'

export default {
  [mutationTypes.SET_USING] (state, using) {
    state.using = using
  },

  [mutationTypes.SET_CONFIGS] (state, configs) {
    state.configs = configs
  },

  [mutationTypes.SET_UPLOADED] (state, uploaded) {
    state.uploaded = uploaded
  },

  [mutationTypes.ADD_UPLOADED] (state, file) {
    state.uploaded.unshift(file)
  },

  [mutationTypes.REMOVE_UPLOADED] (state, index) {
    state.uploaded.splice(index, 1)
  }
}
