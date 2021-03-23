import {
  addEvent as _addEvent,
  removeEvent as _removeEvent
} from '@/helpers/events'
import { onBeforeUnmount } from 'vue'
import { EventCallback } from '../helpers/types'

interface OffFn {
  (): void
}

export function useBlur(callback: EventCallback) {
  let off: OffFn | null = null

  function addEvent() {
    // 单例
    if (!off) {
      _addEvent('click', callback, document)
      off = () => _removeEvent('click', callback, document)
    }
  }

  function removeEvent() {
    if (off) {
      off()
      off = null
    }
  }

  onBeforeUnmount(() => removeEvent)

  return { addEvent, removeEvent }
}
