import _ from 'lodash'

export default (obj) => {
  return _.reduce(obj, (res, val, key) => {
    res.append(key, val)
    return res
  }, new FormData())
}
