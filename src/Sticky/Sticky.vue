<template>
  <div class="fx-sticky" :style="styles">
    <div class="fx-sticky_content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { widgetZIndex } from '../helpers/layer'
import { addScrollEvent, removeScrollEvent } from '../helpers/events'
import { eventSelectorValidator, sizeValidator } from '../helpers/validator'
import { getRelativeOffset, getSizeValue, querySelector } from '../helpers/dom'

export default {
  name: 'fx-sticky',
  inject: {
    disableFixed: {
      default: false
    }
  },
  props: {
    containSelector: {
      validator: eventSelectorValidator,
      default: null
    },
    offsetTop: {
      validator: sizeValidator,
      default: 0
    },
    offsetBottom: {
      validator: sizeValidator,
      default: null
    }
  },
  data() {
    return {
      height: null,
      width: null
    }
  },
  computed: {
    styles() {
      const styles = {}

      if (this.height != null) {
        styles.height = this.height + 'px'
      }

      return styles
    }
  },
  mounted() {
    this.resetContainer(this.containSelector)
  },
  beforeDestroy() {
    removeScrollEvent(this.onScroll, this.$container)
  },
  methods: {
    getOffsetTop() {
      return this.offsetTop
    },

    resetContainer(containSelector) {
      if (this.$container) {
        removeScrollEvent(this.onScroll, this.$container)
      }

      const $container = querySelector(containSelector) || document

      this.$container = $container

      addScrollEvent(this.onScroll, $container)

      this.updateFixed($container.scrollTop)
    },

    updateFixed(scrollTop) {
      if (!this.$el) {
        return
      }

      const { clientHeight, clientWidth } = this.$el

      const offsetTop = getRelativeOffset(this.$el, this.$container).offsetTop

      // console.log(scrollTop, offsetTop, getSizeValue(this.offsetTop), this.$el.offsetTop, this.$container)
      if (scrollTop >= offsetTop - getSizeValue(this.offsetTop)) {
        this.height = clientHeight
        this.width = clientWidth
        this.updateStyles(true)
      } else {
        this.height = null
        this.width = null
        this.updateStyles(false)
      }
    },

    updateStyles(fixed) {
      const $content = this.$refs.content
      const styles = $content.style

      if (fixed) {
        const { offsetTop } = getRelativeOffset(this.$container)
        const { offsetLeft } = getRelativeOffset(this.$el)

        styles.top = offsetTop + getSizeValue(this.offsetTop) + 'px'
        styles.left = offsetLeft + 'px'
        styles.width = this.width + 'px'
        if (this.offsetBottom != null) {
          styles.bottom = getSizeValue(this.offsetBottom) + 'px'
        } else {
          styles.height = this.height + 'px'
        }
        styles.zIndex = widgetZIndex
        styles.position = 'fixed'

        if (this.disableFixed) {
          // 针对在tranform下 fixed 会失效的问题
          document.body.append($content)
        }
      } else {
        styles.cssText = null
        if (this.disableFixed) {
          this.$el.append($content)
        }
      }
    },

    onScroll(e, { scrollTop }) {
      this.updateFixed(scrollTop)
    }
  }
}
</script>
