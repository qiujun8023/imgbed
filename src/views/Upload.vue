<template>
  <div class="upload">
    <el-upload
      drag
      class="upload-cop"
      action=""
      accept="image/*"
      :show-file-list="false"
      :http-request="onUpload"
      v-loading="uploading"
      :element-loading-text="'正在上传 ' + percent + '%'">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>

    <el-dialog
      class="setting"
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
import isImage from '@/utils/is-image'
import * as mutationTypes from '@/store/mutation-types'
import SettingCop from '@/components/Setting'
import clipboard from '@/utils/clipboard'

export default {
  name: 'upload',

  data () {
    return {
      image: {},
      percent: 0,
      uploading: false
    }
  },

  computed: {
    needSetting () {
      return !this.$store.getters.uploader
    }
  },

  components: {
    SettingCop
  },

  created () {
    document.addEventListener('paste', this.onPaste)
  },

  destroyed () {
    document.removeEventListener('parse', this.onPaste)
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

    onUploadSuccess (res) {
      this.image = {
        ...this.image,
        ...res
      }
      this.uploading = false
      this.$store.commit(mutationTypes.ADD_UPLOAD, this.image)
      clipboard(this, this.image.url)
    },

    onUploadError (res) {
      this.uploading = false
      this.$message.error('上传失败：' + res.message)
    },

    onUploadProgress (e) {
      this.percent = Math.round(e.loaded / e.total * 100)
    },

    upload (file) {
      if (this.uploading) {
        this.$message.error('正在上传其他图片，请稍候...')
        return false
      }

      this.percent = 0
      this.uploading = true
      this.image = {
        name: file.name,
        blob: URL.createObjectURL(file)
      }
      this.$store.getters.uploader.upload(
        file,
        this.onUploadProgress,
        this.onUploadError,
        this.onUploadSuccess
      )
    }
  }
}
</script>
