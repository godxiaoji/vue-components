import { App } from 'vue'
import { SFCWithInstall } from '@/helpers/types'
import Toast from './Toast.vue'
import { showPopup, hidePopup, createAlertHook } from '@/apis/Popup'
import { ApiOptions } from '../apis/types'
import { isObject, isString } from '@/helpers/util'

type ShowToastOptions = {
  title: string
  type?: 'default' | 'success' | 'loading' | 'fail'
  icon?: string
  duration?: number
  mask?: boolean
} & ApiOptions

type ShowLoadingOptions = {
  title: string
  duration?: number
  mask?: boolean
} & ApiOptions

const showToast = function (object: string | ShowToastOptions) {
  return showPopup(object, 'showToast', function (done) {
    return {
      component: Toast,
      hook: createAlertHook(done),
      singleMode: true
    }
  })
}

const showLoading = function (object: string | ShowLoadingOptions) {
  let newObject: ShowLoadingOptions

  if (isString(object)) {
    newObject = {
      title: object as string
    }
  } else if (!isObject(object)) {
    newObject = {
      title: ''
    }
  } else {
    newObject = object as ShowLoadingOptions
  }

  newObject.type = 'loading'
  newObject.duration = 0

  return showPopup(newObject, 'showLoading', function (done) {
    return {
      component: Toast,
      hook: createAlertHook(done),
      singleMode: true
    }
  })
}

const hideToast = function (object?: ApiOptions) {
  return hidePopup(object || {}, 'hideToast')
}

const hideLoading = function (object?: ApiOptions) {
  return hidePopup(object || {}, 'hideLoading')
}

const _Toast: SFCWithInstall<typeof Toast> & {
  showToast: typeof showToast
  hideToast: typeof hideToast
  showLoading: typeof showLoading
  hideLoading: typeof hideLoading
} = Object.assign(Toast, {
  install: function (app: App) {
    app.component(Toast.name, Toast)
  },
  showToast,
  hideToast,
  showLoading,
  hideLoading
})

export default _Toast
