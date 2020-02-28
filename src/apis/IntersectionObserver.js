import {
  isNumberArray,
  inArray,
  arrayLike2Array,
  isNumber
} from '../helpers/util'

/**
 * 将margins对象转为css字符串
 * @param margins
 */
function margins2String(margins = {}) {
  const { left, right, top, bottom } = margins
  const arr = []

  arr.push((isNumber(top) ? top : 0) + 'px')
  arr.push((isNumber(right) ? right : 0) + 'px')
  arr.push((isNumber(bottom) ? bottom : 0) + 'px')
  arr.push((isNumber(left) ? left : 0) + 'px')

  return arr.join(' ')
}

export function createIntersectionObserver(root, options) {
  let _root = root
  let _thresholds = [0]
  // let _initialRatio = 0 // 暂时未理解该字段含义
  let _observeAll = false
  let _rootMargins = '0px 0px 0px 0px'
  let _ios

  if (isNumberArray(options.thresholds)) {
    _thresholds = options.thresholds
  }

  if (options.observeAll === true) {
    _observeAll = true
  }

  // if (isNumber(options.initialRatio)) {
  //   _initialRatio = Math.max(0, Math.min(1, options.initialRatio))
  // }

  class AppIntersectionObserver {
    constructor() {
      return this
    }

    /**
     * 使用选择器指定一个节点，作为参照区域之一
     * @param selector
     */
    relativeTo(selector, margins) {
      const ignores = ['html', 'head', 'body']

      if (!inArray(selector.toLowerCase(), ignores)) {
        const root = document.querySelector(selector)

        if (root) {
          _root = root
          _rootMargins = margins2String(margins)
        }
      }

      return this
    }

    /**
     * 指定页面显示区域作为参照区域之一
     */
    relativeToViewport(margins) {
      _root = null
      _rootMargins = margins2String(margins)

      return this
    }

    observe(selector, callback) {
      let elems = []
      const parent = _root || document.body

      // 取到
      if (_observeAll) {
        elems = arrayLike2Array(parent.querySelectorAll(selector))
      } else {
        const elem = parent.querySelector(selector)
        if (elem) {
          elems.push(elem)
        }
      }

      function handler(entries) {
        const entry = entries[0]
        const {
          intersectionRatio,
          rootBounds,
          boundingClientRect,
          intersectionRect,
          time
        } = entry

        // 结构转义
        let res = {
          intersectionRatio,
          intersectionRect: {
            left: intersectionRect.left,
            right: intersectionRect.right,
            top: intersectionRect.top,
            bottom: intersectionRect.bottom,
            width: intersectionRect.width,
            height: intersectionRect.height
          },
          boundingClientRect: {
            left: boundingClientRect.left,
            right: boundingClientRect.right,
            top: boundingClientRect.top,
            bottom: boundingClientRect.bottom,
            width: boundingClientRect.width,
            height: boundingClientRect.height
          },
          relativeRect: {
            left: rootBounds.left,
            right: rootBounds.right,
            top: rootBounds.top,
            bottom: rootBounds.bottom
            // width: rootBounds.width,
            // height: rootBounds.height,
          },
          time
        }

        callback(res)
      }

      elems.forEach(function(elem) {
        const io = new IntersectionObserver(
          function(entries) {
            handler(entries)
          },
          {
            root: _root,
            threshold: _thresholds,
            rootMargin: _rootMargins
          }
        )
        io.observe(elem)

        _ios.push(io)
      })
    }

    disconnect() {
      _ios.forEach(io => {
        io.disconnect()
      })
    }
  }

  return new AppIntersectionObserver()
}
