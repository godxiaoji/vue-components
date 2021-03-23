import { computed, SetupContext, PropType, ref, nextTick, watch } from 'vue'
import { cloneData } from '@/helpers/util'
import {
  selectorValidator,
  createEnumsValidator,
  getEnumsValue
} from '@/helpers/validator'
import { querySelector } from '@/helpers/dom'
import { PLACEMENT_TYPES } from '@/hooks/constants'
import type { PlacementType } from '../hooks/constants'
import { usePopup, popupProps, popupEmits } from '@/hooks/popup'
import type { StyleObject, UseProps } from '../helpers/types'

type PopoverPos = {
  t: number | null
  r: number | null
  b: number | null
  l: number | null
  at: number | null
  ar: number | null
  ab: number | null
  al: number | null
  mw: number
  mh: number
}

const DEFAULT_POS: PopoverPos = {
  t: null,
  r: null,
  b: null,
  l: null,
  at: null,
  ar: null,
  ab: null,
  al: null,
  mw: 0,
  mh: 0
}

export const popoverProps = {
  ...popupProps,
  selector: {
    type: String as PropType<string | HTMLElement>,
    validator: selectorValidator,
    required: true
  },
  placement: {
    type: String as PropType<PlacementType>,
    validator: createEnumsValidator(PLACEMENT_TYPES),
    default: getEnumsValue(PLACEMENT_TYPES)
  },
  showMask: {
    type: Boolean,
    default: true
  }
}

export const popoverEmits = [...popupEmits]

export function usePopover(props: UseProps, ctx: SetupContext<any>) {
  const padding = 8
  const inner = ref<HTMLElement>()
  const isShow = ref(false)
  let pos = cloneData<PopoverPos>(DEFAULT_POS)

  const popupOptions = {
    afterShow() {
      nextTick(() => {
        updatePos()
      })
    },
    afterHidden() {
      pos = cloneData(DEFAULT_POS)
      isShow.value = false
    },
    forbidScroll: true,
    useBlur: false
  }

  const popup = usePopup(props, ctx, popupOptions)

  function updatePos() {
    const $target = querySelector(props.selector)

    if (!$target) {
      return
    }

    const placement = getEnumsValue(PLACEMENT_TYPES, props.placement)

    const rect = $target.getBoundingClientRect()
    const { clientWidth: iw, clientHeight: ih } = inner.value as HTMLElement
    const { clientWidth: dw, clientHeight: dh } = document.documentElement

    pos = Object.assign(cloneData(DEFAULT_POS), { mw: dw - 16, mh: dh - 16 })

    if (placement === 'top' || placement === 'bottom') {
      pos.al = rect.left + rect.width / 2 - 5
      pos.l = rect.left + rect.width / 2 - iw / 2

      if (pos.l < padding) {
        pos.l = padding
      } else if (pos.l + iw > dw - padding) {
        pos.l -= pos.l + iw - (dw - padding)
      }
      pos.al = pos.al - pos.l

      if (placement === 'bottom') {
        pos.at = -4
        pos.t = rect.bottom + 7
      } else {
        pos.ab = -4
        pos.b = dh - rect.top + 7
      }
    } else {
      pos.at = rect.top + rect.height / 2 - 5
      pos.t = rect.top + rect.height / 2 - ih / 2

      if (pos.t < padding) {
        pos.t = padding
      } else if (pos.t + ih > dh - padding) {
        pos.t -= pos.t + ih - (dh - padding)
      }
      pos.at = pos.at - pos.t

      if (placement === 'right') {
        pos.al = -4
        pos.l = rect.right + 7
      } else {
        pos.ar = -4
        pos.r = dw - rect.left + 7
      }
    }

    isShow.value = true
  }

  const arrowStyles = computed(() => {
    if (!isShow.value) {
      return { left: '200vw', top: '200vh' } as StyleObject
    }

    const styles: StyleObject = {}

    pos.at != null && (styles.top = pos.at + 'px')
    pos.ar != null && (styles.right = pos.ar + 'px')
    pos.ab != null && (styles.bottom = pos.ab + 'px')
    pos.al != null && (styles.left = pos.al + 'px')

    return styles
  })

  const innerStyles = computed(() => {
    const { clientWidth: dw, clientHeight: dh } = document.documentElement

    if (!isShow.value) {
      return {
        left: '0px',
        top: '0px',
        maxWidth: dw - padding * 2 + 'px',
        maxHeight: dh - padding * 2 + 'px'
      } as StyleObject
    }

    const styles: StyleObject = {
      maxWidth: pos.mw + 'px',
      maxHeight: pos.mh + 'px'
    }

    pos.t != null && (styles.top = pos.t + 'px')
    pos.r != null && (styles.right = pos.r + 'px')
    pos.b != null && (styles.bottom = pos.b + 'px')
    pos.l != null && (styles.left = pos.l + 'px')

    return styles
  })

  watch(
    () => props.showMask,
    val => {
      popupOptions.forbidScroll = !!val
      popupOptions.useBlur = !val
    },
    {
      immediate: true
    }
  )

  return {
    ...popup,
    inner,
    arrowStyles,
    innerStyles
  }
}
