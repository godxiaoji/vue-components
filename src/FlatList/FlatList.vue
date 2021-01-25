<template>
  <scroll-view
    :class="[prefix + '-flat-list', scrollX ? 'horizontal' : null]"
    :scroll-x="scrollX"
    :scroll-y="scrollY"
    :lower-threshold="lowerThreshold"
    :enable-pull-directions="enablePullDirections"
    :lowerLoading="lowerLoading"
    @scroll="onScroll"
    @scroll-to-lower="onScrollToLower"
    @refreshing="onRefreshing"
  >
    <div :class="[prefix + '-flat-list_header']" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <ul :class="[prefix + '-flat-list_list']" ref="list">
      <li
        :class="[prefix + '-flat-list_item']"
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
          :class="[prefix + '-flat-list_item-inner']"
          v-show="!item.recycled"
        >
          <slot name="item" :item="item.data" :index="index"> </slot>
        </div>
        <div
          :class="[prefix + '-flat-list_separator']"
          v-if="$slots.separator && index < list.length - 1"
        >
          <slot name="separator"></slot>
        </div>
      </li>
    </ul>
    <div :class="[prefix + '-flat-list_empty']" v-show="list.length === 0">
      <slot name="empty"></slot>
    </div>
    <div :class="[prefix + '-flat-list_footer']" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
    <div :class="[prefix + '-flat-list_indicator']" v-show="lowerLoading">
      <icon icon="LoadingOutlined" spin /><span>正在加载</span>
    </div>
  </scroll-view>
</template>

<script>
import Icon from '../Icon'
import { cloneData, isFunction, isNumber, isObject } from '../helpers/util'
import { SDKKey } from '../config'
import ScrollView from '../ScrollView/ScrollView.vue'
import Exception from '../helpers/exception'

