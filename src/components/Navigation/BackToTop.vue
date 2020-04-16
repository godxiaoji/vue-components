<template>
  <div
    v-show="scrollTop >= visibilityHeight"
    class="ly-back-to-top"
    @click="onClick"
  >
    <slot><icon class="ly-back-to-top_icon" type="upload"></icon></slot>
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
import { frameTo } from '../../helpers/animation'
import { getHandleEvent } from '../../helpers/events'

export default {
  name: 'ly-back-to-top',
  components: { Icon },
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 200
    },
    iconSize: {
      type: Number
    }
  },
  data() {
    return {
      scrollTop: 0
    }
  },
  computed: {},
  watch: {},
  created() {
    this.scrollTop = document.documentElement.scrollTop
    document.addEventListener('scroll', this.onScroll, false)
  },
  ready() {},
  mounted() {},
  updated() {},
  attached() {},
  beforeDestroy() {
    document.removeEventListener('scroll', this.onScroll, false)
  },
  methods: {
    onScroll(e) {
      this.scrollTop = e.target.documentElement.scrollTop
    },

    onClick(e) {
      this.toTop()

      const type = 'click'
      this.$emit(type, getHandleEvent(this.$el, e, {}, type))
    },

    toTop() {
      const docElem = document.documentElement
      const to = 0
      const from = docElem.scrollTop

      if (from === to) {
        // 不需要跳转
      } else if (this.duration === 0) {
        // 不需要动画
        docElem.scrollTop = to
      } else {
        frameTo({
          from,
          to,
          duration: this.duration,
          progress(res) {
            docElem.scrollTop = res.current
          }
        })
      }
    }
  }
}
</script>

<style>
.ly-back-to-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 99998;
  cursor: pointer;
}

.ly-back-to-top_icon {
  display: block;
  width: 40px;
  height: 40px;
}
</style>
