<template>
  <div class="fx-skeleton-image" :class="{ animated: useAnimation }"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSubSkeleton } from '@/Skeleton/skeleton'

export default defineComponent({
  name: 'fx-skeleton-image',
  props: {
    // 是否显示动画
    animated: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { useAnimation } = useSubSkeleton(props, 'image')

    return {
      useAnimation
    }
  }
})
</script>
