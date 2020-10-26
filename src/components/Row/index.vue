<template>
  <div :class="classNames" :style="styles" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import { isFunction, isNumber, isArray } from '../../helpers/util'
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-row',
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
      prefix: SDKKey
    }
  },
  computed: {
    styles() {
      const [gH, gV] = this.gutter2

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
    },
    gutter2() {
      const arr = [0, 0]

      if (isNumber(this.gutter)) {
        arr[0] = Math.max(0, this.gutter)
      } else if (isArray(this.gutter)) {
        if (isNumber(this.gutter[0])) {
          arr[0] = Math.max(0, this.gutter[0])
        }
        if (isNumber(this.gutter[1])) {
          arr[1] = Math.max(0, this.gutter[1])
        }
      }

      return arr
    }
  },
  watch: {
    gutter2(newVal) {
      this.updateColGetter(newVal)
    }
  },
  created() {},
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  beforeDestroy() {},
  methods: {
    updateColGetter(gutter) {
      this.$children.forEach($child => {
        if (isFunction($child.updateGutter)) {
          $child.updateGutter(gutter)
        }
      })
    },

    onClick(e) {
      this.$emit(e.type, e)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: flex-start;

  &.justify {
    &--start {
      justify-content: flex-start;
    }

    &--end {
      justify-content: flex-end;
    }

    &--center {
      justify-content: center;
    }

    &--space-around {
      justify-content: space-around;
    }

    &--space-between {
      justify-content: space-between;
    }
  }

  &.align {
    &--top {
      align-items: flex-start;
    }

    &--middle {
      align-items: center;
    }

    &--bottom {
      align-items: flex-end;
    }
  }
}
</style>
