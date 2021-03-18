import { onBeforeUnmount, onMounted, Ref } from 'vue'
import { touchEvent } from '@/helpers/events'
import { DataObject } from '@/helpers/types'

export interface UseTouchEvent extends Event {
  touchObject: any
  target: HTMLElement
}

export interface UseTouchCoords {
  [propName: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | DataObject<string | number | boolean>
    | string[]
}

interface UseOptions {
  el: Ref<HTMLElement | undefined>
  onTouchStart: (e: UseTouchEvent) => void
  onTouchMove: (e: UseTouchEvent) => void
  onTouchEnd: (e: UseTouchEvent) => void
  handleEvent?: (e: Event) => void
}

const {
  touchstart,
  touchmove,
  touchend,
  addListeners,
  removeListeners,
  getTouch
} = touchEvent

export function useTouch({
  el,
  onTouchStart,
  onTouchMove,
  onTouchEnd
}: UseOptions) {
  const object = {
    handleEvent(e: Event) {
      ;(e as UseTouchEvent).touchObject = getTouch(e)

      switch (e.type) {
        case touchstart:
          onTouchStart(e as UseTouchEvent)
          break
        case touchmove:
          onTouchMove(e as UseTouchEvent)
          break
        case touchend:
          onTouchEnd(e as UseTouchEvent)
          break
        case 'mouseleave':
          onTouchEnd(e as UseTouchEvent)
          break
        default:
          break
      }
    }
  }

  onMounted(() => addListeners((el as Ref<HTMLElement>).value, object))

  onBeforeUnmount(() => removeListeners((el as Ref<HTMLElement>).value, object))

  return {}
}
