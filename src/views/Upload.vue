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
import { mapState } from 'vuex'
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
      image: {},
      percent: 0,
      loading: false
    }
  },

  computed: {
    ...mapState([
      'uploading'
    ])
  },

  methods: {
    closePreview () {
      this.$store.commit(mutationTypes.REMOVE_UPLOADING)
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
      let image = {
        ...this.uploading,
        ...res
      }
      this.loading = false
      this.$store.commit(mutationTypes.ADD_UPLOADED, image)
      this.$store.commit(mutationTypes.SET_UPLOADING, image)

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

    onUploadError (res) {
      this.loading = false
      this.$message.error('上传失败：' + res.message)
    },

    onUploadProgress (e) {
      this.percent = Math.round(e.loaded / e.total * 100)
    },

    upload (file) {
      if (this.loading) {
        this.$message.error('正在上传其他图片，请稍候...')
        return false
      }

      this.percent = 0
      this.loading = true

      this.$store.commit(mutationTypes.SET_UPLOADING, {
        name: file.name,
        uuid: uuidv1(),
        blob: URL.createObjectURL(file)
      })

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
