<template>
  <div :class="classNames" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, reactive, watch } from 'vue'
import { isNumber, isArray, isNumeric } from '@/helpers/util'
import type { StyleObject } from '../helpers/types'
import { createEnumsValidator } from '@/helpers/validator'

type PropGutter = number | string | number[]

export default defineComponent({
  name: 'fx-row',
  props: {
    // 栅格间隔
    gutter: {
      validator: (value: PropGutter) => {
        if (isNumeric(value)) {
          return true
        } else if (isArray(value) && isNumber((value as number[])[0])) {
          return true
        }

        return false
      },
      default: 0
    },
    // 水平排列方式
    justify: {
      type: String,
      validator: createEnumsValidator([
        'start',
        'end',
        'center',
        'space-around',
        'space-between'
      ]),
      default: 'start'
    },
    // 垂直对齐方式
    align: {
      type: String,
      validator: createEnumsValidator(['top', 'middle', 'bottom']),
      default: 'top'
    }
  },
  setup(props) {
    const gutter = reactive([0, 0])

    const styles = computed(() => {
      const [gH, gV] = gutter
      const styles: StyleObject = {}

      if (gH > 0 || gV > 0) {
        styles.margin = `-${gV / 2}px -${gH / 2}px ${gV / 2}px `
      }

      return styles
    })

    const classNames = computed(() => {
      const arr = [`fx-row`]

      if (props.justify !== 'start') {
        arr.push(`justify--${props.justify}`)
      }

      if (props.align !== 'top') {
        arr.push(`align--${props.align}`)
      }

      return arr
    })

    watch(
      () => props.gutter,
      (val: PropGutter) => {
        if (isNumeric(val)) {
          gutter[0] = Math.max(0, val as number)
          gutter[1] = 0
        } else if (isArray(val)) {
          val = val as number[]

          if (isNumber(val[0])) {
            gutter[0] = Math.max(0, val[0])
          }
          if (isNumber(val[1])) {
            gutter[1] = Math.max(0, val[1])
          }
        }
      },
      {
        immediate: true
      }
    )

    provide('fxRowGutter', gutter)

    return {
      styles,
      classNames
    }
  }
})
</script>
