<template>
  <div :class="[prefix + '-tab-view', { vertical: initialVertical }]">
    <div
      :class="[prefix + '-tab-view_header', prefix + '-horizontal-hairline']"
    >
      <tab
        :options="tabList"
        v-model="activeIndex"
        :vertical="vertical"
        :scroll-threshold="scrollThreshold"
      />
    </div>
    <div :class="[prefix + '-tab-view_body']" ref="list">
      <swiper
        :activeIndex.sync="activeIndex"
        @change="onChange"
        ref="swiper"
        :initial-vertical="vertical"
      >
        <slot></slot>
      </swiper>
    </div>
  </div>
</template>

<script>
import Tab from '../Tab'
import { Swiper } from '../Swiper'
import { SDKKey } from '../../config'

export default {
  name: SDKKey + '-tab-view',
  components: { Tab, Swiper },
  provide() {
    return {
      appTabView: this
    }
  },
  props: {
    // 纵向
    initialVertical: {
      type: Boolean,
      default: false
    },
    scrollThreshold: {
      type: Number,
      default: 4
    },
    backUpperWhenChange: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: SDKKey,

      activeIndex: 0,

      tabList: [],

      vertical: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.vertical = !!this.initialVertical
  },
  ready() {},
  mounted() {
    this.isInit = true
    this.update()
  },
  updated() {},
  attached() {},
  destroyed() {},
  methods: {
    update() {
      if (!this.isInit) {
        return
      }

      clearTimeout(this.updateTimer)
      this.updateTimer = setTimeout(() => {
        this.resetItems()
      }, 17)
    },
    resetItems() {
      if (this._isDestroyed) {
        return
      }

      const $newItems = []

      const $items = [].slice.call(
        this.$refs.list.querySelectorAll(`.${SDKKey}-tab-view-item`),
        0
      )

      $items.forEach($item => {
        if ($item._app_name === 'tab-view-item') {
          $newItems.push($item._app_component)
        }
      })

      this.tabList = $newItems.map(($item, index) => {
        return {
          label: $item.name,
          value: index
        }
      })
    },
    onChange(res) {
      this.$emit('change', res)

      if (this.backTopWhenChange) {
        // 切换时回到顶部
        const $viewItem = this.$refs.swiper.$items[res.activeIndex]

        if ($viewItem) {
          $viewItem.scrollTop = 0
          $viewItem.scrollLeft = 0

          const $firstChild = $viewItem.firstElementChild

          if (
            $firstChild &&
            $firstChild.className.indexOf(`${SDKKey}-scroll-view`) !== -1
          ) {
            // ScrollView
            $firstChild.scrollTo({
              top: 0,
              left: 0,
              behavior: 'instant'
            })
          }
        }
      }
    },
    swipeTo(activeIndex) {
      this.$refs.swiper.swipeTo(activeIndex)
    }
  }
}
</script>

<style lang="scss">
@import '../component.module.scss';

.#{$prefix}-tab-view {
  background-color: #fff;

  &_header {
    position: relative;
    height: 37px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &::after {
      content: '';
    }
  }

  &_body {
    height: calc(100% - 37px);

    .#{$prefix}-swiper {
      height: 100%;
    }
  }

  &.vertical {
    display: flex;

    .#{$prefix}-tab-view {
      &_header {
        width: 80px;
        height: 100%;
        background-color: $background-color;

        &::after {
          content: none;
        }
      }

      &_body {
        flex: 1;
        height: 100%;
      }
    }
  }
}
</style>
