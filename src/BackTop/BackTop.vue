<template>
  <div v-show="isShow" class="fx-back-top" :style="styles" @click="onClick">
    <slot>
      <icon icon="UpCircleOutlined" />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, ref } from 'vue'
import Icon from '@/Icon'
import { getScrollDom } from '@/helpers/dom'
import { useSafeAreaInsets } from '@/utils/safe-area-insets'
import { isNumber, isNumberArray } from '@/helpers/util'
import { OnScrollCallback, useScrollEvent } from '@/utils/scroll'

export default defineComponent({
  name: 'fx-back-top',
  components: { Icon },
  props: {
    visibleHeight: {
      type: Number,
      default: 200
    },
    // 是否需要动画
    animated: {
      type: Boolean,
      default: true
    },
    // 偏移量，格式为 [x, y]
    offset: {
      type: [Number, Array],
      default: 0
    },
    // 是否开启安全区
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    }
  },
  setup(props, ctx) {
    const isShow = ref(getScrollDom().scrollTop >= props.visibleHeight)

    const onScroll: OnScrollCallback = (e: Event, { scrollTop }) => {
      isShow.value = scrollTop >= props.visibleHeight
    }

    function toTop() {
      getScrollDom().scrollTo({
        top: 0,
        behavior: props.animated ? 'smooth' : 'auto'
      })
    }

    function onClick(e: Event) {
      toTop()

      ctx.emit(e.type, e)
    }

    const safeAreaInsets = useSafeAreaInsets(
      toRef(props, 'enableSafeAreaInsets')
    )

    const styles = computed(() => {
      let offset = [0, 0]
      if (isNumber(props.offset)) {
        offset = [props.offset as number, props.offset as number]
      } else if (
        isNumberArray(props.offset) &&
        (props.offset as number[]).length > 1
      ) {
        offset = props.offset as number[]
      }

      return {
        transform: `translate3d(${offset[0]}px, ${offset[1] -
          safeAreaInsets.bottom}px, 0px)`
      }
    })

    useScrollEvent(document, onScroll)

    return {
      toTop,
      onClick,
      isShow,
      styles
    }
  }
})
</script>
