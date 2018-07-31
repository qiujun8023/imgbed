import * as mutationTypes from '@/store/mutation-types'
import * as storageTypes from '@/store/storage-types'

let localStoragePlugin = (store) => {
  store.commit(mutationTypes.SET_PROVIDER_NAME, localStorage.getItem(storageTypes.PROVIDER_NAME) || '')
  store.commit(mutationTypes.SET_CONFIGS, JSON.parse(localStorage.getItem(storageTypes.CONFIGS) || '{}'))
  store.commit(mutationTypes.SET_UPLOADED, JSON.parse(localStorage.getItem(storageTypes.UPLOADED) || '[]'))

  store.subscribe((mutation) => {
    switch (mutation.type) {
      case mutationTypes.SET_PROVIDER_NAME:
        localStorage.setItem(storageTypes.PROVIDER_NAME, store.state.providerName)
        break
      case mutationTypes.SET_CONFIGS:
        localStorage.setItem(storageTypes.CONFIGS, JSON.stringify(store.state.configs))
        break
      case mutationTypes.SET_UPLOADED:
      case mutationTypes.UPLOAD_SUCCESS:
        localStorage.setItem(storageTypes.UPLOADED, JSON.stringify(store.state.uploaded))
        break
    }
  })
}

export default [
  localStoragePlugin
]
