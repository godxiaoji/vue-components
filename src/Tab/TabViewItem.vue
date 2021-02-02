<template>
  <div class="fx-swiper-item fx-tab-view-item">
    <slot></slot>
  </div>
</template>

<script>
import { touchEvent } from '../helpers/events'

const {
  touchstart,
  touchmove,
  touchend,
  addListeners,
  removeListeners,
  getTouch
} = touchEvent

export default {
  name: 'fx-tab-view-item',
  inject: {
    appSwiper: {
      default: null
    },
    appTabView: {
      default: null
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    subName: {
      type: String,
      default: null
    }
  },
  mounted() {
    const $el = this.$el

    $el._app_component = this
    $el._app_name = 'tab-view-item'

    addListeners($el, this)

    this.update()
  },
  beforeDestroy() {
    removeListeners(this.$el, this)
  },
  destroyed() {
    this.update()
  },
  updated() {
    if (this.$el.offsetWidth === 0 || this.$el.offsetHeight === 0) {
      // 解决默认 hidden 的问题
      this.update()
    }
  },
  methods: {
    /**
     * 事件
     * @param {Event} e
     */
    handleEvent(e) {
      if (!this.appTabView) {
        return
      }

      switch (e.type) {
        case touchstart:
          this.onTouchStart(e)
          break
        case touchmove:
          this.onTouchMove(e)
          break
        case touchend:
          this.onTouchEnd(e)
          break
        default:
          break
      }
    },
    onTouchStart(e) {
      const {
        scrollHeight,
        scrollTop,
        clientHeight,
        scrollLeft,
        scrollWidth,
        clientWidth
      } = e.currentTarget
      const vertical = this.appTabView.vertical

      const touch = getTouch(e)

      if (
        (vertical &&
          (scrollHeight === scrollTop + clientHeight || scrollTop === 0)) ||
        (!vertical &&
          (scrollWidth === scrollLeft + clientWidth || scrollLeft === 0))
      ) {
        if (scrollHeight !== clientHeight || scrollWidth !== clientWidth) {
          this.touchCoords = {
            vertical,
            position:
              (vertical && scrollTop === 0) || (!vertical && scrollLeft === 0)
                ? 1
                : 2,
            startX: touch.pageX,
            startY: touch.pageY,
            timeStamp: e.timeStamp
          }
        }
      } else {
        // 滚动到中间，直接拒绝掉
        this.touchCoords = {
          stop: true
        }
        // e.stopPropagation()
      }
    },
    onTouchMove(e) {
      if (!this.touchCoords) {
        return
      }

      if (this.touchCoords.stop) {
        e.stopPropagation()
        return
      }

      const { pageX, pageY } = getTouch(e)
      const coords = this.touchCoords

      const offset = coords.vertical
        ? coords.startY - pageY
        : coords.startX - pageX

      if (
        (coords.position === 1 && offset > 0) ||
        (coords.position === 2 && offset < 0)
      ) {
        coords.stop = true
        e.stopPropagation()
      }
    },
    onTouchEnd() {
      // this.onScroll(e)

      delete this.touchCoords
    },
    update() {
      if (this.appSwiper) {
        this.appSwiper.update()
      }
      if (this.appTabView) {
        this.appTabView.update()
      }
    }
  }
}
</script>
