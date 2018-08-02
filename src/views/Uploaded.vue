<template>
  <div class="history">
    <div
      class="history-empty"
      v-if="!uploaded.length">
      <span>暂无记录</span>
    </div>

    <el-row
      class="history-items"
      v-else>
      <el-col
        class="history-item"
        :key="item.uuid"
        :xs="12"
        :sm="8"
        :md="8"
        :lg="6"
        :xl="4"
        v-for="(item, index) in uploaded">
        <image-cop
          :image="item"
          @remove="remove(index)">
        </image-cop>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { REMOVE_UPLOADED } from '@/store/mutation-types'
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
      this.$store.commit(REMOVE_UPLOADED, index)
    }
  }
}
</script>
