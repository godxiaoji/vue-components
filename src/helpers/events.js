import { isIOS, isMobile } from './device'
import { objectForEach, isFunction, isArray } from './util'
// import Exception from './exception'

// export function getAppTarget(el) {
//   if (el == null || !isElement(el)) {
//     return null
//   }

//   return new AppTarget(el)
// }

// export class AppTarget {
//   constructor(el) {
//     this.id = el.id
//     this.dataset = getDataset(el.dataset)
//     this.offsetLeft = el.offsetLeft
//     this.offsetTop = el.offsetTop
//   }
// }

// /**
//  * 基础事件类
//  */
// export class BaseEvent {
//   constructor(e) {
//     let { type, currentTarget, target } = e

//     if (!isElement(currentTarget)) {
//       currentTarget = document.createElement('view')
//     }

//     if (!isElement(target)) {
//       target = currentTarget
//     }

//     this.type = type
//     this.timeStamp = Date.now()

//     this.currentTarget = getAppTarget(currentTarget)
//     this.target = getAppTarget(target)

//     this.details = {}

//     if (e instanceof MouseEvent) {
//       this.details.x = e.x
//       this.details.y = e.y
//     }

//     return this
//   }
// }

// /**
//  * 自定义事件类
//  */
// export class CustomEvent extends BaseEvent {
//   constructor(event, details = {}) {
//     super(event)

//     if (isObject(details)) {
//       if (details instanceof Exception) {
//         details = details.getFailError()
//       }
//     }

//     this.details = isObject(details) ? details : {}

//     return this
//   }
// }

export function getDataset(object) {
  const dataset = {}

  objectForEach(object, (value, key) => {
    if (
      key.indexOf('v-') === 0 ||
      (key.indexOf('v') === 0 && key.length === 9)
    ) {
      // 屏蔽带v-的vue属性
    } else {
      dataset[key] = value
    }
  })

  return dataset
}

let euid = 0

const scrollCallbacks = {}

function onScroll(e) {
  let target = e.target

  if (target._euid && scrollCallbacks[target._euid]) {
    const callbacks = scrollCallbacks[target._euid]
    if (target === document) {
      target = document.documentElement
    }

    callbacks.forEach(callback => {
      callback.call(callback, e, target)
    })
  }
}

export function addScrollEvent(callback, target = document) {
  if (!isFunction(callback)) {
    return
  }

  if (target === document.documentElement) {
    target = document
  }

  if (!target._euid) {
    target._euid = ++euid
  }
  const id = target._euid

  if (!scrollCallbacks[id]) {
    scrollCallbacks[id] = []
    target.addEventListener('scroll', onScroll, false)
  }

  scrollCallbacks[id].push(callback)
}

export function removeScrollEvent(callback, target = document) {
  if (target === document.documentElement) {
    target = document
  }

  if (!isArray(scrollCallbacks[target._euid])) {
    return
  }

  const id = target._euid
  const callbacks = scrollCallbacks[id]
  let index = -1

  for (let i = 0; i < callbacks.length; i++) {
    if (callbacks[i] == callback) {
      index = i
      break
    }
  }

  if (index >= 0) {
    callbacks.splice(index, 1)

    if (callbacks.length === 0) {
      target.removeEventListener('scroll', onScroll, false)
      delete scrollCallbacks[id]
    }
  }
}

// const resizeCallbacks = {}

// function onResize(e) {
//   const target = e.target

//   if (target._euid && resizeCallbacks[target._euid]) {
//     const callbacks = resizeCallbacks[target._euid]

//     callbacks.forEach(callback => {
//       callback.call(callback, e, target)
//     })
//   }
// }

// export function addResizeEvent(callback, target = document) {
//   if (!isFunction(callback)) {
//     return
//   }

//   if (!target._euid) {
//     target._euid = ++euid
//   }
//   const id = target._euid

//   if (!resizeCallbacks[id]) {
//     resizeCallbacks[id] = []
//     target.addEventListener('resize', onResize, false)
//   }

//   resizeCallbacks[id].push(callback)
// }

// export function removeResizeEvent(callback, target = document) {
//   if (target === document.documentElement) {
//     target = document
//   }

//   if (!isArray(resizeCallbacks[target._euid])) {
//     return
//   }

//   const id = target._euid
//   const callbacks = resizeCallbacks[id]
//   let index = -1

//   for (let i = 0; i < callbacks.length; i++) {
//     if (callbacks[i] == callback) {
//       index = i
//       break
//     }
//   }

//   if (index >= 0) {
//     callbacks.splice(index, 1)

//     if (callbacks.length === 0) {
//       target.removeEventListener('resize', onResize, false)
//       delete resizeCallbacks[id]
//     }
//   }
// }

export function init() {
  if (isMobile) {
    if (isIOS) {
      // console.log('support active')
      document.addEventListener('touchstart', function() {}, false)
    }
  }
}

let passiveSupported = false
try {
  let options = Object.defineProperty({}, 'passive', {
    get: function() {
      return (passiveSupported = true)
    }
  })
  window.addEventListener('test', null, options)
} catch (err) {
  // 此处不需要任何操作
}

const touchOptions = {
  touchstart: isMobile ? 'touchstart' : 'mousedown',
  touchmove: isMobile ? 'touchmove' : 'mousemove',
  touchend: isMobile ? 'touchend' : 'mouseup',
  options: passiveSupported ? { passive: false } : false
}

export const touchEvent = {
  touchstart: touchOptions.touchstart,
  touchmove: touchOptions.touchmove,
  touchend: touchOptions.touchend,
  addListeners($el, ref) {
    $el.addEventListener(touchOptions.touchstart, ref, touchOptions.options)
    $el.addEventListener(touchOptions.touchmove, ref, touchOptions.options)
    $el.addEventListener(touchOptions.touchend, ref, touchOptions.options)

    if (touchOptions.touchend === 'mouseup') {
      $el.addEventListener('mouseleave', ref, touchOptions.options)
    }
  },
  removeListeners($el, ref) {
    $el.removeEventListener(touchOptions.touchstart, ref, touchOptions.options)
    $el.removeEventListener(touchOptions.touchmove, ref, touchOptions.options)
    $el.removeEventListener(touchOptions.touchend, ref, touchOptions.options)

    if (touchOptions.touchend === 'mouseup') {
      $el.removeEventListener('mouseleave', ref, touchOptions.options)
    }
  },
  getTouch(e) {
    let touch

    if (isMobile) {
      if (e.type === 'mousedown') {
        return
      }
      touch = e.targetTouches[0]
    } else {
      // mousedown
      touch = e
    }

    return touch
  }
}
