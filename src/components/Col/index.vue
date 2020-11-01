<template>
  <div :class="classNames" :style="styles" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import { SDKKey } from '../../config'
import { rangeInteger } from '../../helpers/util'

function rangeCol(number) {
  return rangeInteger(number, 0, 24)
}

export default {
  name: SDKKey + '-col',
  props: {
    // 栅格占据的列数
    span: {
      type: Number,
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
  data() {
    return {
      gutter: [0, 0],
      prefix: SDKKey
    }
  },
  computed: {
    styles() {
      const arr = []

      const [gH, gV] = this.gutter
      if (gH > 0 || gV > 0) {
        arr.push({
          padding: `${gV / 2}px ${gH / 2}px`
        })
      }

      return arr
    },
    classNames() {
      const arr = [`${SDKKey}-col`, `${SDKKey}-col-${rangeCol(this.span)}`]

      if (this.offset > 0) {
        arr.push(`${SDKKey}-col-offset-${Math.min(24, rangeCol(this.offset))}`)
      }

      if (this.push > 0) {
        arr.push(`${SDKKey}-col-push-${rangeCol(this.push)}`)
      }

      if (this.pull > 0) {
        arr.push(`${SDKKey}-col-pull-${rangeCol(this.pull)}`)
      }

      return arr
    }
  },
  watch: {},
  created() {
    if (this.$parent && this.$parent.gutter2) {
      this.updateGutter(this.$parent.gutter2)
    }
  },
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  beforeDestroy() {},
  methods: {
    updateGutter(gutter) {
      this.gutter = gutter
    },

    onClick(e) {
      this.$emit(e.type, e)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-col {
  position: relative;
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  max-width: 100%;
  min-height: 1px;
  box-sizing: border-box;

  &-0 {
    display: none;
  }

  @for $i from 1 through 24 {
    &-#{$i} {
      flex-basis: percentage($i / 24);
      max-width: percentage($i / 24);
    }

    &-offset-#{$i} {
      margin-left: percentage($i / 24);
    }

    &-push-#{$i} {
      left: percentage($i / 24);
    }

    &-pull-#{$i} {
      right: percentage($i / 24);
    }
  }
}
</style>
