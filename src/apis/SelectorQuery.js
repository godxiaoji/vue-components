import {
  isFunction,
  isStringArray,
  inArray,
  objectForEach
} from '../helpers/util'

function getDataset(object) {
  const dataset = {}

  objectForEach(object, (value, key) => {
    if (key.indexOf('v-') === 0) {
      // 屏蔽带v-的vue属性
    } else {
      dataset[key] = value
    }
  })

  return dataset
}

/**
 * 返回一个 SelectorQuery 对象实例
 * @summary 安全性要求，使用多层闭包禁止暴露私有变量，如'Element'等
 * @param root
 */
export function createSelectorQuery(root) {
  let _root = root
  let _selectorQuery
  let _execQueue = []

  class SelectorQuery {
    constructor() {
      return this
    }

    /**
     * api那边设置组件in传入
     * @param component
     */
    in(component) {
      // 加入组件的方法
      if (component) {
        if (component.$el && component.$el.nodeType === 1) {
          _root = component.$el
        } else if (component.nodeType === 1) {
          _root = component
        }
      }
      return this
    }

    /**
     * 在当前页面下选择第一个匹配选择器 selector 的节点
     */
    select(selector) {
      const target = (_root || document.body).querySelector(selector)

      return createNodesRef(target)
    }

    /**
     * 在当前页面下选择匹配选择器 selector 的所有节点。
     */
    selectAll(selector) {
      const targets = (_root || document.body).querySelectorAll(selector)

      return createNodesRef(targets)
    }

    /**
     * 选择显示区域
     */
    selectViewport() {
      return createNodesRef(document.documentElement)
    }

    exec(callback) {
      const res = _execQueue.map(function(handler) {
        return handler()
      })

      if (isFunction(callback)) {
        callback(res)
      }
    }
  }

  function createNodesRef(object) {
    let selectAll = false
    const targets = []

    if (object instanceof NodeList) {
      selectAll = true
      object.forEach(elem => {
        targets.push(elem)
      })
    } else {
      targets.push(object)
    }

    class NodesRef {
      constructor() {
        return this
      }

      boundingClientRect(callback) {
        const handler = function() {
          const list = targets.map(function(elem) {
            const boundingClientRect = elem.getBoundingClientRect()

            return {
              id: elem.id,
              dataset: getDataset(elem.dataset),
              left: boundingClientRect.left,
              right: boundingClientRect.right,
              top: boundingClientRect.top,
              bottom: boundingClientRect.bottom,
              width: boundingClientRect.width,
              height: boundingClientRect.height
            }
          })

          const result = selectAll ? list : list[0]

          if (isFunction(callback)) {
            callback(result)
          }

          return result
        }

        _execQueue.push(handler)

        // 又返回query实例，方便执行exec
        return _selectorQuery
      }

      scrollOffset(callback) {
        const handler = function() {
          const list = targets.map(function(elem) {
            return {
              id: elem.id,
              dataset: getDataset(elem.dataset),
              scrollLeft: elem.scrollLeft,
              scrollTop: elem.scrollTop
            }
          })

          const result = selectAll ? list : list[0]

          if (isFunction(callback)) {
            callback(result)
          }

          return result
        }

        _execQueue.push(handler)

        // 又返回query实例，方便执行exec
        return _selectorQuery
      }

      fields(fields, callback) {
        const handler = function() {
          const list = targets.map(function(elem) {
            const item = {}

            if (fields.id === true) {
              item.id = elem.id
            }

            if (fields.dataset === true) {
              item.dataset = getDataset(elem.dataset)
            }

            if (fields.scrollOffset === true) {
              item.scrollLeft = elem.scrollLeft
              item.scrollTop = elem.scrollTop
            }

            if (fields.size === true || fields.rect === true) {
              const boundingClientRect = elem.getBoundingClientRect()

              if (fields.size === true) {
                item.width = boundingClientRect.width
                item.height = boundingClientRect.height
              }

              if (fields.rect === true) {
                item.left = boundingClientRect.left
                item.right = boundingClientRect.right
                item.top = boundingClientRect.top
                item.bottom = boundingClientRect.bottom
              }
            }

            // 指定属性名列表，返回节点对应属性名的当前属性值（只能获得组件文档中标注的常规属性值，id class style 和事件绑定的属性值不可获取）
            if (isStringArray(fields.properties)) {
              const ignoreProps = ['class', 'className', 'style', 'id']
              fields.properties.forEach(function(propName) {
                if (!inArray(propName, ignoreProps)) {
                  item[propName] = elem[propName]
                }
              })
            }

            // 指定样式名列表，返回节点对应样式名的当前值
            if (
              isStringArray(fields.computedStyle) &&
              fields.computedStyle.length > 0
            ) {
              const computedStyleMap = getComputedStyle(elem, null)
              fields.computedStyle.forEach(function(styleName) {
                item[styleName] = computedStyleMap.getPropertyValue(styleName)
              })
            }

            return item
          })

          const res = selectAll ? list : list[0]

          if (isFunction(callback)) {
            callback(res)
          }

          return res
        }

        _execQueue.push(handler)

        // 又返回query实例，方便执行exec
        return _selectorQuery
      }
    }

    return new NodesRef()
  }

  return (_selectorQuery = new SelectorQuery())
}
