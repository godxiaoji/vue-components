<template>
  <div
    class="fx-swiper"
    :class="{ vertical: direction === 'y' }"
    @click="onClick"
    ref="root"
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
        :key="item"
        class="fx-swiper_indicator"
        :class="{ active: item === index }"
        :style="{
          background: item === index ? indicatorActiveColor : indicatorColor
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

<script lang="ts">
import {
  ref,
  defineComponent,
  reactive,
  onMounted,
  watch,
  onBeforeUnmount,
  provide
} from 'vue'
import FxButton from '@/Button'
import Exception from '@/helpers/exception'
import { isNumber } from '@/helpers/util'
import { useList } from '@/hooks/list'
import { useResizeDetector } from '@/hooks/resize-detector'
import { getStretchOffset } from '@/helpers/animation'
import { StyleObject } from '../helpers/types'
import { useTouch, UseTouchCoords, UseTouchEvent } from '@/hooks/touch'
import { styleObject2CssText } from '@/helpers/dom'

interface SwiperCoords extends UseTouchCoords {
  offset: boolean | null
  startX: number
  startY: number
  stopX: number
  stopY: number
  timeStamp: number
}

// export
export default defineComponent({
  name: 'fx-swiper',
  components: { FxButton },
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
  emits: ['update:activeIndex', 'change', 'animated', 'click'],
  setup(props, ctx) {
    const root = ref<HTMLElement>()
    const { emit } = ctx
    const index = ref(0)
    const pagination = reactive<number[]>([])
    const direction = ref('x')

    let directionGroup: string[] = []
    const circular = !!props.initialCircular
    let prevTranSize = 0
    let $items: HTMLElement[] = []
    let itemSize = 0
    let horizontal: boolean | null = null

    /**
     * 切换到
     * @param activeIndex 索引
     */
    function swipeTo(activeIndex: number) {
      if (
        isNumber(activeIndex) &&
        activeIndex >= 0 &&
        activeIndex < $items.length
      ) {
        if (activeIndex !== index.value) {
          to(activeIndex, false)
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
    }

    /**
     * 跳转到上一项
     */
    function prev(useCircular = false) {
      to(useCircular ? getCircleIndex(-1) : index.value - 1)
    }
    /**
     * 跳转到下一项
     */
    function next(useCircular = false) {
      to(useCircular ? getCircleIndex(1) : index.value + 1)
    }

    /**
     * 获取循环的索引
     */
    function getCircleIndex(step: number) {
      const length = $items.length
      return (index.value + length + (step % length)) % length
    }

    function updateSwipeLoop(offset?: number) {
      if (!circular) {
        return
      }

      const slideIndex = index.value
      const lastIndex = getLastIndex()
      const itemCount = lastIndex + 1

      $items.forEach(($item, index) => {
        if (offset != null && offset < 0) {
          if (slideIndex === 0 && index === lastIndex) {
            $item.style.transform = getTransformStyleValue(
              -itemSize * itemCount
            )
          } else {
            $item.style.transform = ''
          }
        } else if (offset != null && offset > 0) {
          if (slideIndex === lastIndex && index === 0) {
            $item.style.transform = getTransformStyleValue(itemSize * itemCount)
          } else {
            $item.style.transform = ''
          }
        } else {
          if (slideIndex === 0 && index === lastIndex) {
            $item.style.transform = getTransformStyleValue(
              -itemSize * itemCount
            )
          } else if (slideIndex === lastIndex && index === 0) {
            $item.style.transform = getTransformStyleValue(itemSize * itemCount)
          } else {
            $item.style.transform = ''
          }
        }
      })

      if (offset == null) {
        updateListStyle(-itemSize * slideIndex)
      }
    }

    function getLastIndex() {
      return $items.length - 1
    }

    /**
     * 获取滑动距离值
     */
    function getTransformStyleValue(size: number) {
      return (
        'translate3d(' +
        (direction.value === 'x'
          ? size + 'px, 0px, 0px'
          : '0px, ' + size + 'px, 0px') +
        ')'
      )
    }

    function updateListStyle(transSize: number, duration = 0) {
      const listStyle = (list.value as HTMLElement).style

      listStyle.transitionDuration = duration + 'ms'
      listStyle.transform = getTransformStyleValue(transSize)
      prevTranSize = transSize
    }

    function onBeforeSlide(toIndex: number, fromIndex: number) {
      if (toIndex !== fromIndex) {
        // 排重
        emit('update:activeIndex', toIndex)
        emit('change', {
          activeIndex: toIndex,
          fromIndex
        })
      }

      index.value = toIndex
    }

    function onSlide(toIndex: number, fromIndex: number) {
      emit('animated', {
        activeIndex: toIndex,
        fromIndex
      })
    }

    function onClick(e: Event) {
      if (!horizontal) {
        emit('click', e)
      }
    }

    /**
     *  到指定项
     */
    function to(toIndex: number, animated = true) {
      const lastIndex = getLastIndex()
      let slideIndex = toIndex

      if (lastIndex < 0) {
        return
      }

      if (toIndex >= 0 && toIndex <= lastIndex && toIndex != index.value) {
        slide(toIndex, slideIndex, animated)
      } else {
        if (circular) {
          if (toIndex < 0) {
            slideIndex = -1
            toIndex = lastIndex
          } else if (toIndex > lastIndex) {
            slideIndex = lastIndex + 1
            toIndex = 0
          }
        } else {
          toIndex = index.value
        }

        slide(toIndex, slideIndex, animated)
      }
    }

    let playing = false
    let durationTimer: number

    /**
     * 滑动实现
     */
    function slide(toIndex: number, slideIndex: number, animated = true) {
      if (itemSize === 0 || playing) {
        return
      }

      if (!circular) {
        slideIndex = toIndex
      }

      playing = true

      const fromIndex = index.value
      const transSize = -itemSize * slideIndex
      const transSizeOffset = prevTranSize - transSize

      if (fromIndex !== slideIndex) {
        updateSwipeLoop(transSizeOffset)
      }

      onBeforeSlide(toIndex, fromIndex)

      // if (toIndex !== fromIndex) {
      //   onChange(toIndex, fromIndex)
      // }

      let duration = props.duration

      if (duration == null) {
        duration = Math.abs(transSizeOffset)
        duration = Math.max(100, Math.min(800, duration))
      }

      if (animated === false) {
        duration = 0
      }

      updateListStyle(transSize, duration)

      clearTimeout(durationTimer)
      durationTimer = window.setTimeout(() => {
        updateListStyle(transSize, 0)

        animateDone(transSize, toIndex, fromIndex, 0)
      }, duration)
    }

    function animateDone(
      transSize: number,
      toIndex: number,
      fromIndex: number,
      frameNumber: number
    ) {
      durationTimer = requestAnimationFrame(() => {
        const transform = window.getComputedStyle(list.value as HTMLElement)
          .transform

        const currentSize = transform
          .slice(7, transform.length - 1)
          .split(', ')[direction.value === 'y' ? 5 : 4]

        if (
          parseFloat(currentSize).toFixed(2) === transSize.toFixed(2) ||
          frameNumber > 0
        ) {
          // 校对清楚再回调
          playing = false

          // 滑动回调
          onSlide(toIndex, fromIndex)

          updateSwipeLoop()
        } else {
          animateDone(transSize, toIndex, fromIndex, ++frameNumber)
        }
      })
    }

    let isFirst = true

    function resetItems(res: HTMLElement[]) {
      $items = res
      setSlideStyle()

      const last = getLastIndex()

      if (isFirst) {
        isFirst = false

        if (props.activeIndex !== 0) {
          swipeTo(props.activeIndex)
        }
      } else if (index.value > last) {
        to(last)
      }
    }

    /**
     * 设置滑动样式属性
     */
    function setSlideStyle() {
      const $root = root.value as HTMLElement
      const $list = list.value as HTMLElement

      const sizeName = directionGroup[2]
      itemSize = $root[('client' + sizeName) as 'clientWidth']

      $root.style[('overflow' + directionGroup[0]) as 'overflowY'] = 'hidden'

      const styleObj: StyleObject = {
        '--webkit-backface-visibility': 'hidden',
        '--webkit-perspective': '1000'
      }
      styleObj[sizeName.toLowerCase()] = itemSize * $items.length + 'px'
      styleObj.transition = `transform 0ms ease-out`
      // styleObj.transition = `transform 0ms cubic-bezier(0.4, 0.0, 0.2, 1)`

      $list.style.cssText = styleObject2CssText(styleObj)

      updateListStyle(-itemSize * index.value)

      pagination.length = 0

      $items.forEach(($item, i) => {
        $item.dataset.index = i.toString()

        let cssText = `${sizeName.toLowerCase()}: ${itemSize}px;`

        if (direction.value === 'x') {
          // 左右滑动
          cssText += 'float: left;'
        }

        $item.style.cssText = cssText

        pagination.push(i)
      })
    }

    let autoplayTimer: number

    /**
     * 开始幻灯片
     */
    function start() {
      stop()
      props.autoplay &&
        (autoplayTimer = window.setInterval(() => {
          to(getCircleIndex(1))
        }, props.interval))
    }

    /**
     * 结束幻灯片
     */
    function stop() {
      clearTimeout(autoplayTimer)
    }

    function getItemEl(index: number) {
      return $items[index] || null
    }

    const { list, update } = useList('swiper', resetItems)

    useResizeDetector(root, () => update(50))

    let coords: SwiperCoords | null
    let inMove = false

    useTouch({
      el: root,
      // 滑动开始事件-记录坐标
      onTouchStart(e: UseTouchEvent) {
        // 禁止图片拖拽
        if (e.target.tagName === 'IMG') {
          e.target.ondragstart = function() {
            return false
          }
        }
        // e.preventDefault()
        if (playing) {
          return
        }

        // 清除幻灯片
        stop()

        inMove = true
        horizontal = null
        // 记录坐标

        coords = {
          startX: e.touchObject.pageX,
          startY: e.touchObject.pageY,
          stopX: e.touchObject.pageX,
          stopY: e.touchObject.pageY,
          timeStamp: e.timeStamp,
          offset: null
        }
      },
      /**
       * 滑动过程事件-判断横竖向，跟随滑动
       */
      onTouchMove(e: UseTouchEvent) {
        if (!inMove || !coords) {
          return
        }

        coords.stopX = e.touchObject.pageX
        coords.stopY = e.touchObject.pageY

        let offsetX = coords.startX - coords.stopX
        let offsetY = coords.startY - coords.stopY

        if (direction.value === 'y') {
          // 垂直
          offsetX = [offsetY, (offsetY = offsetX)][0]
        }

        const absX = Math.abs(offsetX)
        const absY = Math.abs(offsetY)

        if (horizontal === null) {
          // 首次
          if (offsetX !== 0) {
            // bug hack
            e.preventDefault()
          }
        } else {
          // 首次move确认是否水平移动
          if (absX > absY) {
            horizontal = true
            if (offsetX !== 0) {
              e.preventDefault()
            }
          } else {
            coords = null
            horizontal = false
            return
          }
        }

        const active = index.value
        let transSize = active * itemSize

        if (
          !circular &&
          ((active === 0 && offsetX < 0) ||
            (active === getLastIndex() && offsetX > 0))
        ) {
          transSize += getStretchOffset(offsetX)
        } else {
          transSize += offsetX
        }

        if (absX < itemSize) {
          if (coords.offset == null || offsetX > 0 !== coords.offset) {
            updateSwipeLoop(offsetX)
            coords.offset = offsetX > 0
          }

          updateListStyle(-transSize)
        }
      },
      /**
       * 滑动结束事件-滑到指定位置，重置状态
       */
      onTouchEnd(e: UseTouchEvent) {
        if (!inMove) {
          return
        }

        inMove = false

        if (coords) {
          const offsetX =
            direction.value === 'x'
              ? coords.startX - coords.stopX
              : coords.startY - coords.stopY
          let absX = Math.abs(offsetX)
          const active = index.value

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

            to(transIndex)
            coords = null
          }
        }

        start()
      }
    })

    watch(
      () => props.activeIndex,
      val => swipeTo(val)
    )

    watch([() => props.autoplay, () => props.interval], () => {
      start()
    })

    onMounted(() => {
      // 设置方向
      if (props.initialVertical) {
        direction.value = 'y'
        directionGroup = ['Y', 'X', 'Height', 'Width']
      } else {
        direction.value = 'x'
        directionGroup = ['X', 'Y', 'Width', 'Height']
      }

      start()
    })

    onBeforeUnmount(() => {
      clearTimeout(durationTimer)
      stop()
      $items = []
    })

    provide('fxSwiperUpdate', update)
    provide('disableFixed', true)

    return {
      root,
      list,
      swipeTo,
      prev,
      next,
      onClick,
      index,
      direction,
      pagination,
      update,
      getItemEl
    }
  }
})
</script>
