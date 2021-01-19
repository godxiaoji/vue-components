<template>
  <div :class="[prefix + '-tab-view', { vertical: initialVertical }]">
    <div
      :class="[prefix + '-tab-view_header', prefix + '-horizontal-hairline']"
    >
      <tab
        :options="tabList"
        v-model:activeValue="activeIndex"
        :vertical="vertical"
        :scroll-threshold="scrollThreshold"
      />
    </div>
    <div :class="[prefix + '-tab-view_body']" ref="list">
      <swiper
        v-model:activeIndex="activeIndex"
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
import Swiper from '../Swiper/Swiper.vue'
import { SDKKey } from '../config'
import listMixin from '../util/list-mixin'

export default {
  name: SDKKey + '-tab-view',
  components: { Tab, Swiper },
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
      prefix: SDKKey,

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
  emits: ['change'],
  methods: {
    resetItems() {
      if (this.$.isUnmounted) {
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
