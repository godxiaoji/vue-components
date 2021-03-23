import { addLongPressEvent } from '@/helpers/events'
import { onBeforeUnmount, onMounted, Ref } from 'vue'
import { MixEventCallback } from '../helpers/types'

interface OffFn {
  (): void
}

export function useLongPress(
  el: Ref<HTMLElement | undefined>,
  callback: MixEventCallback
) {
  let longPressOff: OffFn

  onMounted(() => {
    longPressOff = addLongPressEvent(el.value as HTMLElement, callback)
  })

  onBeforeUnmount(() => longPressOff())
}
