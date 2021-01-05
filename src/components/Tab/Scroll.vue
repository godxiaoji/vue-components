<template>
  <div :class="[prefix + '-scroll-tab']">
    <div :class="[prefix + '-scroll-tab_sidebar']">
      <sticky
        ref="sidebar"
        :offset-top="stickyOffsetTop"
        :offset-bottom="stickyOffsetBottom"
      >
        <tab
          :options="tabList"
          v-model="activeIndex"
          :vertical="true"
          :scroll-threshold="1"
        />
      </sticky>
    </div>
    <div :class="[prefix + '-scroll-tab_body']">
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
import Tab from '../Tab'
import Sticky from '../Sticky'
import StickyView from '../Sticky/View.vue'
import { SDKKey } from '../../config'
import { querySelector } from '../../helpers/dom'
import { sizeValidator } from '../../helpers/validator'

export default {
  name: SDKKey + '-scroll-tab',
  components: { Tab, Sticky, StickyView },
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
      prefix: SDKKey,

      activeIndex: 0,

      tabList: []
    }
  },
  mounted() {
    this.resetContainer(document)
  },
  destroyed() {},
  methods: {
    resetContainer(containSelector) {
      const $container = querySelector(containSelector)

      this.$refs.sidebar.resetContainer($container)
      this.$refs.body.resetContainer($container)
    },

    onResetItems(list) {
      if (this._isDestroyed) {
        return
      }

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

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-scroll-tab {
  display: flex;
  overflow-y: auto;
  position: relative;
  background-color: $background-color;

  &_sidebar {
    width: 80px;
    height: 100%;
    flex-grow: 0;
    background-color: $background-color;
  }

  &_body {
    flex: 1;
  }
}
</style>
