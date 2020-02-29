import { createIntersectionObserver } from './IntersectionObserver'
import { createSelectorQuery } from './SelectorQuery'
import { show as showModal } from './Modal'
import { show as showToast, hide as hideToast } from './Toast'
import { isObject } from '../helpers/util'
import {
  getStorageInfoSync,
  getStorageSync,
  setStorageSync,
  removeStorageSync,
  clearStorageSync
} from './LocalStorage'
import { pageScrollTo } from './Scroll'

export function addApis(Vue) {
  Vue.prototype.$createIntersectionObserver = function(options) {
    return createIntersectionObserver(this.$el, options)
  }
  Vue.prototype.$createSelectorQuery = function() {
    return createSelectorQuery(this.$el)
  }

  Vue.prototype.$showModal = showModal
  Vue.prototype.$showToast = showToast
  Vue.prototype.$hideToast = hideToast
  Vue.prototype.$showLoading = function(object) {
    if (!isObject(object)) {
      object = {}
    }

    object.icon = 'loading'
    object.duration = 0
    return showToast(object)
  }
  Vue.prototype.$hideLoading = hideToast

  Vue.prototype.$getStorageInfo = getStorageInfoSync
  Vue.prototype.$getStorage = getStorageSync
  Vue.prototype.$setStorage = setStorageSync
  Vue.prototype.$removeStorage = removeStorageSync
  Vue.prototype.$clearStorage = clearStorageSync

  Vue.prototype.$pageScrollTo = pageScrollTo
}
