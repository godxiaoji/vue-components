import { frameTo } from '../helpers/animation'
import { isNumber } from '../helpers/util'

/**
 * 将页面滚动到目标位置（可以设置滚动动画时长）
 * @param object
 */
export function pageScrollTo(object) {
  elementScrollTo(document.documentElement, object)
}

/**
 * 将元素滚动到目标位置（可以设置滚动动画时长）
 * @param object
 */
export function elementScrollTo(element, object) {
  const to =
    isNumber(object.scrollTop) && object.scrollTop >= 0 ? object.scrollTop : 0
  const from = element.scrollTop

  if (from === to) {
    // 不需要跳转
  } else if (object.duration === 0) {
    // 不需要动画
    element.scrollTop = to
  } else {
    const duration = object.duration > 0 ? object.duration : 300

    frameTo({
      from,
      to,
      duration,
      progress(res) {
        element.scrollTop = res.current
      }
    })
  }
}
