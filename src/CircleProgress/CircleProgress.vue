<template>
  <div
    class="fx-circle-progress"
    :style="{ fontSize: Math.max(9, size * 0.17 * 0.875) + 'px' }"
  >
    <loading-svg
      class="fx-circle-progress_bar"
      :size="size"
      :rate="rate"
      :strokeWidth="strokeWidth"
      :color="color"
    />
    <div
      class="fx-circle-progress_text"
      :style="{ padding: strokeWidth + 'px' }"
    >
      <slot :progress="progress">
        {{ progress }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import LoadingSvg from '../ActivityIndicator/LoadingSvg.vue'
import { computed, defineComponent } from 'vue'
import { isNumeric, rangeInteger } from '@/helpers/util'

export default defineComponent({
  name: 'fx-circle-progress',
  components: { LoadingSvg },
  props: {
    percentage: {
      type: [String, Number],
      validator: (val: string | number) => {
        return (
          isNumeric(val) &&
          parseFloat(val as string) >= 0 &&
          parseFloat(val as string) <= 100
        )
      },
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
  },
  setup(props) {
    return {
      rate: computed(() => {
        return rangeInteger(props.percentage, 0, 100) / 100
      }),
      progress: computed(() => {
        return rangeInteger(props.percentage, 0, 100) + '%'
      })
    }
  }
})
</script>
