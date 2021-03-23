<template>
  <div class="fx-tab-view" :class="{ vertical: initialVertical }">
    <div class="fx-tab-view_header fx-horizontal-hairline">
      <side-tab
        v-if="vertical"
        :options="tabList"
        :activeValue.sync="activeIndex"
      ></side-tab>
      <tab
        v-else
        :options="tabList"
        :activeValue.sync="activeIndex"
        :scroll-threshold="scrollThreshold"
      />
    </div>
    <div class="fx-tab-view_body" ref="list">
      <swiper
        :activeIndex.sync="activeIndex"
        @change="onChange"
        @animated="onAnimated"
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
import SideTab from '../SideTab'
import Swiper from '../Swiper'
import listMixin from '../util/list-mixin'

export default {
  name: 'fx-tab-view',
  components: { Tab, SideTab, Swiper },
  mixins: [listMixin],
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
      activeIndex: 0,

      tabList: [],

      vertical: false
    }
  },
  created() {
    this.vertical = !!this.initialVertical
  },
  mounted() {
    this.update()
  },
  methods: {
    resetItems() {
      if (this._isDestroyed) {
        return
      }

      const $newItems = []

      const $items = this.getItems('tab-view')

      $items.forEach($item => {
        if ($item._app_name === 'tab-view-item') {
          $newItems.push($item._app_component)
        }
      })

      this.tabList = $newItems.map(($item, index) => {
        return {
          subLabel: $item.subName,
          label: $item.name,
          value: index
        }
      })
    },
    onChange(res) {
      this.$emit('change', res)

      if (this.backUpperWhenChange) {
        // 切换时回到顶部
        const $viewItem = this.$refs.swiper.$items[res.activeIndex]

        if ($viewItem) {
          $viewItem.scrollTop = 0
          $viewItem.scrollLeft = 0

          const $firstChild = $viewItem.firstElementChild

          if (
            $firstChild &&
            $firstChild.className.indexOf(`fx-scroll-view`) !== -1
          ) {
            // ScrollView
            $firstChild.scrollTo({
              top: 0,
              left: 0,
              behavior: 'auto'
            })
          }
        }
      }
    },
    onAnimated(res) {
      this.$emit('animated', res)
    },
    swipeTo(activeIndex) {
      this.$refs.swiper.swipeTo(activeIndex)
    }
  }
}
</script>
