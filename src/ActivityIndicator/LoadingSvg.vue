<template>
  <svg
    class="fx-loading-svg"
    :height="size"
    :width="size"
    viewBox="0 0 1024 1024"
  >
    <circle
      r="448"
      cx="512"
      cy="512"
      stroke="rgba(0, 0, 0, 0.04)"
      :stroke-width="(strokeWidth / size) * 896"
      fill="none"
    ></circle>
    <circle
      r="448"
      cx="512"
      cy="512"
      :stroke="color"
      :stroke-dasharray="314 * 8.96 * rate + ',' + 314 * 8.96"
      :stroke-width="(strokeWidth / size) * 896"
      fill="none"
      transform="rotate(-90,512,512)"
      stroke-linecap="round"
      style="transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s;"
    ></circle>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'fx-loading-svg',
  props: {
    rate: {
      type: Number,
      default: 0,
      required: true
    },
    size: {
      type: Number,
      default: 100
    },
    strokeWidth: {
      type: Number,
      default: 5.37
    },
    color: {
      type: String,
      default: '#1890ff'
    }
  }
})
</script>
