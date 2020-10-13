import Toast from '../components/Notice/Toast.vue'
import { isObject, isString } from '../helpers/util'
import { baseShow, baseHide } from './Notify'

export function showToast(object) {
  return baseShow(object, 'showToast', Toast)
}
export function hideToast(object) {
  return baseHide(object, 'hideToast')
}

export function showLoading(object) {
  if (isString(object)) {
    object = {
      title: object
    }
  } else if (!isObject(object)) {
    object = {}
  }

  object.icon = 'loading'
  object.duration = 0

  return baseShow(object, 'showLoading', Toast)
}

export function hideLoading(object) {
  return baseHide(object, 'hideLoading')
}
