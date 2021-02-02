<template>
  <div :class="classNames" :style="styles" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import { isNumeric, rangeInteger } from '../helpers/util'

function rangeCol(number) {
  return rangeInteger(number, 0, 24)
}

export default {
  name: 'fx-col',
  inject: {
    appRowSubOptions: {
      default: null
    }
  },
  props: {
    // 栅格占据的列数
    span: {
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
  computed: {
    styles() {
      const arr = []

      const [gH, gV] = (this.appRowSubOptions &&
        this.appRowSubOptions.gutter) || [0, 0]

      if (gH > 0 || gV > 0) {
        arr.push({
          padding: `${gV / 2}px ${gH / 2}px`
        })
      }

      return arr
    },
    classNames() {
      const arr = [`fx-col`, `fx-col-${rangeCol(this.span)}`]

      if (this.offset > 0) {
        arr.push(`fx-col-offset-${Math.min(24, rangeCol(this.offset))}`)
      }

      if (this.push > 0) {
        arr.push(`fx-col-push-${rangeCol(this.push)}`)
      }

      if (this.pull > 0) {
        arr.push(`fx-col-pull-${rangeCol(this.pull)}`)
      }

      return arr
    }
  },
  methods: {
    onClick(e) {
      this.$emit(e.type, e)
    }
  }
}
</script>
