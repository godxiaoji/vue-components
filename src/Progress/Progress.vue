<template>
  <div class="fx-progress" :class="{ 'fixed-bar': !!fixedBar }">
    <div class="fx-progress_bar">
      <div
        class="fx-progress_track"
        :class="{ animated: !!animated }"
        :style="[{ width: progress }]"
      ></div>
    </div>
    <div class="fx-progress_text" v-if="$slots.default || showText">
      <slot :progress="progress">
        {{ showText ? progress : '' }}
      </slot>
    </div>
  </div>
</template>

<script>
import { isNumeric, rangeInteger } from '../helpers/util'

export default {
  name: 'fx-progress',
  props: {
    percentage: {
      validator(val) {
        return isNumeric(val) && parseFloat(val) >= 0 && parseFloat(val) <= 100
      },
      default: 0,
      required: true
    },
    showText: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: true
    },
    fixedBar: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    progress() {
      return rangeInteger(this.percentage, 0, 100) + '%'
    }
  }
}
</script>
