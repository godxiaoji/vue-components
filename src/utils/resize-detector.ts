import { removeEl } from '@/helpers/dom'
import { ComponentPublicInstance, onBeforeUnmount, onMounted, Ref } from 'vue'
import { isElement } from '@/helpers/util'

type ResizeDetectorStopHandle = () => void
type ResizeDetectorCallback = () => void

/**
 * 监听元素大小变化
 * @param {Element} $el 被监听的元素
 * @param {Function} callback 回调函数
 */
export function resizeDetector(
  $el: Element,
  callback: ResizeDetectorCallback
): ResizeDetectorStopHandle {
  // 监听
  const object = document.createElement('object') as any
  object.style.cssText =
    'display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;'
  object.tabIndex = -1
  object.type = 'text/html'
  object.setAttribute('aria-hidden', 'true')
  object.data = 'about:blank'
  object.onload = function() {
    if (!object.destroyed) {
      object.contentDocument.defaultView.addEventListener('resize', callback)
    }
  }

  $el.appendChild(object)

  return function off() {
    object.destroyed = true
    if (object.contentDocument) {
      object.contentDocument.defaultView.removeEventListener('resize', callback)
    }
    removeEl(object)
  }
}

export function useResizeDetector(
  ctx: Ref<ComponentPublicInstance | HTMLElement | undefined>,
  callback: ResizeDetectorCallback
) {
  let stopHandle: ResizeDetectorStopHandle

  onMounted(() => {
    const $el = isElement(ctx.value)
      ? (ctx.value as HTMLElement)
      : (ctx as Ref<ComponentPublicInstance>).value.$el

    stopHandle = resizeDetector($el, callback)
  })

  onBeforeUnmount(() => stopHandle())

  return {}
}
