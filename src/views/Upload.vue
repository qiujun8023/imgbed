<template>
  <div class="upload" @pause="onPaste">
    <div class="uploader" v-show="!preview">
      <el-upload
        drag
        multiple
        action=""
        accept="image/*"
        :show-file-list="false"
        :http-request="onUpload"
        :element-loading-text="'正在上传 ' + percent + '%'"
        v-loading="uploading">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>

    <div
      class="previewer"
      v-if="preview">
      <div
        class="previewer-box"
        v-loading="uploading"
        :element-loading-text="'上传中 ' + percent + '%'">
        <image-cop
          :image="image"
          :isPreview="true"
          @remove="closePreview">
        </image-cop>
      </div>
    </div>

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
import ImageCop from '@/components/Image'
import SettingCop from '@/components/Setting'
import isImage from '@/utils/is-image'
import * as mutationTypes from '@/store/mutation-types'

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
    },
    preview () {
      return Boolean(this.image.blob)
    }
  },

  components: {
    SettingCop,
    ImageCop
  },

  methods: {
    closePreview () {
      this.image = {}
    },

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
