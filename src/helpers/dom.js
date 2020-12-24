import { isElement, isNumber, isString } from './util'

const docEl = document.documentElement

export function appendToBody($el) {
  document.body.appendChild($el)
}

export function removeEl($el) {
  $el.parentNode && $el.parentNode.removeChild($el)
}

export function addClassName($el, className) {
  $el.classList.add(className)
}

export function removeClassName($el, className) {
  $el.classList.remove(className)
}

/**
 * 监听元素大小变化
 * @param {Element} $el 被监听的元素
 * @param {Function} callback 回调函数
 */
export function resizeDetector($el, callback) {
  function resizeFn() {
    callback()
  }

  // 监听
  const object = document.createElement('object')
  object.style.cssText =
    'display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;'
  object.tabIndex = -1
  object.type = 'text/html'
  object.setAttribute('aria-hidden', 'true')
  object.data = 'about:blank'
  object.onload = function() {
    if (!object.destroyed) {
      object.contentDocument.defaultView.addEventListener('resize', resizeFn)
    }
  }

  $el.appendChild(object)

  return function off() {
    object.destroyed = true
    if (object.contentDocument) {
      object.contentDocument.defaultView.removeEventListener('resize', resizeFn)
    }
    removeEl(object)
  }
}

export function getRelativeOffset($el, $relativeEl = document) {
  if ($el === document) {
    return { offsetTop: 0, offsetLeft: 0 }
  }

  let offsetTop = $el.offsetTop
  let offsetLeft = $el.offsetLeft

  if ($el.offsetParent && $el.offsetParent !== $relativeEl) {
    const parent = getRelativeOffset($el.offsetParent, $relativeEl)

    offsetTop += parent.offsetTop
    offsetLeft += parent.offsetLeft
  }

  return { offsetTop, offsetLeft }
}

/**
 * 获取长度值
 * @param {Number|String} size 10 10vw 10vh 10px
 * @param {Number} defaultValue
 */
export function getSizeValue(size, defaultValue = 0) {
  if (isNumber(size)) {
    return size
  } else if (isString(size)) {
    const matches = size.match(/^([\d.]+)((px)|(vw)|(vh)|)$/)

    if (matches) {
      size = parseFloat(matches[1])

      if (matches[2] === 'vw') {
        size *= docEl.clientWidth / 100
      } else if (matches[2] === 'vh') {
        size *= docEl.clientHeight / 100
      }

      return size
    }
  }

  return defaultValue
}

export function querySelector(selector) {
  if (isElement(selector)) {
    return selector
  } else if (isString(selector)) {
    return document.querySelector(selector)
  } else if (selector === document) {
    return docEl
  }

  return null
}
