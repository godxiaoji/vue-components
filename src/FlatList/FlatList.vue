<template>
  <scroll-view
    class="fx-flat-list"
    :class="{ horizontal }"
    :scroll-x="scrollX"
    :scroll-y="scrollY"
    :lower-threshold="lowerThreshold"
    :enable-pull-directions="enablePullDirections"
    :lowerLoading="lowerLoading"
    @scroll="onScroll"
    @scroll-to-lower="onScrollToLower"
    @refreshing="onRefreshing"
    ref="scrollView"
  >
    <div class="fx-flat-list_header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <ul class="fx-flat-list_list" ref="listEl">
      <li
        class="fx-flat-list_item"
        v-for="(item, index) in list"
        :key="
          dataKey
            ? dataKey === '*this'
              ? item.data
              : item.data[dataKey]
            : index
        "
      >
        <div
          class="fx-flat-list_item-inner"
          v-show="!item.recycled"
          :style="itemStyles"
        >
          <slot :item="item.data" :index="index"> </slot>
        </div>
        <div
          class="fx-flat-list_separator"
          v-if="cols.length <= 1 && $slots.separator && index < list.length - 1"
        >
          <slot name="separator"></slot>
        </div>
      </li>
    </ul>
    <div class="fx-flat-list_indicator" v-show="lowerLoading">
      <icon icon="LoadingOutlined" spin /><span>正在加载</span>
    </div>
    <div class="fx-flat-list_empty" v-show="list.length === 0">
      <slot name="empty"></slot>
    </div>
    <div class="fx-flat-list_footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </scroll-view>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  nextTick,
  watch,
  ComponentPublicInstance,
  shallowRef
} from 'vue'
import Icon from '@/Icon'
import {
  cloneData,
  isFunction,
  isInNumberRange,
  isInteger,
  isNumber,
  isNumberArray,
  rangeInteger
} from '@/helpers/util'
import ScrollView from '@/ScrollView'
import Exception from '@/helpers/exception'
import { getRelativeOffset } from '@/helpers/dom'
import { useResizeDetector } from '@/hooks/resize-detector'
import {
  ScrollToIndexOptions,
  ScrollToOffsetOptions,
  StyleObject
} from '@/helpers/types'

interface FlatItemElement extends HTMLElement {
  _recycled?: boolean
  _translateOffset?: number
}

