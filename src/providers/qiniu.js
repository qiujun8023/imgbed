import _ from 'lodash'
import axios from 'axios'
import dateFormat from 'dateformat'
import obj2fd from '@/utils/obj2fd'
import QiniuSDK from '@/lib/qiniu-sdk'

export default class Qiniu {
  static title = '七牛云'

  static params = [{
    name: 'region',
    label: '存储区域：',
    component: 'select',
    options: [
      {
        label: '华东',
        value: 'https://upload.qiniup.com'
      },
      {
        label: '华北',
        value: 'https://upload-z1.qiniup.com'
      },
      {
        label: '华南',
        value: 'https://upload-z2.qiniup.com'
      },
      {
        label: '北美',
        value: 'https://upload-na0.qiniup.com'
      },
      {
        label: '东南亚',
        value: 'https://upload-as0.qiniup.com'
      }
    ],
    placeholder: '请选择存储区域'
  }, {
    name: 'accessKey',
    label: 'AccessKey：',
    component: 'input',
    type: 'text',
    placeholder: 'AccessKey'
  }, {
    name: 'secretKey',
    label: 'SecretKey：',
    component: 'input',
    type: 'text',
    placeholder: 'SecretKey'
  }, {
    name: 'bucket',
    label: 'Bucket:',
    component: 'input',
    type: 'text',
    placeholder: 'Bucket'
  }, {
    name: 'requestUrl',
    label: '加速域名地址：',
    component: 'input',
    type: 'text',
    placeholder: 'https://example.com'
  }]

  static rules = {
    region: [
      { required: true, message: '请选择存储区域', trigger: 'blur' }
    ],
    accessKey: [
      { required: true, message: '请输入 AccessKey', trigger: 'blur' }
    ],
    secretKey: [
      { required: true, message: '请输入 SecretKey', trigger: 'blur' }
    ],
    bucket: [
      { required: true, message: '请输入 Bucket', trigger: 'blur' }
    ],
    requestUrl: [
      { required: true, message: '请输入加速地址', trigger: 'blur' },
      { type: 'url', message: '格式形如 https://example.com', trigger: 'blur' }
    ]
  }

  constructor (region, accessKey, secretKey, bucket, requestUrl) {
    this.region = region
    this.bucket = bucket
    this.requestUrl = requestUrl
    this.service = new QiniuSDK(accessKey, secretKey)
  }

  getEndpoint () {
    return this.region
  }

  getPolicy () {
    let token = this.service.getUploadToken({
      scope: this.bucket,
      saveKey: `image/${dateFormat(new Date(), 'yyyy/mm/dd')}/$(etag)$(ext)`
    })

    return {
      body: {
        token
      }
    }
  }

  successHandle (file, res) {
    let url = _.trimEnd(this.requestUrl, '/') + '/' + _.get(res, 'data.key')
    return {
      url,
      name: file.name,
      thumb: url + '?imageView2/1/w/80/h/80',
      preview: url + '?imageView2/1/w/320/h/180'
    }
  }

  errorHandle (err) {
    return {
      message: _.get(err, 'response.data.error') || err.message
    }
  }

  upload (file, onProgress, onError, onSuccess) {
    let url = this.getEndpoint()
    let { body } = this.getPolicy()
    let formData = obj2fd(body)
    formData.append('file', file)

    axios.post(url, formData, {
      onUploadProgress: onProgress
    }).then((res) => {
      return onSuccess(this.successHandle(file, res))
    }).catch((err) => {
      return onError(this.errorHandle(err))
    })
  }
}
