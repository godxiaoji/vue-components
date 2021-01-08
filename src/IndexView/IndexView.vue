<template>
  <div :class="[prefix + '-index-view']">
    <div :class="[prefix + '-index-view_sidebar']">
      <ul :class="[prefix + '-index-view_list']" ref="list">
        <li
          :class="{ active: item.value === activeIndex }"
          v-for="item in indexList"
          :data-value="item.value"
          :key="item.value"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div :class="[prefix + '-index-view_body']">
      <sticky-view
        :offset-top="stickyOffsetTop"
        ref="body"
        :activeIndex.sync="activeIndex"
        @reset-items="onResetItems"
        @change="onChange"
      >
        <slot></slot>
      </sticky-view>
    </div>
  </div>
</template>

<script>
import StickyView from '../Sticky/View.vue'
import { SDKKey } from '../config'
import { querySelector } from '../helpers/dom'
import { sizeValidator } from '../helpers/validator'
import { touchEvent } from '../helpers/events'
import { rangeInteger } from '../helpers/util'

const { touchstart, touchmove, touchend, addListeners, removeListeners, getTouch } = touchEvent

export default {
  name: SDKKey + '-index-view',
  components: { StickyView },
  props: {
    stickyOffsetTop: {
      validator: sizeValidator,
      default: 0
    }
  },
  data() {
    return {
      prefix: SDKKey,

      activeIndex: 0,

      indexList: []
    }
  },
  mounted() {
    this.resetContainer(document)

    addListeners(this.$refs.list, this)
  },
  destroyed() {},
  beforeDestroy() {
    removeListeners(this.$refs.list, this)
  },
  methods: {
    /**
     * 事件
     * @param {Event} e
     */
    handleEvent(e) {
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
        case 'mouseleave':
          this.onTouchEnd(e)
          break
        default:
          break
      }
    },

    onTouchStart(e) {
      const { clientY } = getTouch(e)

      const $target = e.target
      const value = parseInt($target.dataset.value)
      const rects = $target.getClientRects()[0]

      this.coords = {
        size: rects.height,
        offsetY: clientY - rects.top,
        startY: clientY,
        current: value
      }

      clearTimeout(this.changeTimer)
      this.changeTimer = setTimeout(() => {
        this.activeIndex = value
      }, 500)

      e.preventDefault()
    },

    onTouchMove(e) {
      if (!this.coords) {
        return
      }

      const { clientY } = getTouch(e)
      const { startY, size, offsetY, current } = this.coords

      const y = clientY - startY

      let offsetCount = 0

      if (y > 0) {
        offsetCount = Math.floor(y / size) + (y % size > size - offsetY ? 1 : 0)
      } else if (y < 0) {
        offsetCount = -Math.floor(-y / size) + (-y % size > offsetY ? -1 : 0)
      }

      if (offsetCount !== 0) {
        clearTimeout(this.changeTimer)
        this.coords.isChange = true

        this.changeTimer = this.changeTimer = setTimeout(() => {
          this.activeIndex = rangeInteger(current + offsetCount, 0, this.indexList.length - 1)
        }, 100)
      }

      e.stopPropagation()
    },

    onTouchEnd(e) {
      if (this.coords) {
        if (!this.coords.isChange) {
          this.activeIndex = this.coords.current
        }

        delete this.coords
        e.stopPropagation()
      }
    },

    resetContainer(containSelector) {
      const $container = querySelector(containSelector)

      this.$refs.body.resetContainer($container)
    },

    onResetItems(list) {
      if (this._isDestroyed) {
        return
      }

      this.indexList = list.map(({ name, index }) => {
        return {
          label: name.substr(0, 1),
          value: index
        }
      })
    },

    onChange(res) {
      this.$emit('change', res)
    },

    /**
     * 滚动到第index个
     * @param {Object} options
     */
    scrollToIndex(options) {
      this.$refs.body.scrollToIndex(options)
    },

    /**
     * 滚到到指定位置
     * @param {Object} options
     */
    scrollToOffset(options) {
      this.$refs.body.scrollToOffset(options)
    }
  }
}
</script>
