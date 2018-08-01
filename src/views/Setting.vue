<template>
  <div class="setting">
    <setting-cop/>
  </div>
</template>

<script>
import _ from 'lodash'
import { SET_PROVIDER_NAME, SET_CONFIGS } from '@/store/mutation-types'
import SettingCop from '@/components/Setting'

export default {
  name: 'setting',

  components: {
    SettingCop
  },

  data () {
    return {
      form: {
        provider: null
      }
    }
  },

  computed: {
    providersForm () {
      return _.reduce(this.$store.state.providers, (res, val, key) => {
        res.push({
          value: key,
          label: val.title
        })
        return res
      }, [])
    },

    provider () {
      return this.$store.getters.getProvider(this.form.provider)
    },
    rules () {
      return {
        provider: [
          { required: true, message: '请选择服务商', trigger: 'blur' }
        ],
        ...(this.provider && this.provider.rules) || {}
      }
    },
    params () {
      return (this.provider && this.provider.params) || []
    },

    visible () {
      return !this.$store.getters.uploader
    }
  },

  created () {
    if (this.providersForm.length === 1) {
      this.form.provider = this.providersForm[0].value
      this.onProviderChange()
    }
  },

  methods: {
    onProviderChange () {
      let config = this.$store.getters.getConfig(this.form.provider) || {}
      for (let param of this.params) {
        this.form[param.name] = this.form[param.name] || config[param.name] || ''
      }
    },

    save () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.$store.commit(SET_PROVIDER_NAME, this.form.provider)
        this.$store.commit(SET_CONFIGS, {
          ...this.$store.state.configs,
          [this.form.provider]: this.form
        })
      })
    }
  }
}
</script>
