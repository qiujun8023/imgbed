<template>
  <el-upload
    drag
    multiple
    class="upload"
    action=""
    accept="image/*"
    :show-file-list="false"
    :http-request="onUpload">
    <div class="el-upload-body">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
    </div>
  </el-upload>
</template>

<script>
import uuidv4 from 'uuid/v4'
import isImage from '@/utils/is-image'
import * as mutationTypes from '@/store/mutation-types'

export default {
  name: 'upload',

  created () {
    document.addEventListener('paste', this.onPaste)
  },

  destroyed () {
    document.removeEventListener('parse', this.onPaste)
  },

  methods: {
    onPaste ({ clipboardData: cb }) {
      for (let file of cb.files) {
        if (isImage(file)) {
          this.upload(file)
        }
      }
    },

    onUpload ({ file }) {
      this.upload(file)
    },

    onUploadSuccess (uuid, blob, res) {
      this.$store.commit(mutationTypes.UPLOAD_SUCCESS, {
        uuid,
        blob,
        ...res
      })
    },

    onUploadError (uuid, blob, res) {
      this.$store.commit(mutationTypes.UPLOAD_ERROR, {
        uuid,
        blob,
        ...res
      })
    },

    onUploadProgress (uuid, blob, e) {
      this.$store.commit(mutationTypes.UPLOAD_PROGRESS, {
        uuid,
        blob,
        percent: Math.round(e.loaded / e.total * 100)
      })
    },

    upload (file) {
      let uuid = uuidv4()
      let blob = URL.createObjectURL(file)
      this.$store.getters.uploader.upload(
        file,
        this.onUploadProgress.bind(this, uuid, blob),
        this.onUploadError.bind(this, uuid, blob),
        this.onUploadSuccess.bind(this, uuid, blob)
      )
    }
  }
}
</script>
