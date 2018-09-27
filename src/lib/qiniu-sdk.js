import crypto from 'crypto'

export default class QiniuSDK {
  constructor (accessKey, secretKey) {
    this.accessKey = accessKey
    this.secretKey = secretKey
  }

  getOptions (options) {
    if (typeof options !== 'object') {
      throw new Error('invalid putpolicy options')
    }

    let result = {}

    result.scope = options.scope || null
    result.isPrefixalScope = options.isPrefixalScope || null
    result.expires = options.expires || 3600
    result.insertOnly = options.insertOnly || null

    result.saveKey = options.saveKey || null
    result.endUser = options.endUser || null

    result.returnUrl = options.returnUrl || null
    result.returnBody = options.returnBody || null

    result.callbackUrl = options.callbackUrl || null
    result.callbackHost = options.callbackHost || null
    result.callbackBody = options.callbackBody || null
    result.callbackBodyType = options.callbackBodyType || null
    result.callbackFetchKey = options.callbackFetchKey || null

    result.persistentOps = options.persistentOps || null
    result.persistentNotifyUrl = options.persistentNotifyUrl || null
    result.persistentPipeline = options.persistentPipeline || null

    result.fsizeLimit = options.fsizeLimit || null
    result.fsizeMin = options.fsizeMin || null
    result.mimeLimit = options.mimeLimit || null

    result.detectMime = options.detectMime || null
    result.deleteAfterDays = options.deleteAfterDays || null
    result.fileType = options.fileType || null

    return result
  }

  getFlags (options) {
    var flags = {}
    var attrs = ['scope', 'isPrefixalScope', 'insertOnly', 'saveKey', 'endUser',
      'returnUrl', 'returnBody', 'callbackUrl', 'callbackHost',
      'callbackBody', 'callbackBodyType', 'callbackFetchKey', 'persistentOps',
      'persistentNotifyUrl', 'persistentPipeline', 'fsizeLimit', 'fsizeMin',
      'detectMime', 'mimeLimit', 'deleteAfterDays', 'fileType'
    ]

    for (var i = attrs.length - 1; i >= 0; i--) {
      if (options[attrs[i]] !== null) {
        flags[attrs[i]] = options[attrs[i]]
      }
    }

    flags['deadline'] = options.expires + Math.floor(Date.now() / 1000)

    return flags
  }

  getUploadToken (options) {
    var flags = this.getFlags(this.getOptions(options))
    var encodedFlags = this.urlsafeBase64Encode(JSON.stringify(flags))
    var encoded = this.hmacSha1(encodedFlags, this.secretKey)
    var encodedSign = this.base64ToUrlSafe(encoded)
    var uploadToken = this.accessKey + ':' + encodedSign + ':' + encodedFlags
    return uploadToken
  }

  base64ToUrlSafe (v) {
    return v.replace(/\//g, '_').replace(/\+/g, '-')
  }

  urlsafeBase64Encode (jsonFlags) {
    var encoded = Buffer.from(jsonFlags).toString('base64')
    return this.base64ToUrlSafe(encoded)
  }

  hmacSha1 (encodedFlags, secretKey) {
    var hmac = crypto.createHmac('sha1', secretKey)
    hmac.update(encodedFlags)
    return hmac.digest('base64')
  }
}
