<template>
  <div
    class="fx-skeleton-button"
    :class="[shapeClassName, { animated: useAnimation }]"
  ></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { createEnumsValidator } from '@/helpers/validator'
import {
  BUTTON_SHAPE_NAMES,
  ButtonShapeNames,
  useSubSkeleton
} from '@/hooks/skeleton'

export default defineComponent({
  name: 'fx-skeleton-button',
  props: {
    // 是否显示动画
    animated: {
      type: Boolean,
      default: false
    },
    // 指定按钮的形状
    shape: {
      type: String as PropType<ButtonShapeNames>,
      validator: createEnumsValidator(BUTTON_SHAPE_NAMES),
      default: null
    }
  },
  setup(props) {
    const { shapeClassName, useAnimation } = useSubSkeleton(props, 'button')

    return {
      shapeClassName,
      useAnimation
    }
  }
})
</script>
