<template>
  <div
    class="fx-swiper"
    :class="{ vertical: direction === 'y' }"
    @click="onClick"
  >
    <div class="fx-swiper_list" ref="list">
      <slot></slot>
    </div>
    <div
      class="fx-swiper_indicators"
      :class="{ vertical: direction === 'y' }"
      v-show="indicatorDots"
    >
      <span
        v-for="item in pagination"
        :key="item.index"
        class="fx-swiper_indicator"
        :class="{ active: item.index === index }"
        :style="{
          background:
            item.index === index ? indicatorActiveColor : indicatorColor
        }"
      ></span>
    </div>
    <fx-button
      v-if="navigationButtons"
      v-show="pagination.length > 1"
      class="fx-swiper_prev"
      @click.stop="prev(true)"
      icon="LeftOutlined"
      size="large"
      pattern="borderless"
      shape="circle"
      :ghost="true"
    ></fx-button>
    <fx-button
      v-if="navigationButtons"
      v-show="pagination.length > 1"
      class="fx-swiper_next"
      @click.stop="next(true)"
      icon="RightOutlined"
      size="large"
      pattern="borderless"
      shape="circle"
      :ghost="true"
    ></fx-button>
  </div>
</template>

<script>
import FxButton from '../Button'
import { resizeDetector } from '../helpers/dom'
import Exception from '../helpers/exception'
import {
  camelCase2KebabCase,
  isNumber,
  isUndefined,
  objectForEach
} from '../helpers/util'
import listMixin from '../util/list-mixin'

import { touchEvent } from '../helpers/events'

const {
  touchstart,
  touchmove,
  touchend,
  addListeners,
  removeListeners,
  getTouch,
  getStretchOffset
} = touchEvent

