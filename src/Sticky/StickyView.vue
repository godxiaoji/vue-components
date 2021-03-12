<template>
  <div class="fx-sticky-view">
    <div class="fx-sticky-view_list" ref="list">
      <slot></slot>
    </div>
    <sticky
      :offset-top="offsetTop"
      :contain-selector="containSelector"
      :disabled="disabled"
      class="fx-sticky-view_top"
      ref="sticky"
    >
      <div ref="fixed" class="fx-sticky-view_fixed" :style="fixedStyles">
        {{ title }}
      </div>
    </sticky>
  </div>
</template>

<script>
import Sticky from '../Sticky'
import { addScrollEvent, removeScrollEvent } from '../helpers/events'
import { getRelativeOffset, getSizeValue, querySelector } from '../helpers/dom'
import { eventSelectorValidator, sizeValidator } from '../helpers/validator'
import listMixin from '../util/list-mixin'

export default {
  name: 'fx-sticky-view',
  components: { Sticky },
  mixins: [listMixin],
  provide() {
    return {
      appSticky: this
    }
  },
  props: {
    // 纵向
    activeIndex: {
      type: Number,
      default: 0
    },
    containSelector: {
      validator: eventSelectorValidator,
      default: null
    },
    offsetTop: {
      validator: sizeValidator,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      $items: [],

      index: 0,

      title: '',
      titleY: 0,

      isSelfContainer: false
    }
  },
  computed: {
    fixedStyles() {
      return {
        transform: `translate3d(0px, ${
          this.titleY === null ? '-100%' : this.titleY + 'px'
        }, 0px)`
      }
    }
  },
  watch: {
    activeIndex(val) {
      this.scrollToIndex({ index: val })
    }
  },
  mounted() {
    this.resetItems()

    this.resetContainer(this.containSelector)
  },
  beforeDestroy() {
    removeScrollEvent(this.onScroll, this.$container)
  },
  methods: {
    resetContainer(containSelector) {
      if (this.$container) {
        removeScrollEvent(this.onScroll, this.$container)
      }

      const $container = querySelector(containSelector) || this.$el

      this.$container = $container

      if ($container === this.$el) {
        this.isSelfContainer = true
      }

      this.$refs.sticky.resetContainer($container)

      addScrollEvent(this.onScroll, $container)

      this.updateFixed($container.scrollTop)
    },

    resetItems() {
      if (this._isDestroyed) {
        return
      }

      const $items = this.getItems('sticky-view').map(v => {
        return v._app_component
      })

      this.$items = $items

      this.updateFixed(this.$refs.list.scrollTop)

      this.$emit(
        'reset-items',
        $items.map((v, k) => {
          return {
            name: v.name,
            index: k
          }
        })
      )
    },

    updateFixed(scrollTop) {
      if (!this.$refs.fixed) {
        return
      }

      const h = this.$refs.fixed.clientHeight

      if (this.$items.length === 0) {
        this.title = ''
        this.titleY = -h
        return
      }

      const activeIndex = this.index
      const nextIndex = activeIndex + 1
      const offsetTops = this.getOffsetTops()
      //   console.log(offsetTops, scrollTop)
      const current = offsetTops[activeIndex]
      const next =
        offsetTops[nextIndex] != null ? offsetTops[nextIndex] : Infinity
      const first = offsetTops[0]

      if (scrollTop < first) {
        this.title = ''
        this.titleY = null
      } else if (scrollTop >= current) {
        if (scrollTop >= next) {
          this.index = nextIndex
          this.title = this.$items[nextIndex].name
          this.titleY = 0

          if (
            offsetTops[nextIndex + 1] &&
            scrollTop >= offsetTops[nextIndex + 1]
          ) {
            // 超过了
            this.updateFixed(scrollTop)
          } else {
            if (!this.isScrollTo) {
              this.$emit('update:activeIndex', this.index)
            }
            this.$emit('change', {
              activeIndex: this.index
            })
          }
        } else if (next - scrollTop < h) {
          this.titleY = next - scrollTop - h
        } else {
          this.title = this.$items[activeIndex].name
          this.titleY = 0
        }
      } else {
        if (current - scrollTop < h) {
          this.title = this.$items[activeIndex - 1].name
          this.titleY = current - scrollTop - h
        } else {
          this.index = activeIndex - 1
          this.title = this.$items[this.index].name
          this.titleY = 0

          if (
            offsetTops[activeIndex - 1] &&
            offsetTops[activeIndex - 1] > scrollTop
          ) {
            this.updateFixed(scrollTop)
          } else {
            if (!this.isScrollTo) {
              this.$emit('update:activeIndex', this.index)
            }

            this.$emit('change', {
              activeIndex: this.index
            })
          }
        }
      }

      delete this.isScrollTo
    },

    /**
     * 滚动到第index个
     * @param {Object} options
     */
    scrollToIndex({ index }) {
      if (this.$items[index] && index != this.index) {
        this.scrollToOffset({
          offset: getRelativeOffset(this.$items[index].$el, this.$container)
            .offsetTop
        })
      }
    },

    /**
     * 滚到到指定位置
     * @param {Object} options
     */
    scrollToOffset({ offset }) {
      this.isScrollTo = true
      this.$container.scrollTop = offset
    },

    getOffsetTops() {
      const offset =
        getRelativeOffset(this.$refs.list, this.$container).offsetTop -
        getSizeValue(this.offsetTop)

      return this.$items.map(v => {
        return v.$el.offsetTop + offset
      })
    },

    onScroll(e, { scrollTop }) {
      // console.log(scrollTop)
      this.updateFixed(scrollTop)
    }
  }
}
</script>
