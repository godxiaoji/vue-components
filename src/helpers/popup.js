import { appendToBody, removeEl } from './dom'
import { SDKKey } from '../config'
import elementResizeDetectorMaker from 'element-resize-detector'

let puid = 1
const zIndex = 10000

export function createPopup() {
  const $wrapper = document.createElement('div')
  const id = puid++

  appendToBody($wrapper)

  return {
    id,
    $wrapper,
    zIndex: zIndex + id
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
    $wrapper.style.top = 1 + top + $el.offsetHeight + 'px'
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
  $wrapper.style.zIndex = zIndex + id
  $wrapper.style.display = 'none'
  $wrapper.innerHTML = `<div class="${SDKKey}-picker_inner"><div></div></div>`

  const erd = elementResizeDetectorMaker()

  erd.listenTo($wrapper, function() {
    updatePos($wrapper, $el, options)
  })

  appendToBody($wrapper)

  return (caches[id] = {
    id,
    $mount: $wrapper.firstElementChild.firstElementChild,
    $wrapper,
    erd,
    show() {
      $wrapper.style.display = 'block'
      updatePos($wrapper, $el, options)
    },
    hide() {
      $wrapper.style.display = 'none'
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
