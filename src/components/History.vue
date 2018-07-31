<template>
  <ul class="history">
    <li class="history-item" :key="index" v-for="(item, index) in progress">
      <img class="history-item-image" :src="item.blob">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="item.percent"></el-progress>
    </li>
    <li class="history-item" :key="index" v-for="(item, index) in uploaded">
      <img class="history-item-image" :src="item.url">
      <span class="history-item-title">{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'history',

  computed: {
    ...mapState([
      'uploaded',
      'progress'
    ])
  }
}
</script>
