import { getStorageInfo, getStorage, setStorage, removeStorage, clearStorage } from '../apis/LocalStorage'

const LocalStorage = {
  install: function(Vue) {
    // 添加api
    Vue.prototype.$getStorageInfo = getStorageInfo
    Vue.prototype.$getStorage = getStorage
    Vue.prototype.$setStorage = setStorage
    Vue.prototype.$removeStorage = removeStorage
    Vue.prototype.$clearStorage = clearStorage
  }
}

export default LocalStorage
