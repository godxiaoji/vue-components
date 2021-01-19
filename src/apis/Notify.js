import { createApp } from 'vue'
import Notify from '../Notify'
import { isObject, isString } from '../helpers/util'
import { parseParamsByRules } from './rules'
import { getCallbackFns } from './callback'
import Exception from '../helpers/exception'
import { createPopup } from '../helpers/popup'

const $refs = {}

export function baseShow(object, apiName, componentOptions) {
  if (isString(object)) {
    object = {
      title: object
    }
  } else if (!isObject(object)) {
    object = {}
  }

  const { success, fail, complete } = getCallbackFns(object)

  try {
    const key = apiName.replace('show', '')
    const propsData = parseParamsByRules(object, apiName)

    clear(key)

    const Comp = {
      name: key,
      extends: componentOptions,
      methods: {
        afterHidden() {
          app.unmount($wrapper)
        }
      },
      unmounted() {
        remove(key, this)
      }
    }

    const { $wrapper } = createPopup()

    const app = createApp(
      Comp,
      Object.assign(propsData, {
        visible: true
      })
    )

    $refs[key] = app.mount($wrapper)

    success({})
  } catch (e) {
    fail(e)
  }
  complete()
}

function clear(key) {
  if ($refs[key]) {
    $refs[key].close('clear')
  }
}

function remove(key, $ref) {
  if ($refs[key] && $refs[key].$.uid === $ref.$.uid) {
    $refs[key] = null
  }
}

/**
 * 展示消息提示
 * @param {{title: String, type?: String, duration?: Number, backgroundColor?: String, color?: String}} object 配置
 */
export function showNotify(object) {
  return baseShow(object, 'showNotify', Notify)
}

/**
 * 隐藏消息提示
 * @param {Object} object
 */
export function baseHide(object, apiName) {
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
export function hideNotify(object) {
  return baseHide(object, 'hideNotify')
}
