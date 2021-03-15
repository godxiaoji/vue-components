import { createApp } from 'vue'
import Notify from '@/Notify'
import { isObject, isString } from '@/helpers/util'
import { parseParamsByRules } from '@/apis/rules'
import { getCallbackFns } from '@/apis/callback'
import Exception from '@/helpers/exception'
import { createPopup, PopupBridge } from '@/utils/popup'
import { ApiOptions } from '@/apis/types'
import { StateTypes } from '@/utils/constants'

type ShowNotifyApiOptions = {
  title: string
  type?: StateTypes
  icon?: string
  duration?: number
  backgroundColor?: string
  color?: string
  closable?: boolean
} & ApiOptions

interface RefFns {
  [propName: string]: Function
}

const $refs: {
  [propName: string]: {
    uid: number
    fns: RefFns
  }
} = {}

export function baseShow(
  object: string | ApiOptions,
  apiName: string,
  componentOptions: any
) {
  if (isString(object)) {
    object = {
      title: object
    }
  } else if (!isObject(object)) {
    object = {}
  }

  const { success, fail, complete } = getCallbackFns(object as ApiOptions)

  try {
    const fns: RefFns = {}
    const key = apiName.replace('show', '')
    const propsData = parseParamsByRules(object as ApiOptions, apiName)

    clear(key)

    const { $wrapper } = createPopup()

    const app = createApp(
      componentOptions,
      Object.assign(propsData, {
        visible: true
      })
    )
    app.provide('fxApis', {
      in(hookName) {
        switch (hookName) {
          case 'afterHidden': {
            app.unmount($wrapper)
            remove(key, $ref.uid)
          }
        }
      },
      out(key: string, value: any) {
        fns[key] = value
      }
    } as PopupBridge)
    app.mount($wrapper)

    const $ref = {
      uid: app._uid,
      fns
    }

    $refs[key] = $ref

    success({})
  } catch (e) {
    fail(e)
  }
  complete()
}

function clear(key: string) {
  if ($refs[key]) {
    $refs[key].fns.customCancel('clear', true)
    delete $refs[key]
  }
}

function remove(key: string, uid: number) {
  if ($refs[key] && $refs[key].uid === uid) {
    delete $refs[key]
  }
}

/**
 * 展示消息提示
 * @param object 配置
 */
export function showNotify(object: ShowNotifyApiOptions) {
  return baseShow(object, 'showNotify', Notify)
}

/**
 * 隐藏消息提示
 * @param {Object} object
 */
export function baseHide(object: ApiOptions, apiName: string) {
  if (!isObject(object)) {
    object = {}
  }

  const { success, fail, complete } = getCallbackFns(object)

  try {
    clear(apiName.replace('hide', ''))

    success()
  } catch (e) {
    fail(new Exception(e.message))
  }
  complete()
}

/**
 * 隐藏消息提示
 * @param {Object} object
 */
export function hideNotify(object: ApiOptions) {
  return baseHide(object, 'hideNotify')
}