// export
export default {
  name: 'fx-swiper',
  components: { FxButton },
  mixins: [listMixin],
  provide() {
    return {
      appSwiper: this,
      disableFixed: true
    }
  },
  props: {
    // 是否显示面板指示点
    indicatorDots: {
      type: Boolean,
      default: false
    },

    indicatorColor: {
      type: String,
      default: null
    },

    indicatorActiveColor: {
      type: String,
      default: null
    },

    navigationButtons: {
      type: Boolean,
      default: false
    },

    autoplay: {
      type: Boolean,
      default: false
    },

    interval: {
      type: Number,
      default: 5000
    },

    duration: {
      type: Number,
      default: null
    },

    initialCircular: {
      type: Boolean,
      default: false
    },

    activeIndex: {
      type: Number,
      default: 0
    },

    initialVertical: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: 0,
      pagination: [],
      $items: [],

      direction: 'x',
      directionGroup: [],

      prevCircular: false,
      circular: false,

      transSize: 0
    }
  },
  created() {
    this.circular = !!this.initialCircular
  },
  mounted() {
    addListeners(this.$el, this)

    this.updateSlide()

    if (this.activeIndex !== 0) {
      this.swipeTo(this.activeIndex)
    }

    this.offResizeDetector = resizeDetector(this.$el, () => {
      this.update(50)
    })
  },
  beforeUnmount() {
    clearTimeout(this.updateTimer)
    clearTimeout(this.durationTimer)
    this.stop()
    this.$items = []
    removeListeners(this.$el, this)
    this.offResizeDetector()
  },
  watch: {
    /**
     * 外部修改索引可以旋转
     */
    activeIndex(val) {
      this.swipeTo(val)
    },
    autoplay(val) {
      if (val) {
        this.start()
      } else {
        this.stop()
      }
    },
    interval() {
      this.start()
    }
  },
  emits: ['update:activeIndex', 'change', 'animated', 'click'],
  methods: {
    /**
     * 切换到
     * @param {Number} activeIndex 索引
     */
    swipeTo(activeIndex) {
      if (
        isNumber(activeIndex) &&
        activeIndex >= 0 &&
        activeIndex < this.$items.length
      ) {
        if (activeIndex !== this.index) {
          this.to(activeIndex, false)
        }
      } else {
        console.error(
          new Exception(
            '"activeIndex"不在范围内',
            Exception.TYPE.PROP_ERROR,
            'Swiper'
          )
        )
      }
    },
    /**
     * 跳转到上一项
     */
    prev(circular = false) {
      this.to(circular ? this.getCircleIndex(-1) : this.index - 1)
    },
    /**
     * 跳转到下一项
     */
    next(circular = false) {
      this.to(circular ? this.getCircleIndex(1) : this.index + 1)
    },

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
        default:
          break
      }
    },

    updateSlide() {
      // 设置方向
      if (this.initialVertical) {
        this.direction = 'y'
        this.directionGroup = ['Y', 'X', 'Height', 'Width']
      } else {
        this.direction = 'x'
        this.directionGroup = ['X', 'Y', 'Width', 'Height']
      }

      this.setItems()
      this.updateSlideLoop()

      if (this.autoplay) {
        this.start()
      }
    },
    onBeforeSlide(index, fromIndex) {
      if (index !== fromIndex) {
        // 排重
        this.$emit('update:activeIndex', index)
        this.$emit('change', {
          activeIndex: index
        })
      }

      this.index = index
    },
    onSlide(index) {
      this.$emit('animated', {
        activeIndex: index
      })
    },

    onClick(e) {
      if (!this.horizontal) {
        this.$emit(e.type, e)
      }
    },

    // 滑动开始事件-记录坐标
    onTouchStart(e) {
      // 禁止图片拖拽
      if (e.target.tagName === 'IMG') {
        e.target.ondragstart = function() {
          return false
        }
      }
      // e.preventDefault()
      const touch = getTouch(e)

      if (this.playing) {
        return
      }

      // 清除幻灯片
      this.stop()

      this.inMove = true

      delete this.horizontal
      // 记录坐标

      this.touchCoords = {
        startX: touch.pageX,
        startY: touch.pageY,
        timeStamp: e.timeStamp
      }
    },
    /**
     * 滑动过程事件-判断横竖向，跟随滑动
     */
    onTouchMove(e) {
      if (!this.inMove || !this.touchCoords) {
        return
      }

      const touch = getTouch(e)
      const coords = this.touchCoords
      coords.stopX = touch.pageX
      coords.stopY = touch.pageY

      let offsetX = coords.startX - coords.stopX
      let offsetY = coords.startY - coords.stopY

      if (this.direction === 'y') {
        // 垂直
        offsetX = [offsetY, (offsetY = offsetX)][0]
      }

      const absX = Math.abs(offsetX)
      const absY = Math.abs(offsetY)

      if (!isUndefined(this.horizontal)) {
        // 首次
        if (offsetX !== 0) {
          // bug hack
          e.preventDefault()
        }
      } else {
        // 首次move确认是否水平移动
        if (absX > absY) {
          this.horizontal = true
          if (offsetX !== 0) {
            e.preventDefault()
          }
        } else {
          delete this.touchCoords
          this.horizontal = false
          return
        }
      }

      const itemSize = this.itemSize
      const active = this.index
      let transSize = active * itemSize

      if (
        !this.circular &&
        ((active === 0 && offsetX < 0) ||
          (active === this.getLastIndex() && offsetX > 0))
      ) {
        transSize += getStretchOffset(offsetX)
      } else {
        transSize += offsetX
      }

      if (absX < itemSize) {
        if (coords.offset == null || offsetX > 0 !== coords.offset) {
          this.updateSlideLoop(offsetX)
          coords.offset = offsetX > 0
        }

        this.listMove(-transSize)
      }
    },
    /**
     * 滑动结束事件-滑到指定位置，重置状态
     */
    onTouchEnd(e) {
      if (!this.inMove) {
        return
      }

      this.inMove = false

      if (this.touchCoords) {
        const coords = this.touchCoords

        const itemSize = this.itemSize
        const offsetX =
          this.direction === 'x'
            ? coords.startX - coords.stopX
            : coords.startY - coords.stopY
        let absX = Math.abs(offsetX)
        const active = this.index

        let transIndex

        if (!isNaN(absX) && absX !== 0) {
          if (absX > itemSize) {
            absX = itemSize
          }
          if (absX >= 80 || e.timeStamp - coords.timeStamp < 200) {
            if (offsetX > 0) {
              transIndex = active + 1
            } else {
              transIndex = active - 1
            }
          } else {
            transIndex = active
          }

          this.to(transIndex)
          delete this.touchCoords
        }
      }
      this.resetStatus()
    },
    // 获取滑动距离值
    getTransVal(size) {
      return (
        'translate3d(' +
        (this.direction === 'x'
          ? size + 'px, 0px, 0px'
          : '0px, ' + size + 'px, 0px') +
        ')'
      )
    },
    getLastIndex() {
      return this.$items.length - 1
    },
    // 获取循环的索引
    getCircleIndex(step) {
      const length = this.$items.length
      return (this.index + length + (step % length)) % length
    },
    // 恢复滑动状态
    resetStatus() {
      if (this.autoplay) {
        this.start()
      }
    },
    // 到指定项
    to(toIndex, animated) {
      const lastIndex = this.getLastIndex()
      let slideIndex = toIndex

      if (lastIndex < 0) {
        return
      }

      if (toIndex >= 0 && toIndex <= lastIndex && toIndex != this.index) {
        this.slide(toIndex, slideIndex, animated)
      } else {
        if (this.circular) {
          if (toIndex < 0) {
            slideIndex = -1
            toIndex = lastIndex
          } else if (toIndex > lastIndex) {
            slideIndex = lastIndex + 1
            toIndex = 0
          }
        } else {
          toIndex = this.index
        }

        this.slide(toIndex, slideIndex, animated)
      }
    },
    listMove(transSize, duration = 0) {
      const listStyle = this.$refs.list.style

      // 滑动模式
      listStyle.transitionDuration = duration + 'ms'
      listStyle.transform = this.getTransVal(transSize)
      this.transSize = transSize
    },
    // 滑动实现
    slide(toIndex, slideIndex, animated = true) {
      if (this.playing) {
        return
      }

      if (!this.circular) {
        slideIndex = toIndex
      }

      this.playing = true

      const fromIndex = this.index
      const transSize = -this.itemSize * slideIndex
      const transSizeOffset = this.transSize - transSize

      if (fromIndex !== slideIndex) {
        this.updateSlideLoop(transSizeOffset)
      }

      this.onBeforeSlide(toIndex, fromIndex)
      if (toIndex !== fromIndex) {
        // this.onChange(toIndex, fromIndex)
      }

      let duration = this.duration

      if (duration == null) {
        duration = Math.abs(transSizeOffset)
        duration = Math.max(100, Math.min(800, duration))
      }

      if (animated === false) {
        duration = 0
      }

      this.listMove(transSize, duration)

      clearTimeout(this.durationTimer)
      this.durationTimer = setTimeout(() => {
        this.listMove(transSize, 0)

        this.animateDone(transSize, toIndex, fromIndex)
      }, duration)
    },
    animateDone(transSize, toIndex, fromIndex) {
      this.durationTimer = setTimeout(() => {
        const transform = window.getComputedStyle(this.$refs.list).transform

        const currentSize = transform
          .slice(7, transform.length - 1)
          .split(', ')[this.direction === 'y' ? 5 : 4]

        if (parseFloat(currentSize).toFixed(2) === transSize.toFixed(2)) {
          // 校对清楚再回调
          this.playing = false

          // 滑动回调
          this.onSlide(toIndex, fromIndex)

          this.updateSlideLoop()
          return
        } else {
          this.animateDone(transSize, toIndex, fromIndex)
        }
      }, 17)
    },
    updateSlideLoop(offset) {
      if (!this.circular) {
        return
      }

      const slideIndex = this.index
      const lastIndex = this.getLastIndex()
      const itemCount = lastIndex + 1

      this.$items.forEach(($item, index) => {
        if (offset < 0) {
          if (slideIndex === 0 && index === lastIndex) {
            $item.style.transform = this.getTransVal(-this.itemSize * itemCount)
          } else {
            $item.style.transform = null
          }
        } else if (offset > 0) {
          if (slideIndex === lastIndex && index === 0) {
            $item.style.transform = this.getTransVal(this.itemSize * itemCount)
          } else {
            $item.style.transform = null
          }
        } else {
          if (slideIndex === 0 && index === lastIndex) {
            $item.style.transform = this.getTransVal(-this.itemSize * itemCount)
          } else if (slideIndex === lastIndex && index === 0) {
            $item.style.transform = this.getTransVal(this.itemSize * itemCount)
          } else {
            $item.style.transform = null
          }
        }
      })

      if (offset == null) {
        this.listMove(-this.itemSize * slideIndex)
      }
    },
    // 刷新
    resetItems() {
      if (this.$.isUnmounted) {
        return
      }

      this.setItems()
      const last = this.getLastIndex()
      if (this.index > last) {
        this.to(last)
      }
    },
    // 设置列表项
    setItems() {
      if (this.$refs.list) {
        this.$items = this.getItems('swiper')

        this.setSlideStyle()
      }
    },
    // 设置滑动属性
    setSlideStyle() {
      // 设置滑动样式属性
      const sizeName = this.directionGroup[2]
      const itemSize = this.$el['client' + sizeName]

      this.itemSize = itemSize
      this.$el.style['overflow' + this.directionGroup[0]] = 'hidden'

      const styleObj = {
        '--webkit-backface-visibility': 'hidden',
        '--webkit-perspective': '1000'
      }

      styleObj[sizeName.toLowerCase()] = itemSize * this.$items.length + 'px'
      styleObj.transition = `transform 0ms ease-out`
      // styleObj.transition = `transform 0ms cubic-bezier(0.4, 0.0, 0.2, 1)`

      const cssTextArr = []

      objectForEach(styleObj, (v, k) => {
        cssTextArr.push(`${camelCase2KebabCase(k)}: ${v}`)
      })

      this.$refs.list.style.cssText = cssTextArr.join('; ')
      this.listMove(-itemSize * this.index)

      const pagination = []

      this.$items.forEach(($item, i) => {
        $item.dataset.index = i

        let cssText = `${sizeName.toLowerCase()}: ${itemSize}px;`

        if (this.direction === 'x') {
          // 左右滑动
          cssText += 'float: left;'
        }

        $item.style.cssText = cssText

        pagination.push({
          index: i
        })
      })

      this.pagination = pagination
    },
    // 开始幻灯片
    start() {
      this.stop()
      this.autoTimer = setInterval(() => {
        this.to(this.getCircleIndex(1))
      }, this.interval)
    },
    // 结束幻灯片
    stop() {
      clearTimeout(this.autoTimer)
      this.autoTimer = null
    }
  }
}
</script>
