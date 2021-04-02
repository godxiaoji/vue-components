import { frameTo } from '@/helpers/animation'
import { getScrollDom, querySelector } from '@/helpers/dom'
import { getCallbackFns } from '@/apis/callback'
import { parseParamsByRules } from '@/apis/rules'
import { ApiOptions } from './types'
import Exception from '@/helpers/exception'

interface ScrollCallback {
  ({ from, to }: { from: number; to: number }): void
}

/**
 * 将页面滚动到目标位置（可以设置滚动动画时长）
 * @param object
 */
export function pageScrollTo(object: ApiOptions) {
  const { success, fail, complete } = getCallbackFns(object)

  return new Promise((resolve, reject) => {
    try {
      const options = parseParamsByRules(object, 'pageScrollTo')
      const callback: ScrollCallback = res => {
        success(res)
        complete()
        resolve(res)
      }

      elementScrollTo(document, options.scrollTop, options.duration, callback)
    } catch (e) {
      fail(e)
      complete()

      reject(e)
    }
  })
}

/**
 * 将元素滚动到目标位置（可以设置滚动动画时长）
 * @param object
 */
export function scrollTo(object: ApiOptions) {
  const { success, fail, complete } = getCallbackFns(object)

  return new Promise((resolve, reject) => {
    try {
      const options = parseParamsByRules(object, 'scrollTo')
      const callback: ScrollCallback = res => {
        success(res)
        complete()
        resolve(res)
      }
      const element = querySelector(options.selector)

      if (!element) {
        console.error(
          new Exception(
            '通过"selector"找不到对应Element.',
            Exception.TYPE.PARAM_ERROR,
            'scrollTo'
          )
        )
        return
      }

      elementScrollTo(element, options.scrollTop, options.duration, callback)
    } catch (e) {
      fail(e)
      complete()

      reject(e)
    }
  })
}

function elementScrollTo(
  element: HTMLElement | Document,
  scrollTop: number,
  duration: number,
  callback: ScrollCallback
) {
  const $el: HTMLElement =
    element === document ? getScrollDom() : (element as HTMLElement)

  const from = $el.scrollTop

  function done() {
    callback({
      from,
      to: scrollTop
    })
  }

  if (from === scrollTop) {
    // 不需要跳转
    done()
  } else if (duration === 0) {
    // 不需要动画
    $el.scrollTop = scrollTop
    done()
  } else {
    frameTo({
      from,
      to: scrollTop,
      duration,
      progress({ current }) {
        $el.scrollTop = current
      },
      complete({ current }) {
        $el.scrollTop = current
        done()
      }
    })
  }
}
