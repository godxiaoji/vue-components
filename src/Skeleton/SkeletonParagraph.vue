<template>
  <ul class="fx-skeleton-paragraph" :class="{ animated: useAnimation }">
    <li v-for="num in paragraphSize" :key="num"></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { paragraphDefaultRow, useSubSkeleton } from '@/utils/skeleton'

export default defineComponent({
  name: 'fx-skeleton-paragraph',
  props: {
    // 是否显示动画
    animated: {
      type: Boolean,
      default: false
    },
    // 设置段落占位图的行数
    row: {
      type: Number,
      default: paragraphDefaultRow
    }
  },
  setup(props) {
    const { paragraphSize, useAnimation } = useSubSkeleton(props, 'paragraph')

    return {
      paragraphSize,
      useAnimation
    }
  }
})
</script>