export default {
  name: SDKKey + '-flat-list',
  components: { ScrollView, Icon },
  props: {
    dataKey: {
      type: String,
      default: null
    },
    data: {
      type: Array,
      required: true,
      default() {
        return []
      }
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
    horizontal: {
      type: Boolean,
      default: false
    },
    // 开始时屏幕顶端的元素是列表中的第 initialScrollIndex个元素, 而不是第一个元素
    initialScrollIndex: {
      type: Number,
      default: 0
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
    }
  },
  data() {
    return {
      prefix: SDKKey,
      wrapperSize: 0,
      scrollX: false,
      scrollY: true,

      list: []
    }
  },
  computed: {
    sizeFixed() {
      return this.getItemSize != null || this.itemSize != null
    },
    lowerThreshold() {
      return this.wrapperSize * this.endReachedThreshold
    },
    enablePullDirections() {
      if (this.enablePullRefresh) {
        return this.horizontal ? ['right'] : ['down']
      }

      return []
    }
  },
  watch: {
    data: {
      handler(val) {
        this.dataToList(val)
        this.$nextTick(() => {
          this.updateItems(null, 'dataChange')
        })
      }
    },
    itemSize() {
      this.setItemsSize()
    }
  },
  created() {
    this.scrollCount = 0
    if (this.horizontal) {
      this.scrollX = true
      this.scrollY = false
    }

    this.dataToList(this.data)
  },
  mounted() {
    this.wrapperSize = this.getElSize(this.$el)
    this.$el.addEventListener('resize', this.onResize, false)

    let scrolled = false

    if (this.initialScrollIndex >= 0) {
      if (this.sizeFixed) {
        this.setItemsSize()
      }

      const oldScrollSize = this.getScrollSize()
      if (this.initialScrollIndex > 0) {
        this.scrollToIndex(this.initialScrollIndex)
      }
      const newScrollSize = this.getScrollSize()
      if (newScrollSize !== oldScrollSize) {
        scrolled = true
      }
    }

    if (!scrolled) {
      this.updateItems(null, 'init')
    }
  },
  beforeDestroy() {
    this.$el.removeEventListener('resize', this.onResize, false)
  },
  methods: {
    onRefreshing(res, done) {
      this.$emit('refreshing', res, done)
    },

    getScrollSize() {
      return this.$el[this.scrollX ? 'scrollLeft' : 'scrollTop']
    },
    dataToList(data) {
      const newList = []

      data.forEach((v, k) => {
        const oldItem = this.list[k]
        // 如果没有固定高度（或宽度），默认不回收，因为需要展示以获取当前高度
        const newItem = { data: v, recycled: this.sizeFixed ? true : false }

        if (oldItem) {
          if (this.dataKey === '*this' && v === oldItem.data) {
            newItem.recycled = oldItem.recycled
          } else if (
            this.dataKey &&
            v[this.dataKey] === oldItem.data[this.dataKey]
          ) {
            newItem.recycled = oldItem.recycled
          } else if (!this.dataKey) {
            newItem.recycled = oldItem.recycled
          }
        }

        newList.push(newItem)
      })
      this.list = newList
    },
    onScroll(res) {
      const scrollSize = res[this.scrollX ? 'scrollLeft' : 'scrollTop']

      if (this.scrollCount > 10) {
        // 每轮询10次更新一次
        this.scrollCount = 0
        clearTimeout(this.scrollTimer)
        this.updateItems(scrollSize, 'scroll')
      } else {
        clearTimeout(this.scrollTimer)
        this.scrollTimer = setTimeout(() => {
          this.scrollCount = 0
          this.updateItems(scrollSize, 'scroll')
        }, 17)
        this.scrollCount++
      }

      // scroll 事件回调
      this.$emit('scroll', res)
    },
    onScrollToLower() {
      const $el = this.$el
      const distanceFromEnd = this.scrollX
        ? $el.scrollWidth - $el.scrollLeft - $el.offsetWidth
        : $el.scrollHeight - $el.scrollTop - $el.offsetHeight

      if (!this.lowerLoading) {
        this.$emit('end-reached', {
          distanceFromEnd
        })
      }
    },
    onResize() {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        this.wrapperSize = this.getElSize(this.$el)
        this.updateItems(null, 'resize')
      }, 17)
    },
    getElSize($el) {
      return $el[this.scrollX ? 'offsetWidth' : 'offsetHeight']
    },
    getItemLayout($el, index) {
      if (isFunction(this.getItemSize)) {
        try {
          const size = this.getItemSize(cloneData(this.data[index]), index)

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
      } else if (isNumber(this.itemSize)) {
        return {
          fixed: true,
          size: this.itemSize
        }
      }

      return {
        size: this.getElSize($el),
        fixed: false
      }
    },
    /**
     * 设置列表项的尺寸，只在固定尺寸下生效
     */
    setItemsSize() {
      this.getItemEls().forEach(($item, index) => {
        const sizeKey = this.scrollX ? 'width' : 'height'
        const itemLayout = this.getItemLayout($item, index)

        if (itemLayout.fixed) {
          $item.style[sizeKey] = itemLayout.size + 'px'
        }
      })
    },
    /**
     * 重新计算列表元素
     * @param {Number?} scrollSize 滚动值
     * @param {String?} source 调用来源
     */
    updateItems(scrollSize) {
      const wrapperSize = this.wrapperSize

      if (scrollSize == null) {
        scrollSize = this.getScrollSize()
      }

      this.getItemEls().forEach(($item, index) => {
        const offset = $item[this.scrollX ? 'offsetLeft' : 'offsetTop']
        const sizeKey = this.scrollX ? 'width' : 'height'
        const itemLayout = this.getItemLayout($item, index)
        const item = this.list[index]

        const change = recycled => {
          $item._recycled = recycled

          this.$emit('recycle-change', {
            recycled,
            index,
            item: cloneData(item.data)
          })
        }

        if (itemLayout.fixed) {
          $item.style[sizeKey] = itemLayout.size + 'px'
        }

        if (
          offset >= scrollSize - wrapperSize * this.preLoad &&
          offset <= scrollSize + wrapperSize * (this.preLoad + 1)
        ) {
          // 展示
          if (!itemLayout.fixed) {
            $item.style[sizeKey] = ''
          }
          item.recycled = false

          if ($item._recycled == null || $item._recycled === true) {
            // 新的元素或者之前被回收的
            change(item.recycled)
          }
        } else {
          // 被回收
          if (!itemLayout.fixed) {
            $item.style[sizeKey] = itemLayout.size + 'px'
          }
          item.recycled = true

          if ($item._recycled == null || $item._recycled === false) {
            // 新的元素或者之前被回收的
            change(item.recycled)
          }
        }
      })
    },
    /**
     * 获取列表元素
     */
    getItemEls() {
      const $els = []
      const $children = this.$refs.list.children

      for (let i = 0, len = $children.length; i < len; i++) {
        const $el = $children[i]
        if ($el.className.indexOf('item') > -1) {
          $els.push($el)
        }
      }

      return $els
    },
    /**
     * 滑动到第index个元素
     */
    scrollToIndex(options) {
      let index
      let behavior = 'smooth'
      let block = 'start'
      let inline = 'nearest'

      if (isNumber(options)) {
        index = options
        behavior = 'auto'
      } else {
        index = options.index
        if (options.animated === false) behavior = 'auto'

        if (options.viewPosition === 0.5 || options.viewPosition === 'center') {
          block = 'center'
        } else if (
          options.viewPosition === 1 ||
          options.viewPosition === 'end'
        ) {
          block = 'end'
        }
      }

      if (this.scrollX) {
        // 如果是水平的，数值换一下
        block = [inline, (inline = block)][0]
      }

      const $view = this.getItemEls()[index]

      if ($view) {
        $view.scrollIntoView({
          behavior,
          block,
          inline
        })
      }
    },
    /**
     * 滚动列表到指定的偏移（以像素为单位）
     */
    scrollToOffset(options) {
      let behavior = 'smooth'
      let top = 0
      let left = 0

      if (isNumber(options)) {
        top = options
        behavior = 'auto'
      } else {
        top = options.offset
        if (options.animated === false) behavior = 'auto'
      }

      if (this.scrollX) {
        // 如果是水平的，数值换一下
        top = [left, (left = top)][0]
      }

      this.$el.scrollTo({
        top,
        left,
        behavior
      })
    },
    /**
     * 滚动到底部
     */
    scrollToEnd(options) {
      let offset = this.scrollX ? this.$el.scrollWidth : this.$el.scrollHeight

      if (isObject(options)) {
        options.offset = offset
      } else {
        options = { offset }
      }

      this.scrollToOffset(options)
    },
    /**
     * 主动通知列表发生了一个事件，以使列表重新计算可视区域
     */
    recordInteraction() {
      this.updateItems(null, 'recordInteraction')
    }
  }
}
</script>
