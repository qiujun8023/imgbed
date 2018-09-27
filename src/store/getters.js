export default {
  config (state) {
    return state.configs[state.using]
  },
  getConfig (state) {
    return (configName) => state.configs[configName]
  },

  provider (state, getters) {
    let { config } = getters
    return config && state.providers[config.providerName]
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
