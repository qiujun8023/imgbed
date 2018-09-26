<template>
  <el-form
    ref="form"
    class="setting-cop"
    :model="form"
    :rules="rules">

    <el-form-item
      label="服务商："
      :prop="'provider'">
      <el-select
        v-model="form.provider"
        placeholder="请选择服务商"
        @change="onProviderChange">
        <el-option
          :key="provider.value"
          :label="provider.label"
          :value="provider.value"
          v-for="provider in providersForm">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      :label="param.label"
      :key="index"
      :prop="param.name"
      v-for="(param, index) in params">
      <el-input
        v-model="form[param.name]"
        :type="param.type"
        :placeholder="param.placeholder">
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="save">保 存</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import _ from 'lodash'
import { SET_PROVIDER_NAME, SET_CONFIGS } from '@/store/mutation-types'

export default {
  name: 'setting-cop',

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
