<template>
  <div class="fx-scroll-tab">
    <div class="fx-scroll-tab_sidebar">
      <sticky
        ref="sidebar"
        :offset-top="stickyOffsetTop"
        :offset-bottom="stickyOffsetBottom"
      >
        <side-tab :options="tabList" :activeValue.sync="activeIndex" />
      </sticky>
    </div>
    <div class="fx-scroll-tab_body">
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
import SideTab from '../SideTab'
import Sticky from '../Sticky'
import StickyView from '../StickyView'
import { querySelector } from '../helpers/dom'
import { sizeValidator } from '../helpers/validator'

export default {
  name: 'fx-scroll-tab',
  components: { SideTab, Sticky, StickyView },
  props: {
    stickyOffsetTop: {
      validator: sizeValidator,
      default: 0
    },
    stickyOffsetBottom: {
      validator: sizeValidator,
      default: 0
    }
  },
  data() {
    return {
      activeIndex: 0,

      tabList: []
    }
  },
  mounted() {
    this.resetContainer(document)
  },
  methods: {
    resetContainer(containSelector) {
      const $container = querySelector(containSelector)

      this.$refs.sidebar.resetContainer($container)
      this.$refs.body.resetContainer($container)
    },

    onResetItems(list) {
      this.tabList = list.map(({ name, index }) => {
        return {
          label: name,
          value: index
        }
      })
    },

    onChange(res) {
      this.$emit('change', res)
    },

    /**
     * 滚动到第index个
     * @param {Number} index
     */
    scrollToIndex(index) {
      this.$refs.body.scrollToIndex(index)
    },

    /**
     * 滚到到指定位置
     * @param {Number} scrollTop
     */
    scrollTo(scrollTop) {
      this.$refs.body.scrollTo(scrollTop)
    }
  }
}
</script>
