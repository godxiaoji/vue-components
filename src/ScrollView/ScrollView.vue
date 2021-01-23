<template>
  <div
    :class="[
      prefix + '-scroll-view',
      {
        'scroll-x': scrollX,
        'scroll-y': scrollY,
        smooth: scrollAnimated
      }
    ]"
    ref="scroll"
    @scroll="onScroll"
  >
    <div :class="[prefix + '-scroll-view_inner']">
      <div :class="[prefix + '-scroll-view_content']" :style="contentStyles">
        <div
          v-show="!lowerLoading"
          v-if="enablePullDirections.length > 0"
          :class="[
            prefix + '-scroll-view_pull-refresh',
            'direction--' + (pullDirection || 'unknown')
          ]"
        >
          <slot
            v-bind:pullDirection="pullDirection"
            v-bind:pullRefreshState="pullRefreshState"
            v-bind:pullIndicatorSafeArea="pullIndicatorSafeArea"
            name="indicator"
          >
            <div
              :class="[prefix + '-scroll-view_pull-refresh-indicator']"
              :style="indicatorStyles"
            >
              <icon
                :icon="
                  pullRefreshState === PULL_REFRESH_STATE_REFRESHING
                    ? 'LoadingOutlined'
                    : 'CircleOutlined'
                "
                :spin="pullRefreshState === PULL_REFRESH_STATE_REFRESHING"
              />
              <span>{{
                pullRefreshState === PULL_REFRESH_STATE_REFRESHING
                  ? '正在刷新'
                  : pullRefreshState === PULL_REFRESH_STATE_HOLDING
                  ? '松开刷新'
                  : pullDirectionNames[pullDirection] + '拉刷新'
              }}</span>
            </div></slot
          >
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import { SDKKey } from '../config'
import { inArray, isArray, isString, isStringArray } from '../helpers/util'
import { touchEvent } from '../helpers/events'

const {
  touchstart,
  touchmove,
  touchend,
  addListeners,
  removeListeners,
  getTouch
} = touchEvent

const SCROLL_STATE_CENTER = 0
const SCROLL_STATE_UPPER = 1
const SCROLL_STATE_LOWER = 2

const PULL_REFRESH_STATE_PULLING = 'pulling'
const PULL_REFRESH_STATE_HOLDING = 'holding'
const PULL_REFRESH_STATE_REFRESHING = 'refreshing'

