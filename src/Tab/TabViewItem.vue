<template>
  <div
    class="fx-swiper-item fx-tab-view-item"
    :data-name="name"
    :data-subName="subName"
    ref="root"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  onMounted,
  inject,
  onUnmounted,
  onUpdated
} from 'vue'
import { createUpdateInItem } from '@/hooks/list'
import { useTouch, UseTouchEvent } from '@/hooks/touch'

export default defineComponent({
  name: 'fx-tab-view-item',
  props: {
    name: {
      type: String,
      required: true
    },
    subName: {
      type: String,
      default: null
    }
  },
  setup() {
    const root = ref<HTMLElement>()
    const swiperUpdate = inject('fxSwiperUpdate', (lazy?: number) => {})
    const tabViewUpdate = inject(
      'fxTabViewUpdate',
      createUpdateInItem('tab-view')
    )
    const vertical = inject('fxTabViewVertical', false)

    function update() {
      swiperUpdate()
      tabViewUpdate()
    }

    onMounted(() => update())
    onUnmounted(() => update())
    onUpdated(() => {
      const $item = root.value as HTMLElement

      if ($item.offsetWidth === 0 || $item.offsetHeight === 0) {
        // 解决默认 hidden 的问题
        update()
      }
    })

    let coords: any

    useTouch({
      el: root,
      onTouchStart(e: UseTouchEvent) {
        const {
          scrollHeight,
          scrollTop,
          clientHeight,
          scrollLeft,
          scrollWidth,
          clientWidth
        } = e.currentTarget as HTMLElement

        const touch = e.touchObject

        if (
          (vertical &&
            (scrollHeight === scrollTop + clientHeight || scrollTop === 0)) ||
          (!vertical &&
            (scrollWidth === scrollLeft + clientWidth || scrollLeft === 0))
        ) {
          if (scrollHeight !== clientHeight || scrollWidth !== clientWidth) {
            coords = {
              vertical,
              position:
                (vertical && scrollTop === 0) || (!vertical && scrollLeft === 0)
                  ? 1
                  : 2,
              startX: touch.pageX,
              startY: touch.pageY,
              timeStamp: e.timeStamp
            }
          }
        } else {
          // 滚动到中间，直接拒绝掉
          coords = {
            stop: true
          }
          // e.stopPropagation()
        }
      },
      onTouchMove(e) {
        if (!coords) {
          return
        }

        if (coords.stop) {
          e.stopPropagation()
          return
        }

        const { pageX, pageY } = e.touchObject

        const offset = coords.vertical
          ? coords.startY - pageY
          : coords.startX - pageX

        if (
          (coords.position === 1 && offset > 0) ||
          (coords.position === 2 && offset < 0)
        ) {
          coords.stop = true
          e.stopPropagation()
        }
      },
      onTouchEnd() {
        coords = null
      }
    })

    return {
      root
    }
  }
})
</script>
