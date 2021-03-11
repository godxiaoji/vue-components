import { onBeforeUnmount } from 'vue'
import { getScrollDom } from '../helpers/dom'
import {
  addEvent,
  EventCallback,
  EventElement,
  removeEvent
} from '../helpers/events'

export interface OnScrollCallback {
  (
    e: Event,
    res: {
      scrollTop: number
    }
  ): void
}

export function useScrollEvent($el: EventElement, callback: OnScrollCallback) {
  const onScroll: EventCallback = (e, $el) => {
    callback(e, {
      scrollTop: getScrollDom($el).scrollTop
    })
  }

  addEvent('scroll', onScroll, $el)

  let isOff = false

  function off() {
    if (!isOff) {
      isOff = true
      removeEvent('scroll', onScroll, $el)
    }
  }

  onBeforeUnmount(() => off)

  return off
}
