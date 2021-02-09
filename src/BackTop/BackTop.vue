<template>
  <div
    v-show="scrollTop >= visibleHeight"
    class="fx-back-top"
    :style="styles"
    @click="onClick"
  >
    <slot>
      <icon icon="UpCircleOutlined" />
    </slot>
  </div>
</template>

<script>
import safeAreaInsets from 'safe-area-insets'
import Icon from '../Icon'
import { addScrollEvent, removeScrollEvent } from '../helpers/events'
import { getScrollDom } from '../helpers/dom'

export default {
  name: 'fx-back-top',
  components: { Icon },
  props: {
    visibleHeight: {
      type: Number,
      default: 200
    },
    // 是否需要动画
    animated: {
      type: Boolean,
      default: true
    },
    // 偏移量，格式为 [x, y]
    offset: {
      type: Array,
      default() {
        return [0, 0]
      }
    },
    // 是否开启安全区
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scrollTop: 0,
      duration: 200,
      safeAreaInsetBottom: 0
    }
  },
  computed: {
    styles() {
      return {
        transform: `translate3d(${this.offset[0]}px, ${this.offset[1] -
          this.safeAreaInsetBottom}px, 0px)`
      }
    }
  },
  created() {
    this.scrollTop = getScrollDom().scrollTop

    addScrollEvent(this.onScroll)
  },
  mounted() {
    safeAreaInsets.onChange(this.updateSafeAreaInsets)
    this.updateSafeAreaInsets()
  },
  beforeUnmount() {
    safeAreaInsets.offChange(this.updateSafeAreaInsets)
    removeScrollEvent(this.onScroll)
  },
  methods: {
    updateSafeAreaInsets() {
      this.safeAreaInsetBottom = this.enableSafeAreaInsets
        ? safeAreaInsets.bottom
        : 0
    },

    onScroll(e) {
      this.scrollTop = e.target.documentElement.scrollTop
    },

    onClick(e) {
      this.toTop()

      this.$emit(e.type, e)
    },

    toTop() {
      getScrollDom().scrollTo({
        top: 0,
        behavior: this.animated ? 'smooth' : 'instant'
      })
    }
  }
}
</script>
