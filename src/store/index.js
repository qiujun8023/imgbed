import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/store/state'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import plugins from '@/store/plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins
})
