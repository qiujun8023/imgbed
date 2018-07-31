
import _ from 'lodash'

export default (file) => {
  return file instanceof File && _.startsWith(file.type, 'image/')
}
