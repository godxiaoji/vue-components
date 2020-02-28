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

export function addApis(Vue) {
  Vue.prototype.$createIntersectionObserver = function(options) {
    return createIntersectionObserver(this.$el, options)
  }
  Vue.prototype.$createSelectorQuery = function() {
    return createSelectorQuery(this.$el)
  }

  Vue.prototype.$showModal = function(object) {
    return showModal(object)
  }
  Vue.prototype.$showToast = function(object) {
    return showToast(object)
  }
  Vue.prototype.$hideToast = function(object) {
    return hideToast(object)
  }
  Vue.prototype.$showLoading = function(object) {
    if (!isObject(object)) {
      object = {}
    }

    object.icon = 'loading'
    object.duration = 0
    return showToast(object)
  }
  Vue.prototype.$hideLoading = function(object) {
    return hideToast(object)
  }

  Vue.prototype.$getStorageInfo = getStorageInfoSync
  Vue.prototype.$getStorage = getStorageSync
  Vue.prototype.$setStorage = setStorageSync
  Vue.prototype.$removeStorage = removeStorageSync
  Vue.prototype.$clearStorage = clearStorageSync
}
