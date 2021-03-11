<template>
  <div class="fx-swipe-cell fx-horizontal-hairline" ref="root">
    <div
      class="fx-swipe-cell_inner"
      :style="{
        transform: 'translate3d(-' + translateX + 'px, 0px, 0px)',
        transitionDuration: duration + 's'
      }"
    >
      <slot></slot>
      <div class="fx-swipe-cell_buttons" ref="buttonEls">
        <button
          class="fx-swipe-cell_button"
          :class="['type--' + item.type]"
          v-for="(item, index) in buttons2"
          :key="index"
          :style="{
            transform:
              'translate3d(-' +
              (buttonTranslateXs[index] || 0) +
              'px, 0px, 0px)',
            transitionDuration: duration + 's'
          }"
          @click="onButtonClick(item, index)"
          @mousedown.stop="noop"
          @touchstart.stop="noop"
        >
          {{ item.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, reactive } from 'vue'
import { getEnumsValue } from '../utils/validator'
import {
  cloneData,
  isArray,
  isObject,
  isString,
  rangeNumber
} from '../helpers/util'
import {
  addTouchDelegateEvent,
  removeTouchDelegateEvent
} from '../helpers/events'
import { StateTypes, STATE_TYPES } from '../utils/constants'
import { PropType } from 'vue'
import { useTouch, UseTouchCoords, UseTouchEvent } from '../utils/touch'
import { getStretchOffset } from '../helpers/animation'

interface ButtonOptions {
  text: string
  type?: StateTypes
}

interface SwipeCellCoords extends UseTouchCoords {
  startX: number
  buttonsW: number
  isShow: boolean
  isSwipe: boolean
}

export default defineComponent({
  name: 'fx-swipe-cell',
  props: {
    buttons: {
      type: Array as PropType<ButtonOptions[]>,
      validator: (val: any[]) => {
        if (isArray(val)) {
          for (let i = 0; i < val.length; i++) {
            if (!(isObject(val[i]) && isString(val[i].text))) return false
          }
          return true
        } else {
          return false
        }
      },
      default: () => []
    }
  },
  emits: ['button-click'],
  setup(props, ctx) {
    const root = ref<HTMLElement>()
    const buttonEls = ref<HTMLElement>()
    const translateX = ref(0)
    const duration = ref(0)
    const buttonTranslateXs = reactive<number[]>([])
    let coords: SwipeCellCoords | null

    function onTouchStart(e: UseTouchEvent) {
      if (props.buttons.length === 0) {
        return
      }

      coords = {
        startX: e.touchObject.clientX,
        buttonsW: (buttonEls.value as HTMLElement).clientWidth,
        isShow: translateX.value > 0,
        isSwipe: false
      }

      if (coords.isShow) {
        e.stopPropagation()
      }
    }

    function onTouchMove(e: UseTouchEvent) {
      if (!coords) {
        return
      }

      const { startX, buttonsW, isSwipe, isShow } = coords

      let x = startX - e.touchObject.clientX

      if (!isShow && !isSwipe && x < 0) {
        coords = null
        return
      }
      coords.isSwipe = true

      if (isShow) {
        x += buttonsW
      }

      const max = rangeNumber(x, 0, buttonsW)

      const $children = (buttonEls.value as HTMLElement).children

      for (let i = 0, len = $children.length; i < len; i++) {
        buttonTranslateXs[i] =
          (($children[i] as HTMLElement).offsetLeft * (buttonsW - max)) /
          buttonsW
      }

      translateX.value =
        max + (x > buttonsW ? getStretchOffset(x - buttonsW) : 0)
      duration.value = 0

      e.stopPropagation()
    }

    function onTouchEnd(e: UseTouchEvent) {
      if (coords) {
        const { isSwipe, buttonsW } = coords

        if (isSwipe && translateX.value > buttonsW / 2) {
          // 展示
          show(buttonsW)
        } else {
          hide()
        }

        coords = null
        e.stopPropagation()
      }
    }

    function show(x: number) {
      translateX.value = x
      duration.value = 0.6

      buttonTranslateXs.forEach((v, k) => {
        buttonTranslateXs[k] = 0
      })

      addTouchDelegateEvent(hide)
    }

    function hide() {
      translateX.value = 0
      duration.value = 0.6

      buttonTranslateXs.forEach((v, k) => {
        buttonTranslateXs[k] = 0
      })

      removeTouchDelegateEvent(hide)
    }

    function onButtonClick(item: ButtonOptions, index: number) {
      ctx.emit('button-click', {
        item: cloneData(item),
        index
      })
      hide()
    }

    const buttons2 = computed(() => {
      const buttons: ButtonOptions[] = []

      if (isArray(props.buttons)) {
        props.buttons.forEach(v => {
          if (isObject(v) && isString(v.text)) {
            buttons.push({
              text: v.text,
              type: getEnumsValue(STATE_TYPES, v.type) as StateTypes
            })
          }
        })
      }

      return buttons
    })

    useTouch({
      el: root,
      onTouchStart,
      onTouchMove,
      onTouchEnd
    })

    return {
      root,
      buttonEls,
      buttonTranslateXs,
      translateX,
      duration,
      buttons2,
      noop() {},
      onButtonClick
    }
  }
})
</script>
