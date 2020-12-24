<template>
  <div :class="[prefix + '-scroll-tab']">
    <div :class="[prefix + '-scroll-tab_sidebar']">
      <sticky
        ref="sidebar"
        :offset-top="offsetTop"
        :offset-bottom="offsetBottom"
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
        :offset-top="offsetTop"
        ref="body"
        v-model="activeIndex"
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
import { isNumber, isString } from '../../helpers/util'

export default {
  name: SDKKey + '-scroll-tab',
  components: { Tab, Sticky, StickyView },
  props: {
    offsetTop: {
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return isNumber(value) || isString(value)
      },
      default: 0
    },
    offsetBottom: {
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return isNumber(value) || isString(value)
      },
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
  computed: {},
  watch: {},
  created() {},
  ready() {},
  mounted() {
    this.resetContainer(document)
  },
  updated() {},
  attached() {},
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
