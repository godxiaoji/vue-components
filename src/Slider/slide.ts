import { UseProps } from '../helpers/types'
import { isNumeric, rangeNumber } from '@/helpers/util'
import { useTouch } from '@/hooks/touch'
import { ref } from 'vue'
import { addClassName, getRelativeOffset, removeClassName } from '@/helpers/dom'

export const slideProps = {
  min: {
    type: [Number, String],
    validator: isNumeric,
    default: 0
  },
  max: {
    type: [Number, String],
    validator: isNumeric,
    default: 100
  },
  step: {
    type: [Number, String],
    validator: isNumeric,
    default: 1
  },
  showValue: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: null
  }
}

export const slideEmits = ['input']

interface Coords {
  prevValue: number // 滑动之前value值
  thumb: boolean // 是否点击了滑块
  thumbW: number // 滑块宽度
  clientStartX: number // 按下初始位置
  thumbXInTrack: number // 按下滑块在滑轨内的初始位置
  trackX: number // 按下滑轨的初始位置
  trackW: number // 滑轨宽度
  moved: boolean // 是否滑动
  $target: HTMLElement // 滑动元素
}

interface UseOptions {
  getValue: ($target: HTMLElement) => number
  move: (args: {
    value: number
    progress: number
    $target: HTMLElement
  }) => void
  end: (args: {
    value: number
    isChange: boolean
    $target: HTMLElement
  }) => void
}

export function useSlide(props: UseProps, { move, end, getValue }: UseOptions) {
  const slider = ref<HTMLElement>()

  const thumbW = 24
  let coords: Coords | null
  let tempValue = 0

  function toInteger(number: string | number) {
    return Math.round(number as number)
  }

  function getMinMax() {
    let min = toInteger(props.min)
    let max = toInteger(props.max)

    if (min > max) {
      // 兼容min max搞反的问题
      max = [min, (min = max)][0]
    }

    return { min, max }
  }

  function value2Progress(val: number) {
    const { min, max } = getMinMax()

    return (val - min) / (max - min)
  }

  function rangeValue(val: number) {
    const { min, max } = getMinMax()

    return rangeNumber(val, min, max)
  }

  function updateByX(x: number, { trackW, prevValue, $target }: Coords) {
    x = rangeNumber(x, 0, trackW)

    const { min, max } = getMinMax()
    const step = toInteger(props.step)

    let newVal = toInteger(((max - min) * x) / trackW + min)
    newVal = toInteger((newVal - prevValue) / step) * step + prevValue
    newVal = rangeNumber(newVal, min, max)

    tempValue = newVal

    move({ value: tempValue, progress: value2Progress(newVal), $target })
  }

  useTouch({
    el: slider,
    onTouchStart(e) {
      if (props.disabled) {
        // 禁用
        return
      }

      const { clientX } = e.touchObject

      const $target = e.target as HTMLElement
      const trackRects = (slider.value as HTMLElement).getClientRects()[0]
      const thumb = !!$target.dataset.thumb

      coords = {
        prevValue: getValue($target),
        thumb,
        thumbW,
        clientStartX: clientX,
        thumbXInTrack: getRelativeOffset($target, slider.value).offsetLeft,
        trackX: trackRects.left,
        trackW: trackRects.width - thumbW,
        moved: false,
        $target
      }

      if (thumb) {
        addClassName($target, 'active')
      }

      tempValue = coords.prevValue

      e.preventDefault()
    },

    onTouchMove(e) {
      if (!coords) {
        return
      }

      coords.moved = true

      if (!coords.thumb) {
        return
      }

      const { clientX } = e.touchObject
      const { clientStartX, thumbXInTrack } = coords

      updateByX(thumbXInTrack + clientX - clientStartX, coords)

      e.stopPropagation()
    },

    onTouchEnd(e) {
      if (coords) {
        if (!coords.thumb && !coords.moved) {
          updateByX(
            coords.clientStartX - coords.trackX - coords.thumbW / 2,
            coords
          )
        }

        if (coords.thumb) {
          removeClassName(coords.$target, 'active')
        }

        end({
          value: tempValue,
          isChange: coords.prevValue !== tempValue,
          $target: coords.$target
        })

        coords = null
        e.stopPropagation()
      }
    }
  })

  return {
    slider,
    toInteger,
    rangeValue,
    value2Progress,
    getMinMax
  }
}
