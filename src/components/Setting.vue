<template>
  <el-form
    ref="form"
    class="setting-cop"
    :model="form"
    :rules="rules">

    <el-form-item
      label="服务商："
      :prop="'providerName'">
      <el-select
        v-model="form.providerName"
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
        :type="param.type"
        :placeholder="param.placeholder"
        v-model="form[param.name]"
        v-if="param.component == 'input'">
      </el-input>

      <el-select
        :placeholder="param.placeholder"
        v-model="form[param.name]"
        v-if="param.component == 'select'">
        <el-option
          v-for="option in param.options"
          :key="option.value"
          :label="option.label"
          :value="option.value">
        </el-option>
      </el-select>

    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="save">保 存</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import _ from 'lodash'
import { SET_USING, SET_CONFIGS } from '@/store/mutation-types'

export default {
  name: 'setting-cop',

  data () {
    return {
      form: {
        providerName: null
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
      return this.$store.getters.getProvider(this.form.providerName)
    },

    rules () {
      return {
        providerName: [
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
    let { using } = this.$store.state
    if (using) {
      this.form.providerName = using
      this.onProviderChange()
    }
  },

  methods: {
    onProviderChange () {
      let config = this.$store.getters.getConfig(this.form.providerName) || {}
      for (let param of this.params) {
        this.$set(this.form, param.name, config[param.name] || '')
      }
    },

    save () {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        this.$store.commit(SET_USING, this.form.providerName)
        this.$store.commit(SET_CONFIGS, {
          ...this.$store.state.configs,
          [this.form.providerName]: this.form
        })
      })

      this.$message.success('保存成功')
      this.$router.push({ name: 'upload' })
    }
  }
}
</script>
