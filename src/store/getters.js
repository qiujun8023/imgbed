export default {
  config (state) {
    return state.configs[state.providerName]
  },
  getConfig (state) {
    return (providerName) => state.configs[providerName]
  },

  provider (state) {
    return state.providers[state.providerName]
  },
  getProvider (state) {
    return (providerName) => state.providers[providerName]
  },

  uploader (state, getters) {
    let { config, provider } = getters
    if (config && provider) {
      let args = provider.params.map((param) => {
        return getters.config[param.name]
      })
      return new (Function.prototype.bind.call(provider, null, ...args))()
    }
  }
}