export default defineComponent({
  name: 'fx-flat-list',
  components: { ScrollView, Icon },
  props: {
    dataKey: {
      type: String,
      default: null
    },
    data: {
      type: Array as PropType<any[]>,
      required: true,
      default: () => []
    },
    getItemSize: {
      type: Function,
      default: null
    },
    itemSize: {
      type: Number,
      default: null
    },
    // 横向
    initialHorizontal: {
      type: Boolean,
      default: false
    },
    // 预加载多少屏
    preLoad: {
      type: Number,
      default: 2
    },
    // 决定当距离内容最底部还有多远时触发endReached回调
    endReachedThreshold: {
      type: Number,
      default: 0.5
    },
    // 是否开启下拉刷新
    enablePullRefresh: {
      type: Boolean,
      default: false
    },
    lowerLoading: {
      type: Boolean,
      default: false
    },
    initialWaterfall: {
      type: Boolean,
      default: false
    },
    waterfallColCount: {
      type: Number,
      validator: (val: number) => {
        return isInteger(val) && isInNumberRange(val, 2, 5)
      },
      default: 2
    },
    itemGutter: {
      validator: (val: number | number[]) => {
        return (
          isNumber(val) ||
          (isNumberArray(val) && (val as number[]).length === 2)
        )
      },
      default: 0
    }
  },
  emits: ['recycle-change', 'end-reached', 'scroll', 'refreshing'],
  setup(props, ctx) {
    const { emit } = ctx
    const cols = reactive<number[]>([])
    const list = reactive<
      {
        data: any
        recycled: boolean
      }[]
    >([])
    const scrollView = shallowRef<ComponentPublicInstance<typeof ScrollView>>()
    const listEl = ref<HTMLElement>()

    let wrapperSize = 0
    let scrollX = false
    let scrollY = true
    let scrollCount = 0
    let horizontal = false
    let colSize = 0

    if (props.initialWaterfall) {
      for (
        let i = 0, len = rangeInteger(props.waterfallColCount, 2, 5);
        i < len;
        i++
      ) {
        cols.push(0)
      }
    } else if (props.initialHorizontal) {
      horizontal = true
    }

    if (horizontal) {
      scrollX = true
      scrollY = false
    }

    function isSizeFixed() {
      return props.getItemSize != null || props.itemSize != null
    }

    function dataToList(data: any[]) {
      const newList: any[] = []
      const dataKey = props.dataKey

      data.forEach((v, k) => {
        const oldItem = list[k]
        // 如果没有固定高度（或宽度），默认不回收，因为需要展示以获取当前高度
        const newItem = { data: v, recycled: isSizeFixed() }

        if (oldItem) {
          if (dataKey === '*this' && v === oldItem.data) {
            newItem.recycled = oldItem.recycled
          } else if (dataKey && v[dataKey] === oldItem.data[dataKey]) {
            newItem.recycled = oldItem.recycled
          } else if (!dataKey) {
            newItem.recycled = oldItem.recycled
          }
        }

        newList.push(newItem)
      })

      list.splice(0, Infinity, ...newList)
    }

    function getRootEl() {
      return scrollView.value?.$el as HTMLElement
    }

    function updateSize() {
      const $root = getRootEl()

      wrapperSize = getElSize($root)
      colSize = $root.offsetWidth / cols.length
    }

    function getElSize($el: HTMLElement) {
      return $el[scrollX ? 'offsetWidth' : 'offsetHeight']
    }

    function getScrollSize() {
      return getRootEl()[scrollX ? 'scrollLeft' : 'scrollTop']
    }

    function onRefreshing(
      res: {
        pullDirection: string
      },
      done: () => void
    ) {
      emit('refreshing', res, done)
    }

    /**
     * 重新计算列表元素
     * @param scrollSize 滚动值
     * @param source 调用来源
     */
    function updateItems(scrollSize: number | null, source?: string) {
      // console.log('updateItems', source)

      const $list = listEl.value as HTMLElement
      const newCols = cols.map(() => {
        return 0
      })

      const _scrollSize =
        scrollSize == null ? getScrollSize() : (scrollSize as number)

      getItemEls().forEach(($item, index) => {
        let offset = $list.offsetTop
        const sizeKey = scrollX ? 'width' : 'height'
        const itemLayout = getItemLayout($item, index)

        if (itemLayout.fixed) {
          $item.style[sizeKey] = itemLayout.size + 'px'
        } else {
          $item.style[sizeKey] =
            $item[scrollX ? 'offsetWidth' : 'offsetHeight'] + 'px'
        }

        if (newCols.length > 1) {
          const colMin = Math.min.apply(null, newCols)
          const colMinIndex = newCols.indexOf(colMin)

          $item.style.width = colSize + 'px'
          $item.style.position = 'absolute'
          $item.style.transform = `translate3d(${colMinIndex *
            colSize}px, ${colMin}px, 0)`

          newCols[colMinIndex] = colMin + $item.offsetHeight
          $item._translateOffset = offset = colMin
        } else {
          offset = $item[scrollX ? 'offsetLeft' : 'offsetTop']
        }

        const item = list[index]

        const change = (recycled: boolean) => {
          $item._recycled = recycled

          emit('recycle-change', {
            recycled,
            index,
            item: cloneData(item.data)
          })
        }

        if (
          offset >= _scrollSize - wrapperSize * props.preLoad &&
          offset <= _scrollSize + wrapperSize * (props.preLoad + 1)
        ) {
          // 展示
          // if (!itemLayout.fixed) {
          //   $item.style[sizeKey] = ''
          // }
          item.recycled = false

          if ($item._recycled == null || $item._recycled === true) {
            // 新的元素或者之前被回收的
            change(item.recycled)
          }
        } else {
          // 被回收
          // if (!itemLayout.fixed) {
          //   $item.style[sizeKey] = itemLayout.size + 'px'
          // }
          item.recycled = true

          if ($item._recycled == null || $item._recycled === false) {
            // 新的元素或者之前被回收的
            change(item.recycled)
          }
        }
      })

      if (newCols.length > 1) {
        $list.style.height = Math.max.apply(null, newCols) + 'px'
        cols.splice(0, Infinity, ...newCols)
      }
    }

    /**
     * 获取列表元素
     */
    function getItemEls() {
      const $list = listEl.value as HTMLElement
      const $els: FlatItemElement[] = []

      if (!$list) {
        return $els
      }

      const $children = $list.children

      for (let i = 0, len = $children.length; i < len; i++) {
        const $el = $children[i]
        if ($el.className.indexOf('item') > -1) {
          $els.push($el as FlatItemElement)
        }
      }

      return $els
    }

    function getItemLayout($el: HTMLElement, index: number) {
      if (isFunction(props.getItemSize)) {
        try {
          const size = props.getItemSize(cloneData(props.data[index]), index)

          if (isNumber(size)) {
            return {
              fixed: true,
              size
            }
          }
        } catch (error) {
          console.error(
            new Exception(
              'The object.size value returned by getItemSize should be a Number type.',
              Exception.TYPE.PROP_ERROR,
              'FlatList'
            )
          )
        }
      } else if (isNumber(props.itemSize)) {
        return {
          fixed: true,
          size: props.itemSize
        }
      }

      return {
        size: getElSize($el),
        fixed: false
      }
    }

    // /**
    //  * 设置列表项的尺寸，只在固定尺寸下生效
    //  */
    // function setItemsSize() {
    //   getItemEls().forEach(($item, index) => {
    //     const itemLayout = getItemLayout($item, index)

    //     if (itemLayout.fixed) {
    //       $item.style[scrollX ? 'width' : 'height'] = itemLayout.size + 'px'
    //     }
    //   })
    // }

    /**
     * 主动通知列表发生了一个事件，以使列表重新计算可视区域
     */
    function recordInteraction() {
      updateItems(null, 'recordInteraction')
    }

    function onResize() {
      updateSize()
      updateItems(null, 'resize')
    }

    let scrollTimer: number

    function onScroll(res: { scrollLeft: number; scrollTop: number }) {
      const scrollSize = res[scrollX ? 'scrollLeft' : 'scrollTop']

      if (scrollCount > 10) {
        // 每轮询10次更新一次
        scrollCount = 0
        clearTimeout(scrollTimer)
        updateItems(scrollSize, 'scroll')
      } else {
        clearTimeout(scrollTimer)
        scrollTimer = window.setTimeout(() => {
          scrollCount = 0
          updateItems(scrollSize, 'scroll')
        }, 17)
        scrollCount++
      }

      // scroll 事件回调
      emit('scroll', res)
    }

    function onScrollToLower() {
      const $el = getRootEl()
      const distanceFromEnd = scrollX
        ? $el.scrollWidth - $el.scrollLeft - $el.offsetWidth
        : $el.scrollHeight - $el.scrollTop - $el.offsetHeight

      if (!props.lowerLoading) {
        emit('end-reached', {
          distanceFromEnd
        })
      }
    }

    /**
     * 滚动列表到指定的偏移（以像素为单位）
     */
    function scrollToOffset(options: ScrollToOffsetOptions) {
      scrollView.value && scrollView.value.scrollToOffset(options)
    }

    /**
     * 滑动到第index个元素
     */
    function scrollToIndex(options: number | ScrollToIndexOptions) {
      let index: number
      let animated = true

      if (isNumber(options)) {
        index = options as number
        options = {
          index
        }
      } else {
        index = (options as ScrollToIndexOptions).index
        animated = !((options as ScrollToIndexOptions).animated === false)
      }

      const $view = getItemEls()[index]

      if ($view) {
        const parentOffset = getRelativeOffset(
          $view,
          getRootEl(),
          (options as ScrollToIndexOptions).viewPosition
        )

        const offset =
          parentOffset[scrollX ? 'offsetLeft' : 'offsetTop'] +
          ($view._translateOffset || 0)

        scrollToOffset({
          offset,
          animated
        })
      }
    }

    /**
     * 滚动到底部
     */
    function scrollToEnd(animated = false) {
      const $root = getRootEl()

      if (!$root) {
        return
      }

      scrollToOffset({
        offset: scrollX ? $root.scrollWidth : $root.scrollHeight,
        animated
      })
    }

    const lowerThreshold = computed(() => {
      return wrapperSize * props.endReachedThreshold
    })

    const itemStyles = computed(() => {
      const styles: StyleObject = {}
      const gutter: any = props.itemGutter

      if (isNumberArray(gutter) && gutter.length === 2) {
        styles.padding = `${gutter[1]}px ${gutter[0]}px`
      } else if (isNumber(gutter) && gutter > 0) {
        styles.padding = gutter + 'px'
      }

      return styles
    })

    const enablePullDirections = computed(() => {
      if (props.enablePullRefresh) {
        return horizontal ? ['right'] : ['down']
      }

      return []
    })

    watch(
      () => props.data,
      val => {
        dataToList(val)
        nextTick(() => updateItems(null, 'dataChange'))
      },
      {
        deep: true
      }
    )

    watch(
      () => props.itemSize,
      () => updateItems(null, 'itemSizeChange')
    )

    dataToList(props.data)

    useResizeDetector(scrollView, onResize)

    onMounted(() => {
      updateSize()
      updateItems(null, 'init')
    })

    return {
      listEl,
      scrollView,
      scrollX,
      scrollY,
      horizontal,
      list,
      cols,
      lowerThreshold,
      enablePullDirections,
      itemStyles,
      onRefreshing,
      recordInteraction,
      onScroll,
      onScrollToLower,
      scrollToOffset,
      scrollToIndex,
      scrollToEnd
    }
  }
})
</script>
