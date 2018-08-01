<template>
  <el-row class="history">
    <template v-for="(item, index) in uploaded">
      <el-col class="history-item" :key="index" :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
        <image-cop :image="item" @remove="remove(index)"></image-cop>
      </el-col>
    </template>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import { REMOVE_UPLOAD } from '@/store/mutation-types'
import ImageCop from '@/components/Image'

export default {
  name: 'history',

  components: {
    ImageCop
  },

  computed: {
    ...mapState([
      'uploaded'
    ])
  },

  methods: {
    remove (index) {
      this.$store.commit(REMOVE_UPLOAD, index)
    }
  }
}
</script>
