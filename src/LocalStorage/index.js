import { createStorage } from '../apis/LocalStorage'
import { objectForEach } from '../helpers/util'
import { SDKKey } from '../config'

const LocalStorage = createStorage(SDKKey)

LocalStorage.install = function(app) {
  // 添加api
  objectForEach(this, function(v, k) {
    if (k !== 'install') {
      app.config.globalProperties[`$${k}`] = v
    }
  })
}

LocalStorage.createStorage = createStorage

export default LocalStorage
