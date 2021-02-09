<template>
  <ul class="fx-skeleton-paragraph" :class="{ animated: useAnimation }">
    <li v-for="num in size" :key="num"></li>
  </ul>
</template>

<script>
import { isNumber } from '../helpers/util'
import { paragraphDefaultRow } from './util'

export default {
  name: 'fx-skeleton-paragraph',
  inject: {
    skeletonSubOptions: {
      default: null
    }
  },
  props: {
    // 是否显示动画
    animated: {
      type: Boolean,
      default: false
    },
    // 设置段落占位图的行数
    row: {
      type: Number,
      default: null
    }
  },
  computed: {
    useAnimation() {
      if (this.skeletonSubOptions) {
        return this.skeletonSubOptions.animated
      }
      return this.animated
    },
    size() {
      let row

      if (this.row == null) {
        if (
          this.skeletonSubOptions &&
          this.skeletonSubOptions.paragraphRow != null
        ) {
          row = this.skeletonSubOptions.paragraphRow
        }
      } else {
        row = this.row
      }

      return isNumber(row) ? row : paragraphDefaultRow
    }
  }
}
</script>
