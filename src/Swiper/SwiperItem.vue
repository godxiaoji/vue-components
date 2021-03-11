<template>
  <div class="fx-swiper-item" ref="root">
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

export default defineComponent({
  name: 'fx-swiper-item',
  setup() {
    const root = ref<HTMLElement>()
    const update = inject('fxSwiperUpdate', (lazy?: number) => {})

    onMounted(() => update())
    onUnmounted(() => update())
    onUpdated(() => {
      const $item = root.value as HTMLElement

      if ($item.offsetWidth === 0 || $item.offsetHeight === 0) {
        // 解决默认 hidden 的问题
        update()
      }
    })

    return {
      root
    }
  }
})
</script>
