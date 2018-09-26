<template>
  <div class="app">
    <div class="header">
      <div class="container">
        <el-menu
          class="navbar"
          mode="horizontal"
          :router="true"
          :default-active="$route.path">
          <el-menu-item index="/">
            <i class="el-icon-upload2"></i>上传
          </el-menu-item>
          <el-menu-item index="/uploaded">
            <i class="el-icon-picture-outline"></i>记录
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>配置
          </el-menu-item>
        </el-menu>
      </div>
    </div>

    <div class="main">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>

    <el-dialog
      title="服务商配置"
      :visible.sync="needSetting"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <setting-cop/>
    </el-dialog>
  </div>
</template>

<script>
import SettingCop from '@/components/Setting'

export default {
  name: 'app',

  components: {
    SettingCop
  },

  computed: {
    needSetting () {
      return !this.$store.getters.uploader
    }
  }
}
</script>
