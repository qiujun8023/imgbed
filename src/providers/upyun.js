import _ from 'lodash'
import upyun from 'upyun'
import axios from 'axios'
import obj2fd from '@/utils/obj2fd'

export default class UpYun {
  BASE_URL = 'https://v0.api.upyun.com/'

  static title = '又拍云'

  static params = [{
    name: 'serviceName',
    type: 'text',
    label: '服务名称：',
    placeholder: '服务名称'
  }, {
    name: 'operatorName',
    type: 'text',
    label: '操作员：',
    placeholder: '操作员名称'
  }, {
    name: 'password',
    type: 'password',
    label: '操作员密码：',
    placeholder: '操作员密码'
  }, {
    name: 'requestUrl',
    type: 'text',
    label: '加速域名地址：',
    placeholder: 'https://example.com'
  }]

  static rules = {
    serviceName: [
      { required: true, message: '请输入服务名称', trigger: 'blur' }
    ],
    operatorName: [
      { required: true, message: '请输入操作员名称', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    requestUrl: [
      { required: true, message: '请加速域名地址', trigger: 'blur' }
    ]
  }

  constructor (serviceName, operatorName, password, requestUrl) {
    this.serviceName = serviceName
    this.operatorName = operatorName
    this.password = password
    this.requestUrl = requestUrl
    this.service = new upyun.Service(serviceName, operatorName, password)
  }

  getEndpoint () {
    return this.BASE_URL + this.serviceName
  }

  getPolicy () {
    return {
      body: upyun.sign.getPolicyAndAuthorization(this.service, {
        'save-key': '/image/{filemd5}{.suffix}'
      })
    }
  }

  successHandle (file, res) {
    return {
      name: file.name,
      url: this.requestUrl + _.get(res, 'data.url')
    }
  }

  errorHandle (err) {
    return {
      message: _.get(err, 'response.data.message') || err.message
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
