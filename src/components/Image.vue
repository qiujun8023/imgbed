<template>
  <el-card
    class="image-cop"
    shadow="hover"
    ref="card"
    @click.native="copy(image.url)"
    :body-style="{ padding: 0 }">

    <div class="image-preview" v-if="isPreview">
      <div class="image-img"
        :style="imageStyle"
        @click="copy(image.url)">
      </div>
    </div>

    <div class="image-uploaded" v-else>
      <div class="image-img"
        :style="imageStyle"
        v-lazy:background-image="image.thumb || image.url"
        v-loading="loading"
        @loaded="loaded">
      </div>

      <div class="image-title">
        <span>{{image.name}}</span>
      </div>
    </div>

    <span class="image-delete" @click.stop="remove">
      <i class="el-icon-close"></i>
    </span>

  </el-card>
</template>

<script>
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

  data () {
    return {
      loading: true,
      imageWidth: 0
    }
  },

  computed: {
    imageHeight () {
      return Math.round(this.imageWidth / 16 * 9)
    },

    imageStyle () {
      if (this.isPreview) {
        return {
          'height': this.imageHeight + 'px',
          'background-image': `url('${this.image.blob}')`
        }
      }

      return {
        'height': this.imageHeight + 'px'
      }
    }
  },

  mounted () {
    this.onImageWidthChange()
    window.addEventListener('resize', this.onImageWidthChange)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onImageWidthChange)
  },

  methods: {
    onImageWidthChange () {
      let { card } = this.$refs
      if (card) {
        this.imageWidth = card.$el.offsetWidth
      }
    },

    loaded () {
      this.loading = false
    },

    copy (text) {
      this.$copyText(text).then((e) => {
        this.$message.success('已复制到粘贴板')
      }, (e) => {
        this.$message.error('复制失败：' + e.message)
      })
    },

    remove () {
      this.$emit('remove')
    }
  }
}
</script>
