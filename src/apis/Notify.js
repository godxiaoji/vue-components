import { isObject, isString } from '../helpers/util'
import { parseParamsByRules } from './rules'
import { getCallbackFns } from './callback'
import Exception from '../helpers/exception'
import { SDKKey } from '../config'

function render(options) {
  const $wrapper = document.createElement('div')

  $wrapper.innerHTML = `
<div class="${SDKKey}-notify" style="${
    options.backgroundColor
      ? 'background-color: ' + options.backgroundColor + ';'
      : ''
  } ${options.backgroundColor ? 'color: ' + options.color + ';' : ''}">
${options.title}
</div>
      `.trim()

  return $wrapper.firstElementChild
}

let timers = {}
let $els = {}

export function baseShow(object, apiName, renderFn) {
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
    const options = parseParamsByRules(object, apiName)

    _hide(true, key)

    const $currentEl = renderFn(options)
    $currentEl._options = options
    document.body.appendChild($currentEl)
    setTimeout(() => {
      $currentEl.classList.add('visibility')
    }, 17)

    $els[key] = $currentEl

    // 定时隐藏
    if (options.duration > 0) {
      timers[key] = setTimeout(() => {
        _hide(false, key)
      }, options.duration)
    }

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
  return baseShow(object, 'showNotify', render)
}

function _hide(immediate = false, key) {
  clearTimeout(timers[key])

  if ($els[key]) {
    const $currentEl = $els[key]
    $currentEl.classList.remove('visibility')

    if (immediate) {
      document.body.removeChild($currentEl)
    } else {
      setTimeout(() => {
        document.body.removeChild($currentEl)
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
