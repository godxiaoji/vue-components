<template>
  <div :class="classNames" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue'
import { isNumeric, rangeInteger } from '@/helpers/util'
import type { StyleObject } from '../helpers/types'

function rangeCol(number: number | string) {
  return rangeInteger(number, 0, 24)
}

export default defineComponent({
  name: 'fx-col',
  props: {
    // 栅格占据的列数
    span: {
      type: [Number, String],
      validator: isNumeric,
      default: 24
    },
    // 栅格左侧的间隔格数
    offset: {
      type: Number,
      default: 0
    },
    // 栅格向右移动格数
    push: {
      type: Number,
      default: 0
    },
    // 栅格向左移动格数
    pull: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const rowGutter = inject('fxRowGutter', [0, 0])

    const styles = computed(() => {
      const styles: StyleObject = {}

      const [gH, gV] = rowGutter

      if (gH > 0 || gV > 0) {
        styles.padding = `${gV / 2}px ${gH / 2}px`
      }

      return styles
    })

    const classNames = computed(() => {
      const arr = [`fx-col`, `fx-col-${rangeCol(props.span)}`]

      if (props.offset > 0) {
        arr.push(`fx-col-offset-${Math.min(24, rangeCol(props.offset))}`)
      }

      if (props.push > 0) {
        arr.push(`fx-col-push-${rangeCol(props.push)}`)
      }

      if (props.pull > 0) {
        arr.push(`fx-col-pull-${rangeCol(props.pull)}`)
      }

      return arr
    })

    return {
      styles,
      classNames
    }
  }
})
</script>
