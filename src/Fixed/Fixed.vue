<template>
  <div class="fx-fixed" :style="styles" ref="root">
    <!--fixed start-->
    <div
      class="fx-fixed_fixed"
      ref="fixed"
      :class="[placementClassName]"
      :style="fixedStyles"
    >
      <slot></slot>
    </div>
    <!--fixed end-->
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  toRef
} from 'vue'
import { createEnumsValidator, getEnumsValue } from '@/helpers/validator'
import { capitalize } from '@/helpers/util'
import { PlacementTypes, PLACEMENT_TYPES } from '@/hooks/constants'
import { useResizeDetector } from '@/hooks/resize-detector'
import { useSafeAreaInsets } from '@/hooks/safe-area-insets'
import { StyleObject } from '@/helpers/types'

export default defineComponent({
  name: 'fx-fixed',
  inject: {
    disableFixed: {
      default: false
    }
  },
  props: {
    // 固定方向
    placement: {
      type: String as PropType<PlacementTypes>,
      validator: createEnumsValidator(PLACEMENT_TYPES),
      default: null
    },
    // 是否开启安全区
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    },
    background: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: 1
    },
    spaceHold: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const width = ref(0)
    const height = ref(0)
    const root = ref<HTMLElement>()
    const fixed = ref<HTMLElement>()
    const disableFixed = inject('disableFixed', false)

    const safeAreaInsets = useSafeAreaInsets(
      toRef(props, 'enableSafeAreaInsets')
    )

    function updateSize() {
      const { offsetWidth, offsetHeight } = fixed.value as HTMLElement

      width.value = offsetWidth
      height.value = offsetHeight
    }

    const placementClassName = computed(
      () => 'placement--' + getEnumsValue(PLACEMENT_TYPES, props.placement)
    )

    const styles = computed(() => {
      return {
        width: (props.spaceHold ? width.value : 0) + 'px',
        height: (props.spaceHold ? height.value : 0) + 'px'
      }
    })

    const fixedStyles = computed(() => {
      const styles: StyleObject = {
        background: props.background,
        zIndex: props.zIndex.toString()
      }

      const placement = getEnumsValue(PLACEMENT_TYPES, props.placement)
      if (props.enableSafeAreaInsets && safeAreaInsets.support) {
        styles['padding' + capitalize(placement)] =
          safeAreaInsets[placement as 'top'] + 'px'
      }

      return styles
    })

    useResizeDetector(fixed, updateSize)

    onMounted(() => {
      if (disableFixed) {
        // 针对在tranform下 fixed 会失效的问题
        document.body.append(fixed.value as HTMLElement)
      }

      updateSize()
    })

    onBeforeUnmount(() => {
      if (disableFixed) {
        ;(root.value as HTMLElement).append(fixed.value as HTMLElement)
      }
    })

    return {
      root,
      fixed,
      placementClassName,
      styles,
      fixedStyles,
      safeAreaInsets
    }
  }
})
</script>
