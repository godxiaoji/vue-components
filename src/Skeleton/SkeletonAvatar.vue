<template>
  <div
    class="fx-skeleton-avatar"
    :class="[shapeClassName, { animated: useAnimation }]"
  ></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { createEnumsValidator } from '@/utils/validator'
import { AVATAR_SHAPE_NAMES, AvatarShapeNames, useSubSkeleton } from '@/utils/skeleton'

export default defineComponent({
  name: 'fx-skeleton-avatar',
  props: {
    // 是否显示动画
    animated: {
      type: Boolean,
      default: false
    },
    // 指定头像的形状
    shape: {
      type: String as PropType<AvatarShapeNames>,
      validator: createEnumsValidator(AVATAR_SHAPE_NAMES),
      default: null
    }
  },
  setup(props) {
    const { shapeClassName, useAnimation } = useSubSkeleton(props, 'avatar')

    return {
      shapeClassName,
      useAnimation
    }
  }
})
</script>
