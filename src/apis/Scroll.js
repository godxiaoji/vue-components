import { frameTo } from '@/helpers/animation'
import { getScrollDom } from '@/helpers/dom'
import { getCallbackFns } from '@/apis/callback'
import { parseParamsByRules } from '@/apis/rules'

/**
 * 将页面滚动到目标位置（可以设置滚动动画时长）
 * @param object
 */
export function pageScrollTo(object) {
  const { success, fail, complete } = getCallbackFns(object)

  try {
    const options = parseParamsByRules(object, 'pageScrollTo')

    _elementScrollTo(document, options.scrollTop, options.duration)

    success({})
  } catch (e) {
    fail(e)
  }

  complete()
}

/**
 * 将元素滚动到目标位置（可以设置滚动动画时长）
 * @param object
 */
export function elementScrollTo(object) {
  const { success, fail, complete } = getCallbackFns(object)

  try {
    const options = parseParamsByRules(object, 'elementScrollTo')

    _elementScrollTo(options.element, options.scrollTop, options.duration)

    success({})
  } catch (e) {
    fail(e)
  }

  complete()
}

function _elementScrollTo(element, scrollTop, duration) {
  if (element === document) {
    element = getScrollDom()
  }

  const from = element.scrollTop

  if (from === scrollTop) {
    // 不需要跳转
  } else if (duration === 0) {
    // 不需要动画
    element.scrollTop = scrollTop
  } else {
    frameTo({
      from,
      to: scrollTop,
      duration,
      progress(res) {
        element.scrollTop = res.current
      }
    })
  }
}
