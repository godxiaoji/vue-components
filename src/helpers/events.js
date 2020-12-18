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

let scrollCallbacks = []

function onScroll(e) {
  scrollCallbacks.forEach(callback => {
    callback.call(callback, e)
  })
}

export function addScrollEvent(callback) {
  if (scrollCallbacks.length === 0) {
    document.addEventListener('scroll', onScroll, false)
  }

  if (isFunction(callback)) {
    scrollCallbacks.push(callback)
  }
}

export function removeScrollEvent(callback) {
  let index = -1

  for (let i = 0; i < scrollCallbacks.length; i++) {
    if (scrollCallbacks[i] == callback) {
      index = i
      break
    }
  }

  if (index >= 0) {
    scrollCallbacks.splice(index, 1)

    if (scrollCallbacks.length === 0) {
      document.removeEventListener('scroll', onScroll, false)
    }
  }
}

export function init() {
  if (isMobile) {
    if (isIOS) {
      console.log('support active')
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
  },
  removeListeners($el, ref) {
    $el.removeEventListener(touchOptions.touchstart, ref, touchOptions.options)
    $el.removeEventListener(touchOptions.touchmove, ref, touchOptions.options)
    $el.removeEventListener(touchOptions.touchend, ref, touchOptions.options)
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
