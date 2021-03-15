import Toast from '@/Toast'
import { isObject, isString } from '@/helpers/util'
import { baseShow, baseHide } from '@/apis/Notify'
import { ApiOptions } from '@/apis/types'

type ShowToastApiOptions = {
  title: string
  type?: 'default' | 'success' | 'loading' | 'fail'
  icon?: string
  duration?: number
  mask?: boolean
} & ApiOptions

type ShowLoadingApiOptions = {
  title: string
  duration?: number
  mask?: boolean
} & ApiOptions

export function showToast(object: string | ShowToastApiOptions) {
  return baseShow(object, 'showToast', Toast)
}
export function hideToast(object: ApiOptions) {
  return baseHide(object, 'hideToast')
}

export function showLoading(object: string | ShowLoadingApiOptions) {
  let newObject: ShowLoadingApiOptions

  if (isString(object)) {
    newObject = {
      title: object as string
    }
  } else if (!isObject(object)) {
    newObject = {
      title: ''
    }
  } else {
    newObject = object as ShowLoadingApiOptions
  }

  newObject.type = 'loading'
  newObject.duration = 0

  return baseShow(newObject, 'showLoading', Toast)
}

export function hideLoading(object: ApiOptions) {
  return baseHide(object, 'hideLoading')
}
