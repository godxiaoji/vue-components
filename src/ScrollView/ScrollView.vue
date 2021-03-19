<template>
  <div
    class="fx-scroll-view"
    :class="{
      'scroll-x': scrollX,
      'scroll-y': scrollY,
      smooth: scrollAnimated
    }"
    ref="root"
    @scroll="onScroll"
  >
    <div class="fx-scroll-view_inner">
      <div class="fx-scroll-view_content" :style="contentStyles">
        <div
          v-show="!lowerLoading"
          v-if="enablePullDirections && enablePullDirections.length > 0"
          class="fx-scroll-view_pull-refresh"
          :class="['direction--' + (pullDirection || 'unknown')]"
        >
          <slot
            v-bind:pullDirection="pullDirection"
            v-bind:pullRefreshState="pullRefreshState"
            v-bind:pullIndicatorSafeArea="pullIndicatorSafeArea"
            name="indicator"
          >
            <div
              class="fx-scroll-view_pull-refresh-indicator"
              :style="indicatorStyles"
            >
              <icon
                :icon="
                  pullRefreshState === PullRefreshState.Refreshing
                    ? 'LoadingOutlined'
                    : 'CircleOutlined'
                "
                :spin="pullRefreshState === PullRefreshState.Refreshing"
              />
              <span>{{
                pullRefreshState === PullRefreshState.Refreshing
                  ? '正在刷新'
                  : pullRefreshState === PullRefreshState.Holding
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

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch, reactive } from 'vue'
import Icon from '@/Icon'
import {
  inArray,
  stringMix2StringArray,
  isNumber,
  isString,
  isStringArray
} from '@/helpers/util'
import type { ScrollToOffsetOptions, StyleObject } from '../helpers/types'
import { useTouch, UseTouchCoords, UseTouchEvent } from '@/hooks/touch'

enum ScrollState {
  Center,
  Upper,
  Lower
}
enum PullRefreshState {
  Pulling,
  Holding,
  Refreshing
}

type PullDirection = 'up' | 'right' | 'down' | 'left'

interface ScrollCoords extends UseTouchCoords {
  pageX: number
  pageY: number
  scrollX: boolean
  scrollY: boolean
  directions?: PullDirection[]
  direction?: PullDirection
  stop: boolean | null
  isSetSafeArea?: boolean
}

export default defineComponent({
  name: 'fx-scroll-view',
  components: { Icon },
  provide() {
    return {
      disableFixed: true
    }
  },
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
    // 下拉刷新方向
    enablePullDirections: {
      validator: (val: PullDirection | PullDirection[]) => {
        return isString(val) || isStringArray(val)
      },
      default: null
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
      pullDirectionNames: {
        '': '下',
        up: '上',
        down: '下',
        left: '左',
        right: '右'
      }
    }
  },
  emits: ['scroll-to-upper', 'scroll-to-lower', 'scroll', 'refreshing'],
  setup(props, ctx) {
    const { emit } = ctx
    let _isToLowerOrUpperY = ScrollState.Upper
    let _isToLowerOrUpperX = ScrollState.Upper
    let _prevY = 0
    let _prevX = 0
    let coords: ScrollCoords | null

    const pullRefreshState = ref(PullRefreshState.Pulling)
    const root = ref<HTMLElement>()
    const pullDistance = ref(0)
    const translateDuration = ref(0)
    const pullDirection = ref('')
    const pullIndicatorSafeArea = reactive({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })

    function loadComplete() {
      pullRefreshState.value = PullRefreshState.Pulling
      pullDistance.value = 0
    }

    function onTouchStart(e: UseTouchEvent) {
      const { pageX, pageY } = e.touchObject
      const $scroll = root.value as HTMLElement
      const {
        scrollHeight,
        scrollTop,
        clientHeight,
        scrollLeft,
        scrollWidth,
        clientWidth
      } = $scroll

      coords = {
        pageX,
        pageY,
        scrollX: props.scrollX && scrollWidth > clientWidth,
        scrollY: props.scrollY && scrollHeight > clientHeight,
        stop: null
      }

      if (props.lowerLoading) {
        return
      }

      if (pullRefreshState.value === PullRefreshState.Refreshing) {
        return
      }

      const allowPullDirections = stringMix2StringArray(
        props.enablePullDirections
      )

      if (allowPullDirections.length === 0) {
        return
      }

      pullDistance.value = 0
      translateDuration.value = 0
      pullDirection.value = ''

      // 猜想可能刷新的方向，0-4个都有可能
      const directions: PullDirection[] = []

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
        coords.directions = directions
      }
    }

    function onTouchMove(e: UseTouchEvent) {
      if (!coords) {
        return
      }

      // 处理滑动穿透
      const { pageX, pageY } = e.touchObject
      const offsetX = pageX - coords.pageX
      const offsetY = pageY - coords.pageY
      const y = _isToLowerOrUpperY
      const x = _isToLowerOrUpperX

      if (coords.stop == null) {
        if (
          (coords.scrollY &&
            Math.abs(offsetY) >= Math.abs(offsetX) &&
            (y === ScrollState.Center ||
              (y === ScrollState.Upper && offsetY < 0) ||
              (y === ScrollState.Lower && offsetY > 0))) ||
          (coords.scrollX &&
            Math.abs(offsetX) >= Math.abs(offsetY) &&
            (x === ScrollState.Center ||
              (x === ScrollState.Upper && offsetX < 0) ||
              (x === ScrollState.Lower && offsetX > 0)))
        ) {
          coords.stop = true
        } else {
          coords.stop = false
        }
      }

      if (coords.stop) {
        e.stopPropagation()
      }

      // 处理下拉刷新
      if (!coords.directions) {
        return
      }

      let _pullDirection = coords.direction

      if (!_pullDirection) {
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

        coords.direction = _pullDirection = coords.directions[0]
      }

      if (!_pullDirection) {
        delete coords.directions
        return
      }

      e.preventDefault()

      if (!coords.isSetSafeArea) {
        const $scroll = root.value as HTMLElement

        pullIndicatorSafeArea.top = 0
        pullIndicatorSafeArea.right = 0
        pullIndicatorSafeArea.bottom = 0
        pullIndicatorSafeArea.left = 0

        if (inArray(_pullDirection, ['up', 'down'])) {
          pullIndicatorSafeArea.left = $scroll.scrollLeft
          pullIndicatorSafeArea.right =
            $scroll.scrollWidth - $scroll.scrollLeft - $scroll.clientWidth
        } else {
          pullIndicatorSafeArea.top = $scroll.scrollTop
          pullIndicatorSafeArea.bottom =
            $scroll.scrollHeight - $scroll.scrollTop - $scroll.clientHeight
        }

        coords.isSetSafeArea = true
      }

      pullDirection.value = _pullDirection

      let distance
      if (inArray(pullDirection.value, ['up', 'down'])) {
        distance = offsetY
      } else {
        distance = offsetX
      }
      distance = Math.abs(distance)
      const pullRefreshThreshold = props.pullRefreshThreshold

      if (distance >= pullRefreshThreshold) {
        if (pullRefreshState.value === PullRefreshState.Pulling) {
          pullRefreshState.value = PullRefreshState.Holding
        }

        distance =
          pullRefreshThreshold +
          Math.ceil(
            (distance - pullRefreshThreshold) /
              Math.log(Math.abs(distance - pullRefreshThreshold) / 2)
          ) // 除于2比不除更好拉一点
      }

      pullDistance.value = inArray(pullDirection.value, ['down', 'right'])
        ? distance
        : -distance
    }

    function onTouchEnd() {
      if (!coords) {
        return
      }
      coords = null

      translateDuration.value = 200

      if (pullRefreshState.value === PullRefreshState.Holding) {
        pullRefreshState.value = PullRefreshState.Refreshing
        pullDistance.value = inArray(pullDirection.value, ['down', 'right'])
          ? props.pullRefreshThreshold
          : -props.pullRefreshThreshold

        emit(
          'refreshing',
          {
            pullDirection: pullDirection.value
          },
          loadComplete
        )
      } else {
        pullDistance.value = 0
      }
    }

    /**
     * 滚动事件处理
     */
    function onScroll(e: Event) {
      const { upperThreshold, lowerThreshold, scrollX, scrollY } = props
      const {
        scrollTop,
        scrollLeft,
        scrollWidth,
        scrollHeight,
        clientHeight,
        clientWidth
      } = root.value as HTMLElement

      let isToLowerY = false
      let isToUpperY = false
      let isToLowerX = false
      let isToUpperX = false

      const typeLower = 'scroll-to-lower'
      const typeUpper = 'scroll-to-upper'

      // 滚动事件
      emit(e.type as 'scroll', {
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
          scrollTop > _prevY
        ) {
          isToLowerY = true
        } else if (scrollTop <= upperThreshold && scrollTop < _prevY) {
          isToUpperY = true
        }
      }

      // 左右滚动
      if (scrollX) {
        if (
          scrollLeft + clientWidth + lowerThreshold >= scrollWidth &&
          scrollLeft > _prevX
        ) {
          isToLowerX = true
        } else if (scrollLeft <= upperThreshold && scrollLeft < _prevX) {
          isToUpperX = true
        }
      }

      // 防止重复报
      if (isToUpperY || isToLowerY) {
        if (_isToLowerOrUpperY === ScrollState.Upper) {
          // 当前在触顶期间
          isToUpperY = false
        } else if (_isToLowerOrUpperY === ScrollState.Lower) {
          // 当前在触底期间
          isToLowerY = false
        }
      } else {
        _isToLowerOrUpperY = ScrollState.Center
      }
      if (isToUpperX || isToLowerX) {
        if (_isToLowerOrUpperX === ScrollState.Upper) {
          // 当前在触顶期间
          isToUpperX = false
        } else if (_isToLowerOrUpperX === ScrollState.Lower) {
          // 当前在触底期间
          isToLowerX = false
        }
      } else {
        _isToLowerOrUpperX = ScrollState.Center
      }

      if (isToUpperY) {
        // 触顶
        _isToLowerOrUpperY = ScrollState.Upper

        emit(typeUpper, {
          direction: 'top'
        })
      } else if (isToLowerY) {
        // 触底
        _isToLowerOrUpperY = ScrollState.Lower

        emit(typeLower, {
          direction: 'bottom'
        })
      }
      if (isToUpperX) {
        // 触顶
        _isToLowerOrUpperX = ScrollState.Upper

        emit(typeUpper, {
          direction: 'left'
        })
      } else if (isToLowerX) {
        // 触底
        _isToLowerOrUpperX = ScrollState.Lower

        emit(typeLower, {
          direction: 'right'
        })
      }

      _prevY = scrollTop
      _prevX = scrollLeft
    }

    function updateScroll() {
      const { scrollY, scrollX } = props

      if ((scrollY || scrollX) && root.value) {
        ;(root.value as HTMLElement).scrollTo({
          top: scrollY ? props.scrollTop : 0,
          left: scrollX ? props.scrollLeft : 0,
          behavior: props.scrollAnimated ? 'smooth' : 'auto'
        })
      }
    }

    onMounted(() => updateScroll)
    watch([() => props.scrollLeft, () => props.scrollTop], updateScroll)

    const contentStyles = computed(() => {
      return {
        transition: `transform ${translateDuration.value}ms`,
        transform: inArray(pullDirection.value, ['up', 'down'])
          ? `translate3d(0, ${pullDistance.value}px, 0)`
          : `translate3d(${pullDistance.value}px, 0, 0)`
      } as StyleObject
    })

    const indicatorStyles = computed(() => {
      return {
        padding: `${pullIndicatorSafeArea.top}px ${pullIndicatorSafeArea.right}px ${pullIndicatorSafeArea.bottom}px ${pullIndicatorSafeArea.left}px`
      }
    })

    useTouch({
      el: root,
      onTouchStart,
      onTouchMove,
      onTouchEnd
    })

    /**
     * 滚动列表到指定的偏移（以像素为单位）
     */
    function scrollToOffset(options: number | ScrollToOffsetOptions) {
      let behavior: ScrollBehavior = 'smooth'
      let top = 0
      let left = 0

      if (isNumber(options)) {
        top = options as number
        behavior = 'auto'
      } else {
        options = options as ScrollToOffsetOptions
        top = options.offset
        if (options.animated === false) behavior = 'auto'
      }

      if (props.scrollX) {
        // 如果是水平的，数值换一下
        top = [left, (left = top)][0]
      }

      root.value &&
        (root.value as HTMLElement).scrollTo({
          top,
          left,
          behavior
        })
    }

    return {
      pullRefreshState,
      pullDistance,
      pullDirection,
      root,
      contentStyles,
      indicatorStyles,
      onScroll,
      pullIndicatorSafeArea: pullIndicatorSafeArea,
      PullRefreshState: {
        Pulling: 0,
        Holding: 1,
        Refreshing: 2
      },
      scrollToOffset
    }
  }
})
</script>
