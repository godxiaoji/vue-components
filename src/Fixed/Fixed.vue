<template>
  <div class="fx-fixed" :style="styles">
    <!--fixed start-->
    <div
      class="fx-fixed_fixed"
      ref="fixed"
      :class="[placementClassName]"
      :style="fixedStyles"
    >
      <slot></slot>
    </div>
    <!--fixed end-->
  </div>
</template>

<script>
import safeAreaInsets from 'safe-area-insets'
import { resizeDetector } from '../helpers/dom'
import { createEnumsValidator, getEnumsValue } from '../helpers/validator'
import { capitalize } from '../helpers/util'

export default {
  name: 'fx-fixed',
  inject: {
    disableFixed: {
      default: false
    }
  },
  props: {
    // 固定方向
    placement: {
      validator: createEnumsValidator('placement'),
      default: null
    },
    // 是否开启安全区
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    },
    background: {
      type: String,
      default: null
    },
    zIndex: {
      type: Number,
      default: 1
    },
    spaceHold: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      safeAreaInsets: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    }
  },
  computed: {
    placementClassName() {
      return 'placement--' + getEnumsValue('placement', this.placement)
    },
    fixedStyles() {
      const styles = { background: this.background, zIndex: this.zIndex }
      const placement = getEnumsValue('placement', this.placement)

      if (this.enableSafeAreaInsets && safeAreaInsets.support) {
        styles['padding' + capitalize(placement)] =
          this.safeAreaInsets[placement] + 'px'
      }

      return styles
    },
    styles() {
      return {
        width: (this.spaceHold ? this.width : 0) + 'px',
        height: (this.spaceHold ? this.height : 0) + 'px'
      }
    }
  },
  mounted() {
    this.offResizeDetector = resizeDetector(this.$refs.fixed, () => {
      this.updateSize()
    })
    safeAreaInsets.onChange(this.updateSize)

    if (this.disableFixed) {
      // 针对在tranform下 fixed 会失效的问题
      document.body.append(this.$refs.fixed)
    }

    this.updateSize()
  },
  beforeDestroy() {
    this.offResizeDetector()
    safeAreaInsets.offChange(this.updateSize)

    if (this.disableFixed) {
      this.$el.append(this.$refs.fixed)
    }
  },
  methods: {
    updateSize() {
      const { offsetWidth, offsetHeight } = this.$refs.fixed

      this.width = offsetWidth
      this.height = offsetHeight
      this.safeAreaInsets = {
        top: safeAreaInsets.top,
        left: safeAreaInsets.left,
        right: safeAreaInsets.right,
        bottom: safeAreaInsets.bottom
      }
    }
  }
}
</script>
