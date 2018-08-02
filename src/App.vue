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
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
