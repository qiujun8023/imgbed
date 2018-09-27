<template>
  <div class="upload" @paste="onPaste">
    <div class="uploader">
      <el-upload
        drag
        multiple
        action=""
        accept="image/*"
        :show-file-list="false"
        :http-request="onUpload"
        :element-loading-text="'正在上传 ' + percent + '%'"
        v-loading="loading">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import uuidv1 from 'uuid/v1'
import ImageCop from '@/components/Image'
import isImage from '@/utils/is-image'
import * as mutationTypes from '@/store/mutation-types'

export default {
  name: 'upload',

  components: {
    ImageCop
  },

  data () {
    return {
      uploading: {}
    }
  },

  computed: {
    percent () {
      let total = 0
      let loaded = 0
      for (let uuid in this.uploading) {
        total += 100
        loaded += this.uploading[uuid].percent
      }
      return total === 0 ? 0 : Math.round(loaded / total * 100)
    },

    loading () {
      for (let uuid in this.uploading) {
        if (this.uploading[uuid].loading) {
          return true
        }
      }
      return false
    }
  },

  methods: {
    onPaste ({ clipboardData: cb }) {
      if (cb.files && cb.files.length) {
        let file = cb.files[0]
        if (isImage(file)) {
          this.upload(file)
        }
      }
    },

    onUpload ({ file }) {
      this.upload(file)
    },

    onUploadSuccess (uuid, image) {
      this.$set(this.uploading[uuid], 'loading', false)
      this.$store.commit(mutationTypes.ADD_UPLOADED, image)

      this.$notify({
        dangerouslyUseHTMLString: true,
        customClass: 'upload-notification',
        message: `
          <div class="image" style="background: url('${image.thumb}') center center no-repeat;"></div>
          <div class="content">
            <h2 class="title">上传成功</h2>
            <p class="text">点击复制链接</p>
          </div>
        `,
        duration: 0,
        onClick () {
          this.$copyText(image.url).then((e) => {
            this.$message.success('已复制到粘贴板')
          }, (e) => {
            this.$message.error('复制失败：' + e.message)
          })
        }
      })
    },

    onUploadError (uuid, res) {
      this.$set(this.uploading[uuid], 'loading', false)
      this.$message.error('上传失败：' + res.message)
    },

    onUploadProgress (uuid, e) {
      let percent = Math.round(e.loaded / e.total * 100)
      this.$set(this.uploading[uuid], 'percent', percent)
    },

    upload (file) {
      if (!this.loading) {
        this.uploading = {}
      }

      let uuid = uuidv1()
      this.$set(this.uploading, uuid, {
        name: file.name,
        percent: 0,
        loading: true
      })

      this.$store.getters.uploader.upload(
        file,
        this.onUploadProgress.bind(this, uuid),
        this.onUploadError.bind(this, uuid),
        this.onUploadSuccess.bind(this, uuid)
      )
    }
  }
}
</script>
