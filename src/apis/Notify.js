import Vue from 'vue'
import Notify from '../components/Notify'
import { isObject, isString } from '../helpers/util'
import { parseParamsByRules } from './rules'
import { getCallbackFns } from './callback'
import Exception from '../helpers/exception'
import { removeEl } from '../helpers/dom'
import { createPopup } from '../helpers/popup'

let timers = {}
let $els = {}

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

    _hide(true, key)

    const Comp = Vue.extend({
      extends: componentOptions,
      methods: {
        close() {
          _hide(false, key)
        }
      },
      mounted() {
        setTimeout(() => {
          this.visible = true
        }, 17)
      }
    })

    const { $wrapper, zIndex } = createPopup()

    const app = new Comp({
      propsData: Object.assign(propsData, {
        zIndex
      })
    }).$mount($wrapper)

    $els[key] = app

    success({})
  } catch (e) {
    fail(e)
  }
  complete()
}

/**
 * 展示消息提示
 * @param {{title: String, type?: String, duration?: Number, backgroundColor?: String, color?: String}} object 配置
 */
export function showNotify(object) {
  return baseShow(object, 'showNotify', Notify)
}

function _hide(immediate = false, key) {
  clearTimeout(timers[key])

  if ($els[key]) {
    const app = $els[key]

    app.visible = false

    if (immediate) {
      app.$destroy()
      removeEl(app.$el)
    } else {
      setTimeout(() => {
        app.$destroy()
        removeEl(app.$el)
      }, 200)
    }

    delete $els[key]
  }
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
    _hide(false, apiName.replace('hide', ''))

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
