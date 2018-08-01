<template>
  <el-card class="image-cop" shadow="hover" :body-style="{ padding: 0 }">
    <img class="image-img" :src="url" @click="copy(image.url)">
    <div class="image-title" @click="copy(image.url)">
      <span>{{image.name}}</span>
    </div>
    <span class="image-delete" @click="remove" v-if="!isPreview">
      <i class="el-icon-close"></i>
    </span>
  </el-card>
</template>

<script>
import clipboard from '@/utils/clipboard'

export default {
  name: 'image-cop',
  props: {
    image: {
      type: Object,
      required: true
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    url () {
      return this.isPreview ? this.image.blob : this.image.url
    }
  },

  methods: {
    copy (url) {
      clipboard(this, url)
    },

    remove () {
      this.$emit('remove')
    }
  }
}
</script>
