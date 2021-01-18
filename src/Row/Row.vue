<template>
  <div :class="classNames" :style="styles" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import { isNumber, isArray } from '../helpers/util'
import { SDKKey } from '../config'

export default {
  name: SDKKey + '-row',
  provide() {
    return {
      appRowSubOptions: this.subOptions
    }
  },
  props: {
    // 栅格间隔
    gutter: {
      validator(value) {
        if (isNumber(value)) {
          return true
        } else if (isArray(value) && isNumber(value[0])) {
          return true
        }

        return false
      },
      default: 0
    },
    // 水平排列方式
    justify: {
      validator(value) {
        return (
          ['start', 'end', 'center', 'space-around', 'space-between'].indexOf(
            value
          ) !== -1
        )
      },
      default: 'start'
    },
    // 垂直对齐方式
    align: {
      validator(value) {
        return ['top', 'middle', 'bottom'].indexOf(value) !== -1
      },
      default: 'top'
    }
  },
  data() {
    return {
      prefix: SDKKey,
      subOptions: {
        gutter: [0, 0]
      }
    }
  },
  computed: {
    styles() {
      const [gH, gV] = this.subOptions.gutter

      if (gH > 0 || gV > 0) {
        return {
          margin: `-${gV / 2}px -${gH / 2}px ${gV / 2}px `
        }
      }

      return {}
    },
    classNames() {
      const arr = [`${SDKKey}-row`]

      if (this.justify !== 'start') {
        arr.push(`justify--${this.justify}`)
      }

      if (this.align !== 'top') {
        arr.push(`align--${this.align}`)
      }

      return arr
    }
  },
  watch: {
    gutter: {
      immediate: true,
      handler(newVal) {
        const arr = [0, 0]

        if (isNumber(newVal)) {
          arr[0] = Math.max(0, newVal)
        } else if (isArray(newVal)) {
          if (isNumber(newVal[0])) {
            arr[0] = Math.max(0, newVal[0])
          }
          if (isNumber(newVal[1])) {
            arr[1] = Math.max(0, newVal[1])
          }
        }

        this.subOptions.gutter = arr
      }
    }
  },
  methods: {
    onClick(e) {
      this.$emit(e.type, e)
    }
  }
}
</script>
