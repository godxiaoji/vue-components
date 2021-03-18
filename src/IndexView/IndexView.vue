<template>
  <div class="fx-index-view">
    <div class="fx-index-view_sidebar">
      <ul class="fx-index-view_list" ref="navigation">
        <li
          :class="{ active: item.value === activeIndex }"
          v-for="item in indexList"
          :data-value="item.value"
          :key="item.value"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="fx-index-view_body">
      <sticky-view
        :offset-top="stickyOffsetTop"
        ref="body"
        v-model:activeIndex="activeIndex"
        @reset-items="onResetItems"
        @change="onChange"
      >
        <slot></slot>
      </sticky-view>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ComponentPublicInstance,
  defineComponent,
  onMounted,
  reactive,
  ref,
  shallowRef
} from 'vue'
import StickyView from '@/StickyView'
import { sizeValidator } from '@/helpers/validator'
import { rangeInteger } from '@/helpers/util'
import { ScrollToIndexOptions, ScrollToOptions } from '@/helpers/types'
import { useTouch } from '@/hooks/touch'

export default defineComponent({
  name: 'fx-index-view',
  components: { StickyView },
  props: {
    stickyOffsetTop: {
      validator: sizeValidator,
      default: 0
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const navigation = ref<HTMLElement>()
    const body = shallowRef<ComponentPublicInstance<typeof StickyView>>()
    const indexList = reactive<
      {
        value: number
        label: string
      }[]
    >([])
    const activeIndex = ref(0)

    function resetContainer(containSelector: any) {
      body.value && body.value.resetContainer(containSelector)
    }

    function onResetItems(items: { name: string; index: number }[]) {
      indexList.splice(
        0,
        Infinity,
        ...items.map(item => {
          return {
            value: item.index,
            label: item.name
          }
        })
      )
    }

    function onChange(res: { activeIndex: number }) {
      emit('change', res)
    }

    /**
     * 滚动到第index个
     * @param index 索引
     */
    function scrollToIndex(index: number | ScrollToIndexOptions) {
      body.value && body.value.scrollToIndex(index)
    }

    /**
     * 滚到到指定位置
     * @param scrollTop 位置值
     */
    function scrollToOffset(scrollTop: number | ScrollToOptions) {
      body.value && body.value.scrollToOffset(scrollTop)
    }

    let coords: any
    let changeTimer: number

    useTouch({
      el: navigation,
      onTouchStart(e) {
        const { clientY } = e.touchObject

        const $target = e.target as HTMLElement
        const value = parseInt($target.dataset.value as string)
        const rects = $target.getClientRects()[0]

        coords = {
          size: rects.height,
          offsetY: clientY - rects.top,
          startY: clientY,
          current: value
        }

        clearTimeout(changeTimer)
        changeTimer = window.setTimeout(() => {
          activeIndex.value = value
        }, 500)

        e.preventDefault()
      },

      onTouchMove(e) {
        if (!coords) {
          return
        }

        const { clientY } = e.touchObject
        const { startY, size, offsetY, current } = coords

        const y = clientY - startY

        let offsetCount = 0

        if (y > 0) {
          offsetCount =
            Math.floor(y / size) + (y % size > size - offsetY ? 1 : 0)
        } else if (y < 0) {
          offsetCount = -Math.floor(-y / size) + (-y % size > offsetY ? -1 : 0)
        }

        if (offsetCount !== 0) {
          clearTimeout(changeTimer)
          coords.isChange = true

          changeTimer = window.setTimeout(() => {
            activeIndex.value = rangeInteger(
              current + offsetCount,
              0,
              indexList.length - 1
            )
          }, 100)
        }

        e.stopPropagation()
      },

      onTouchEnd(e) {
        if (coords) {
          if (!coords.isChange) {
            clearTimeout(changeTimer)
            activeIndex.value = coords.current
          }

          coords = null
          e.stopPropagation()
        }
      }
    })

    onMounted(() => resetContainer(document))

    return {
      navigation,
      body,
      activeIndex,
      indexList,
      onChange,
      scrollToIndex,
      scrollToOffset,
      resetContainer,
      onResetItems
    }
  }
})
</script>
