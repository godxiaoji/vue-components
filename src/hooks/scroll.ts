import { onBeforeUnmount } from 'vue'
import { getScrollDom } from '@/helpers/dom'
import { addEvent, removeEvent } from '@/helpers/events'
import { EventElement, EventCallback } from '../helpers/types'
import { OnScrollCallback } from './types'

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
