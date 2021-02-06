import { isIOS, isMobile } from './device'
import { objectForEach, isFunction } from './util'
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

const callbacks = {}

window.callbacks = callbacks

function onEvent(e) {
  let { currentTarget, type } = e
  const uid = currentTarget._euid

  if (uid && callbacks[type] && callbacks[type][uid]) {
    const currentCallbacks = callbacks[type][uid]

    if (currentTarget === document) {
      currentTarget = document.documentElement
    }

    currentCallbacks.forEach(callback => {
      callback.call(callback, e, currentTarget)
    })
  }
}

export function addEvent(type, callback, target = document) {
  if (!isFunction(callback) || !type) {
    return
  }

  if (target === document.documentElement) {
    target = document
  }

  if (!target._euid) {
    target._euid = ++euid
  }
  const uid = target._euid

  if (!callbacks[type]) {
    callbacks[type] = {}
  }
  if (!callbacks[type][uid]) {
    callbacks[type][uid] = []
    target.addEventListener(type, onEvent, false)
  }

  callbacks[type][uid].push(callback)
}

export function addScrollEvent(callback, target) {
  addEvent('scroll', callback, target)
}

export function removeEvent(type, callback, target = document) {
  if (target === document.documentElement) {
    target = document
  }

  const uid = target._euid

  if (callbacks[type] && callbacks[type][uid]) {
    const currentCallbacks = callbacks[type][uid]
    let index = -1

    for (let i = 0; i < currentCallbacks.length; i++) {
      if (currentCallbacks[i] == callback) {
        index = i
        break
      }
    }

    if (index > -1) {
      currentCallbacks.splice(index, 1)

      if (currentCallbacks.length === 0) {
        target.removeEventListener(type, onEvent, false)
        delete callbacks[type][uid]
      }
    }
  }
}

export function removeScrollEvent(callback, target) {
  removeEvent('scroll', callback, target)
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

const touchstart = isMobile ? 'touchstart' : 'mousedown'
const touchmove = isMobile ? 'touchmove' : 'mousemove'
const touchend = isMobile ? 'touchend' : 'mouseup'
const touchOptions = passiveSupported ? { passive: false } : false

function getStretchOffset(offset) {
  return Math.ceil(offset / Math.log(Math.abs(offset)))
}

export const touchEvent = {
  touchstart,
  touchmove,
  touchend,
  getStretchOffset,
  addListeners($el, ref) {
    $el.addEventListener(touchstart, ref, touchOptions)
    $el.addEventListener(touchmove, ref, touchOptions)
    $el.addEventListener(touchend, ref, touchOptions)

    if (touchend === 'mouseup') {
      $el.addEventListener('mouseleave', ref, touchOptions)
    }
  },
  removeListeners($el, ref) {
    $el.removeEventListener(touchstart, ref, touchOptions)
    $el.removeEventListener(touchmove, ref, touchOptions)
    $el.removeEventListener(touchend, ref, touchOptions)

    if (touchend === 'mouseup') {
      $el.removeEventListener('mouseleave', ref, touchOptions)
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

/**
 * 绑定长按事件
 * @param {Element} $el 绑定的元素
 * @param {Function} callback 回调函数
 */
export function addLongPressEvent($el, callback) {
  let coords = null

  const ref = {
    /**
     * 事件
     * @param {Event} e
     */
    handleEvent(e) {
      switch (e.type) {
        case touchstart:
          this.onStart(e)
          break
        case touchmove:
          this.onMove(e)
          break
        case touchend:
          this.onEnd(e)
          break
        case 'mouseleave':
          this.onEnd(e)
          break
        default:
          break
      }
    },
    onStart(e) {
      const { pageX, pageY } = touchEvent.getTouch(e)

      coords = {
        startX: pageX,
        startY: pageY,
        timeStamp: e.timeStamp
      }
    },
    onMove(e) {
      if (!coords) {
        return
      }

      const { pageX, pageY } = touchEvent.getTouch(e)

      if (
        Math.abs(pageX - coords.startX) >= 10 ||
        Math.abs(pageY - coords.startY) >= 10
      ) {
        coords = null
      }
    },
    onEnd(e) {
      if (coords) {
        isFunction(callback) &&
          callback({
            type: e.timeStamp - coords.timeStamp >= 800 ? 'long-press' : 'click'
          })
      }

      coords = null
    }
  }

  touchEvent.addListeners($el, ref)

  return function removeLongPressEvent() {
    touchEvent.removeListeners($el, ref)
  }
}
