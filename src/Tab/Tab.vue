<template>
  <div
    class="fx-tab"
    :class="{ vertical, 'no--scroll': options2.length <= scrollThreshold }"
  >
    <ul class="fx-tab_list" ref="list">
      <li
        class="fx-tab_item"
        :class="{
          active: index === activeIndex,
          'active-prev': index === activeIndex - 1,
          'active-next': index === activeIndex + 1
        }"
        v-for="(item, index) in options2"
        :key="item.value"
        @click="onChange(item.value)"
      >
        <badge class="fx-tab_item-inner" v-bind="item.badge">
          <icon
            v-if="item.icon"
            :icon="index === activeIndex ? item.activeIcon : item.icon"
          />
          <span class="fx-tab_item-text">{{ item.label }}</span>
        </badge>
      </li>
    </ul>
  </div>
</template>

<script>
import tabMixin from './tab-mixin'
import { frameTo } from '../helpers/animation'

export default {
  name: 'fx-tab',
  mixins: [tabMixin],
  props: {
    // 纵向
    vertical: {
      type: Boolean,
      default: false
    },
    scrollThreshold: {
      type: Number,
      default: 4
    }
  },
  mounted() {
    this.isMounted = true
    this.updatePos()
  },
  methods: {
    afterUpdate({ hasValue }) {
      hasValue && this.isMounted && this.updatePos()
    },

    updatePos() {
      const $list = this.$refs.list
      const $activeItem = $list.children[this.activeIndex]

      if (!$activeItem) {
        return
      }

      let scrollOffset = 0
      const sizeKey = !this.vertical ? 'Width' : 'Height'
      const directionKey = !this.vertical ? 'Left' : 'Top'

      if ($activeItem['offset' + sizeKey] > $list['offset' + sizeKey]) {
        scrollOffset = $activeItem['offset' + directionKey]
      } else {
        scrollOffset = Math.min(
          $activeItem['offset' + directionKey] -
            ($list['offset' + sizeKey] - $activeItem['offset' + sizeKey]) / 2,
          $list['scroll' + sizeKey] - $list['offset' + sizeKey]
        )
      }

      frameTo({
        from: $list['scroll' + directionKey],
        to: scrollOffset,
        duration: 200,
        progress(res) {
          $list['scroll' + directionKey] = res.current
        }
      })
    }
  }
}
</script>