export default {
  name: SDKKey + '-scroll-view',
  components: { Icon },
  props: {
    // 允许横向滚动
    scrollX: {
      type: Boolean,
      default: false
    },
    // 允许纵向滚动
    scrollY: {
      type: Boolean,
      default: false
    },
    // 在设置滚动条位置时使用动画过渡
    scrollAnimated: {
      type: Boolean,
      default: false
    },
    // 距顶部/左边多远时，触发 scrolltoupper 事件
    upperThreshold: {
      type: Number,
      default: 50
    },
    // 距底部/右边多远时，触发 scrolltolower 事件
    lowerThreshold: {
      type: Number,
      default: 50
    },
    // 设置竖向滚动条位置
    scrollTop: {
      type: Number,
      default: 0
    },
    // 设置横向滚动条位置
    scrollLeft: {
      type: Number,
      default: 0
    },
    // 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
    scrollIntoView: {
      type: String,
      default: ''
    },
    // 下拉刷新方向
    enablePullDirections: {
      validator(val) {
        return isString(val) || isStringArray(val)
      },
      default() {
        return []
      }
    },
    // 下拉刷新阈值
    pullRefreshThreshold: {
      type: Number,
      default: 48
    },
    lowerLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey,

      pullRefreshState: PULL_REFRESH_STATE_PULLING,
      pullDistance: 0,
      translateDuration: 200,
      pullDirection: '',

      pullDirectionNames: {
        '': '下',
        up: '上',
        down: '下',
        left: '左',
        right: '右'
      },
      pullIndicatorSafeArea: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },

      PULL_REFRESH_STATE_PULLING,
      PULL_REFRESH_STATE_HOLDING,
      PULL_REFRESH_STATE_REFRESHING
    }
  },
  computed: {
    contentStyles() {
      const styles = {
        transition: `transform ${this.translateDuration}ms`
      }

      styles.transform = inArray(this.pullDirection, ['up', 'down'])
        ? `translate3d(0, ${this.pullDistance}px, 0)`
        : `translate3d(${this.pullDistance}px, 0, 0)`

      return styles
    },
    indicatorStyles() {
      return {
        padding: `${this.pullIndicatorSafeArea.top}px ${this.pullIndicatorSafeArea.right}px ${this.pullIndicatorSafeArea.bottom}px ${this.pullIndicatorSafeArea.left}px`
      }
    }
  },
  mounted() {
    this._isToLowerOrUpperY = SCROLL_STATE_UPPER
    this._isToLowerOrUpperX = SCROLL_STATE_UPPER
    this._prevY = 0
    this._prevX = 0

    addListeners(this.$el, this)

    // 处理初始化设置的滚动位置
    this.updateScroll()
    this.scrollIntoIdView(this.scrollIntoView)
  },
  beforeDestroy() {
    removeListeners(this.$el, this)
  },
  watch: {
    scrollLeft() {
      this.updateScroll()
    },
    scrollTop() {
      this.updateScroll()
    },
    scrollIntoView(val) {
      this.scrollIntoIdView(val)
    }
  },
  methods: {
    loadComplete() {
      this.pullRefreshState = PULL_REFRESH_STATE_PULLING
      this.pullDistance = 0
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

    onTouchStart(e) {
      const { pageX, pageY } = getTouch(e)
      const $scroll = this.$refs.scroll
      const {
        scrollHeight,
        scrollTop,
        clientHeight,
        scrollLeft,
        scrollWidth,
        clientWidth
      } = $scroll

      this.touchCoords = {
        pageX,
        pageY,
        scrollY: this.scrollY && scrollHeight > clientHeight,
        scrollX: this.scrollX && scrollWidth > clientWidth
      }

      if (this.lowerLoading) {
        return
      }

      if (this.pullRefreshState === PULL_REFRESH_STATE_REFRESHING) {
        return
      }

      const allowPullDirections = isArray(this.enablePullDirections)
        ? this.enablePullDirections
        : [this.enablePullDirections]

      if (allowPullDirections.length === 0) {
        return
      }

      this.pullDistance = 0
      this.translateDuration = 0
      this.pullDirection = ''

      // 猜想可能刷新的方向，0-4个都有可能
      const directions = []

      if (scrollTop === 0 && inArray('down', allowPullDirections)) {
        directions.push('down')
      }
      if (
        scrollTop + clientHeight >= scrollHeight &&
        inArray('up', allowPullDirections)
      ) {
        directions.push('up')
      }
      if (scrollLeft === 0 && inArray('right', allowPullDirections)) {
        directions.push('right')
      }
      if (
        scrollLeft + clientWidth >= scrollWidth &&
        inArray('left', allowPullDirections)
      ) {
        directions.push('left')
      }

      if (directions[0]) {
        // 只要命中一个方向
        this.touchCoords.directions = directions
      }
    },

    onTouchMove(e) {
      if (!this.touchCoords) {
        return
      }

      // 处理滑动穿透
      const coords = this.touchCoords
      const { pageX, pageY } = getTouch(e)
      const offsetX = pageX - coords.pageX
      const offsetY = pageY - coords.pageY
      const y = this._isToLowerOrUpperY
      const x = this._isToLowerOrUpperX

      if (
        coords.stop ||
        (coords.scrollY &&
          (y === SCROLL_STATE_CENTER ||
            (y === SCROLL_STATE_UPPER && offsetY < 0) ||
            (y === SCROLL_STATE_LOWER && offsetY > 0))) ||
        (coords.scrollX &&
          (x === SCROLL_STATE_CENTER ||
            (x === SCROLL_STATE_UPPER && offsetX < 0) ||
            (x === SCROLL_STATE_LOWER && offsetX > 0)))
      ) {
        coords.stop = true
        e.stopPropagation()
      }

      // 处理下拉刷新
      if (!coords.directions) {
        return
      }

      let pullDirection = coords.direction

      if (!pullDirection) {
        // 如果可能存在两个方向，继续验证会走的方向
        if (Math.abs(offsetY) >= Math.abs(offsetX)) {
          coords.directions = coords.directions.filter(v => {
            return (
              inArray(v, ['up', 'down']) &&
              ((v === 'down' && offsetY > 0) || (v === 'up' && offsetY < 0))
            )
          })
        } else {
          coords.directions = coords.directions.filter(v => {
            return (
              inArray(v, ['left', 'right']) &&
              ((v === 'right' && offsetX > 0) || (v === 'left' && offsetX < 0))
            )
          })
        }

        coords.direction = pullDirection = coords.directions[0]
      }

      if (!pullDirection) {
        delete coords.directions
        return
      }

      e.preventDefault()

      if (!coords.safeArea) {
        const safeArea = {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
        const $scroll = this.$refs.scroll

        if (inArray(pullDirection, ['up', 'down'])) {
          safeArea.left = $scroll.scrollLeft
          safeArea.right =
            $scroll.scrollWidth - $scroll.scrollLeft - $scroll.clientWidth
        } else {
          safeArea.top = $scroll.scrollTop
          safeArea.bottom =
            $scroll.scrollHeight - $scroll.scrollTop - $scroll.clientHeight
        }

        this.pullIndicatorSafeArea = safeArea
        coords.safeArea = safeArea
      }

      this.pullDirection = pullDirection

      let distance
      if (inArray(this.pullDirection, ['up', 'down'])) {
        distance = offsetY
      } else {
        distance = offsetX
      }
      distance = Math.abs(distance)

      if (distance >= this.pullRefreshThreshold) {
        if (this.pullRefreshState === PULL_REFRESH_STATE_PULLING) {
          this.pullRefreshState = PULL_REFRESH_STATE_HOLDING
        }

        distance =
          this.pullRefreshThreshold +
          Math.ceil(
            (distance - this.pullRefreshThreshold) /
              Math.log(Math.abs(distance - this.pullRefreshThreshold) / 2)
          ) // 除于2比不除更好拉一点
      }

      this.pullDistance = inArray(this.pullDirection, ['down', 'right'])
        ? distance
        : -distance
    },

    onTouchEnd() {
      if (!this.touchCoords) {
        return
      }
      this.touchCoords = null

      this.translateDuration = 200

      if (this.pullRefreshState === PULL_REFRESH_STATE_HOLDING) {
        this.pullRefreshState = PULL_REFRESH_STATE_REFRESHING
        this.pullDistance = inArray(this.pullDirection, ['down', 'right'])
          ? this.pullRefreshThreshold
          : -this.pullRefreshThreshold

        this.$emit(
          'refreshing',
          {
            pullDirection: this.pullDirection
          },
          this.loadComplete
        )
      } else {
        this.pullDistance = 0
      }
    },

    /**
     * 滚动到指定Id元素
     */
    scrollIntoIdView(id) {
      if (id) {
        const $view = this.$el.getElementById(id)

        if ($view) {
          $view.scrollIntoView({
            behavior: this.scrollAnimated ? 'smooth' : 'auto'
          })
        }
      }
    },

    /**
     * 接收更新滚动的位置
     */
    updateScroll() {
      let { scrollY, scrollX, scrollLeft, scrollTop } = this
      if (!scrollY) {
        scrollTop = 0
      }
      if (!scrollX) {
        scrollLeft = 0
      }

      if (scrollTop > 0 || scrollTop > 0) {
        this.$el.scrollTo({
          top: scrollTop,
          left: scrollLeft,
          behavior: this.scrollAnimated ? 'smooth' : 'instant'
        })
      }
    },

    /**
     * 滚动事件处理
     */
    onScroll(e) {
      const { upperThreshold, lowerThreshold, scrollX, scrollY, $el } = this
      const {
        scrollTop,
        scrollLeft,
        scrollWidth,
        scrollHeight,
        clientHeight,
        clientWidth
      } = $el

      let isToLowerY = false
      let isToUpperY = false
      let isToLowerX = false
      let isToUpperX = false

      const typeLower = 'scroll-to-lower'
      const typeUpper = 'scroll-to-upper'

      // 滚动事件
      this.$emit(e.type, {
        scrollTop,
        scrollLeft,
        scrollWidth,
        scrollHeight,
        clientHeight,
        clientWidth
      })

      // 上下滚动
      if (scrollY) {
        if (
          scrollTop + clientHeight + lowerThreshold >= scrollHeight &&
          scrollTop > this._prevY
        ) {
          isToLowerY = true
        } else if (scrollTop <= upperThreshold && scrollTop < this._prevY) {
          isToUpperY = true
        }
      }

      // 左右滚动
      if (scrollX) {
        if (scrollLeft + clientWidth + lowerThreshold >= scrollWidth) {
          isToLowerX = true
        } else if (scrollLeft <= upperThreshold) {
          isToUpperX = true
        }
      }

      // 防止重复报
      if (isToUpperY || isToLowerY) {
        if (this._isToLowerOrUpperY === SCROLL_STATE_UPPER) {
          // 当前在触顶期间
          isToUpperY = false
        } else if (this._isToLowerOrUpperY === SCROLL_STATE_LOWER) {
          // 当前在触底期间
          isToLowerY = false
        }
      } else {
        this._isToLowerOrUpperY = SCROLL_STATE_CENTER
      }
      if (isToUpperX || isToLowerX) {
        if (this._isToLowerOrUpperX === SCROLL_STATE_UPPER) {
          // 当前在触顶期间
          isToUpperX = false
        } else if (this._isToLowerOrUpperX === SCROLL_STATE_LOWER) {
          // 当前在触底期间
          isToLowerX = false
        }
      } else {
        this._isToLowerOrUpperX = SCROLL_STATE_CENTER
      }

      if (isToUpperY) {
        // 触顶
        this._isToLowerOrUpperY = SCROLL_STATE_UPPER

        this.$emit(typeUpper, {
          direction: 'top'
        })
      } else if (isToLowerY) {
        // 触底
        this._isToLowerOrUpperY = SCROLL_STATE_LOWER

        this.$emit(typeLower, {
          direction: 'bottom'
        })
      }
      if (isToUpperX) {
        // 触顶
        this._isToLowerOrUpperX = SCROLL_STATE_UPPER

        this.$emit(typeUpper, {
          direction: 'left'
        })
      } else if (isToLowerX) {
        // 触底
        this._isToLowerOrUpperX = SCROLL_STATE_LOWER

        this.$emit(typeLower, {
          direction: 'right'
        })
      }

      this._prevY = scrollTop
      this._prevX = scrollLeft
    }
  }
}
</script>
