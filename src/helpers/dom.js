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
