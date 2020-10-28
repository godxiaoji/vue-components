import {
  appendToBody,
  removeEl,
  resizeDetector,
  addClassName,
  removeClassName
} from './dom'
import { SDKKey } from '../config'

let puid = 1
let zIndex = 2000

export function getNewZIndex() {
  return zIndex++
}

export function createPopup() {
  const $wrapper = document.createElement('div')
  const id = puid++

  appendToBody($wrapper)

  return {
    id,
    $wrapper,
    zIndex: getNewZIndex()
  }
}

const caches = {}

function updatePos($wrapper, $el, options) {
  let { left, top } = $el.getBoundingClientRect()
  const docW = document.documentElement.offsetWidth
  const w = $wrapper.offsetWidth

  if (docW - left < w) {
    left = 0
  }

  if (docW <= 575) {
    $wrapper.style.left = '0px'
    $wrapper.style.top = '1px'
  } else {
    $wrapper.style.left = left + 'px'
    $wrapper.style.top =
      1 + top + $el.offsetHeight + document.documentElement.scrollTop + 'px'
  }

  if (options.minWidth) {
    $wrapper.style.minWidth = $el.offsetWidth + 'px'
  }

  $wrapper.style.maxWidth = docW + 'px'
}

export function createPicker($el, options = {}) {
  const $wrapper = document.createElement('div')
  const id = puid++

  $wrapper.className = SDKKey + '-picker'
  $wrapper.style.display = 'none'
  $wrapper.innerHTML = `<div class="${SDKKey}-picker_overlay"></div><div class="${SDKKey}-picker_inner"><div></div></div>`

  appendToBody($wrapper)

  return (caches[id] = {
    id,
    $mount: $wrapper.lastElementChild.firstElementChild,
    $wrapper,
    offResizeDetector: resizeDetector($wrapper, function() {
      updatePos($wrapper, $el, options)
    }),
    show() {
      clearTimeout(this.visibleTimer)
      if (document.documentElement.offsetWidth < 576) {
        addClassName(document.body, SDKKey + '-overflow-hidden')
      }

      $wrapper.style.zIndex = getNewZIndex()
      $wrapper.style.display = 'block'

      this.visibleTimer = setTimeout(() => {
        addClassName($wrapper, 'visible')
        updatePos($wrapper, $el, options)
      }, 17)
    },
    hide() {
      removeClassName($wrapper, 'visible')

      this.visibleTimer = setTimeout(() => {
        $wrapper.style.display = 'none'
      }, 220)

      removeClassName(document.body, SDKKey + '-overflow-hidden')
    }
  })
}

export function destroyPicker(id) {
  if (caches[id]) {
    const cache = caches[id]
    const $wrapper = cache.$wrapper

    cache.erd.uninstall($wrapper)
    removeEl($wrapper)

    delete caches[id]
  }
}
