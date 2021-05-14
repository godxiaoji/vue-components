<template>
  <loading-svg
    :class="{ animated }"
    :size="size"
    :rate="0.2"
    :strokeWidth="0.0537 * size"
    :color="color"
  />
</template>

<script lang="ts">
import LoadingSvg from './LoadingSvg.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'fx-activity-indicator',
  components: { LoadingSvg },
  props: {
    animated: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 20
    },
    // 主色
    color: {
      type: String,
      default: null
    }
  }
})
</script>
